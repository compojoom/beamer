from copy import deepcopy
from unittest.mock import patch

import pytest
from hexbytes import HexBytes
from web3.types import ChecksumAddress, Wei

from beamer.chain import claim_request, process_claims, process_requests
from beamer.events import InitiateL1ResolutionEvent, RequestResolved
from beamer.state_machine import process_event
from beamer.tests.agent.unit.utils import (
    ACCOUNT,
    ADDRESS1,
    BLOCK_NUMBER,
    CLAIM_ID,
    CLAIMER_STAKE,
    REQUEST_ID,
    TARGET_CHAIN_ID,
    TIMESTAMP,
    make_claim_challenged,
    make_claim_unchallenged,
    make_context,
    make_request,
)
from beamer.tests.agent.utils import make_address
from beamer.tests.constants import FILL_ID
from beamer.typing import FillId, Termination


def test_skip_not_self_filled():
    context, _ = make_context()
    request = make_request()

    context.requests.add(request.id, request)

    assert request.is_pending  # pylint:disable=no-member
    claim_request(request, context)
    assert request.is_pending  # pylint:disable=no-member


def test_ignore_expired():
    context, config = make_context()

    request = make_request()
    request.filler = config.account.address
    context.requests.add(request.id, request)

    assert request.is_pending  # pylint:disable=no-member
    claim_request(request, context)
    assert request.is_ignored  # pylint:disable=no-member


def test_request_garbage_collection_without_claim():
    context, config = make_context()

    request = make_request()
    request.fill(config.account.address, b"", b"", TIMESTAMP)
    request.withdraw()

    context.requests.add(request.id, request)

    assert len(context.requests) == 1
    process_requests(context)
    assert len(context.requests) == 0

    request = make_request()
    request.ignore()
    context.requests.add(request.id, request)

    assert len(context.requests) == 1
    process_requests(context)
    assert len(context.requests) == 0


def test_request_garbage_collection_with_claim():
    context, config = make_context()

    request = make_request()
    request.fill(config.account.address, b"", b"", TIMESTAMP)
    request.withdraw()

    claim = make_claim_challenged(request)

    context.requests.add(request.id, request)
    context.claims.add(claim.id, claim)

    assert len(context.requests) == 1
    assert len(context.claims) == 1

    # While the claim exists, the request is not removed
    process_claims(context)
    process_requests(context)
    assert len(context.requests) == 1
    assert len(context.claims) == 1

    claim.withdraw()

    # Once the claim is removed, the request is removed as well
    process_claims(context)
    process_requests(context)
    assert len(context.requests) == 0
    assert len(context.claims) == 0


def test_handle_request_resolved():
    context, config = make_context()
    filler = make_address()
    fill_id = FILL_ID

    # Must store the result in the request
    request = make_request()
    request.fill(config.account.address, b"", fill_id, TIMESTAMP)
    request.try_to_claim()

    event = RequestResolved(
        chain_id=TARGET_CHAIN_ID,
        tx_hash=HexBytes(""),
        request_id=request.id,
        filler=filler,
        fill_id=fill_id,
        block_number=BLOCK_NUMBER,
    )

    # Without a request, we simply drop the event
    assert process_event(event, context) == (True, None)

    # Adding the request and claim to context
    context.requests.add(request.id, request)
    claim = make_claim_unchallenged(request, fill_id=fill_id)
    context.claims.add(claim.id, claim)

    assert request.l1_resolution_filler is None
    assert process_event(event, context) == (True, None)
    assert request.l1_resolution_filler == filler


def test_handle_generate_l1_resolution_event():
    context, config = make_context()

    request = make_request()
    request.fill(config.account.address, b"", b"", TIMESTAMP)
    context.requests.add(request.id, request)

    claim = make_claim_challenged(
        request=request,
        claimer=config.account.address,
        challenger=make_address(),
        challenger_stake=Wei(CLAIMER_STAKE + 1),
    )
    context.claims.add(claim.id, claim)

    event = deepcopy(claim.latest_claim_made)
    flag, events = process_event(event, context)

    assert flag
    assert events == [
        InitiateL1ResolutionEvent(
            chain_id=TARGET_CHAIN_ID,
            request_id=REQUEST_ID,
            claim_id=CLAIM_ID,
        )
    ]


def test_maybe_claim_no_l1():
    context, config = make_context()

    request = make_request()
    request.fill(config.account.address, b"", b"", TIMESTAMP)
    context.requests.add(request.id, request)

    # Claimer doesn't win challenge game, `withdraw` must not be called
    claim = make_claim_challenged(
        request=request,
        claimer=config.account.address,
        claimer_stake=Wei(10),
        challenger_stake=Wei(50),
    )
    context.claims.add(claim.id, claim)

    # Make sure we're outside the challenge period
    block = context.latest_blocks[request.source_chain_id]
    assert block["timestamp"] >= claim.termination

    assert not claim.transaction_pending
    process_claims(context)
    assert not claim.transaction_pending

    # Claimer wins challenge game, `withdraw` must be called
    claim = make_claim_challenged(
        request=request,
        claimer=config.account.address,
        claimer_stake=Wei(100),
        challenger_stake=Wei(50),
    )
    context.claims.add(claim.id, claim)

    # Make sure we're outside the challenge period
    block = context.latest_blocks[request.source_chain_id]
    assert block["timestamp"] >= claim.termination

    assert not claim.transaction_pending
    process_claims(context)
    assert claim.transaction_pending

    # Claimer leads challenge game, but challenge period is not over
    block = context.latest_blocks[request.source_chain_id]
    claim = make_claim_challenged(
        request=request,
        claimer=config.account.address,
        claimer_stake=Wei(100),
        challenger_stake=Wei(50),
        termination=Termination(TIMESTAMP + 1),
    )
    context.claims.add(claim.id, claim)

    # Make sure we're inside the challenge period
    assert block["timestamp"] < claim.termination

    assert not claim.transaction_pending
    process_claims(context)
    assert not claim.transaction_pending


@patch("beamer.chain._withdraw")
@pytest.mark.parametrize("termination", [TIMESTAMP - 1, TIMESTAMP])
@pytest.mark.parametrize("l1_filler", [ACCOUNT.address, make_address()])
@pytest.mark.parametrize("l1_fill_id", [FILL_ID, FillId(b"wrong fill id")])
def test_maybe_claim_l1_as_claimer(
    mocked_withdraw, termination: Termination, l1_filler: ChecksumAddress, l1_fill_id: FillId
):
    context, config = make_context()
    # Assert that ACCOUNT.address is the agent's address
    # Is used as an assurance that in case ACCOUNT is changed
    assert config.account.address == ACCOUNT.address

    request = make_request()
    request.fill(config.account.address, b"", b"", TIMESTAMP)
    request.l1_resolve(l1_filler, l1_fill_id)
    context.requests.add(request.id, request)

    claim = make_claim_challenged(
        request=request, claimer=config.account.address, fill_id=FILL_ID, termination=termination
    )
    context.claims.add(claim.id, claim)

    assert not claim.transaction_pending
    process_claims(context)

    # If agent is the correct filler, `withdraw` should be called, otherwise not
    if l1_filler == context.address and l1_fill_id == FILL_ID:
        assert mocked_withdraw.called
    else:
        assert not mocked_withdraw.called


@patch("beamer.chain._withdraw")
@pytest.mark.parametrize("termination", [TIMESTAMP - 1, TIMESTAMP])
@pytest.mark.parametrize("l1_filler", [ADDRESS1, make_address()])
@pytest.mark.parametrize("l1_fill_id", [FILL_ID, FillId(b"wrong fill id")])
def test_maybe_claim_l1_as_challenger(
    mocked_withdraw, termination: Termination, l1_filler: ChecksumAddress, l1_fill_id: FillId
):
    context, config = make_context()
    # Assert that ACCOUNT.address is the agent's address
    # Is used as an assurance that in case ACCOUNT is changed
    assert config.account.address == ACCOUNT.address
    request = make_request()
    request.fill(ADDRESS1, b"", b"", TIMESTAMP)
    request.l1_resolve(l1_filler, l1_fill_id)

    context.requests.add(request.id, request)

    claim = make_claim_challenged(
        request=request,
        claimer=ADDRESS1,
        challenger=config.account.address,
        fill_id=FILL_ID,
        termination=termination,
    )
    context.claims.add(claim.id, claim)

    assert not claim.transaction_pending
    process_claims(context)

    # If agent is the challenger and the claimer cheated,
    # `withdraw` should be called, otherwise not
    if l1_filler != ADDRESS1 or l1_fill_id != FILL_ID:
        assert mocked_withdraw.called
    else:
        assert not mocked_withdraw.called
