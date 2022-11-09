// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class HashInvalidated extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save HashInvalidated entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type HashInvalidated must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("HashInvalidated", id.toString(), this);
    }
  }

  static load(id: string): HashInvalidated | null {
    return changetype<HashInvalidated | null>(store.get("HashInvalidated", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get requestHash(): Bytes {
    let value = this.get("requestHash");
    return value!.toBytes();
  }

  set requestHash(value: Bytes) {
    this.set("requestHash", Value.fromBytes(value));
  }

  get fillId(): Bytes {
    let value = this.get("fillId");
    return value!.toBytes();
  }

  set fillId(value: Bytes) {
    this.set("fillId", Value.fromBytes(value));
  }

  get fillHash(): Bytes {
    let value = this.get("fillHash");
    return value!.toBytes();
  }

  set fillHash(value: Bytes) {
    this.set("fillHash", Value.fromBytes(value));
  }
}

export class LPAdded extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save LPAdded entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type LPAdded must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("LPAdded", id.toString(), this);
    }
  }

  static load(id: string): LPAdded | null {
    return changetype<LPAdded | null>(store.get("LPAdded", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get lp(): Bytes {
    let value = this.get("lp");
    return value!.toBytes();
  }

  set lp(value: Bytes) {
    this.set("lp", Value.fromBytes(value));
  }
}

export class LPRemoved extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save LPRemoved entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type LPRemoved must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("LPRemoved", id.toString(), this);
    }
  }

  static load(id: string): LPRemoved | null {
    return changetype<LPRemoved | null>(store.get("LPRemoved", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get lp(): Bytes {
    let value = this.get("lp");
    return value!.toBytes();
  }

  set lp(value: Bytes) {
    this.set("lp", Value.fromBytes(value));
  }
}

export class FillManagerOwnershipTransferred extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(
      id != null,
      "Cannot save FillManagerOwnershipTransferred entity without an ID"
    );
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type FillManagerOwnershipTransferred must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("FillManagerOwnershipTransferred", id.toString(), this);
    }
  }

  static load(id: string): FillManagerOwnershipTransferred | null {
    return changetype<FillManagerOwnershipTransferred | null>(
      store.get("FillManagerOwnershipTransferred", id)
    );
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get previousOwner(): Bytes {
    let value = this.get("previousOwner");
    return value!.toBytes();
  }

  set previousOwner(value: Bytes) {
    this.set("previousOwner", Value.fromBytes(value));
  }

  get newOwner(): Bytes {
    let value = this.get("newOwner");
    return value!.toBytes();
  }

  set newOwner(value: Bytes) {
    this.set("newOwner", Value.fromBytes(value));
  }
}

export class RequestFilled extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save RequestFilled entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type RequestFilled must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("RequestFilled", id.toString(), this);
    }
  }

  static load(id: string): RequestFilled | null {
    return changetype<RequestFilled | null>(store.get("RequestFilled", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get requestId(): BigInt {
    let value = this.get("requestId");
    return value!.toBigInt();
  }

  set requestId(value: BigInt) {
    this.set("requestId", Value.fromBigInt(value));
  }

  get fillId(): Bytes {
    let value = this.get("fillId");
    return value!.toBytes();
  }

  set fillId(value: Bytes) {
    this.set("fillId", Value.fromBytes(value));
  }

  get sourceChainId(): BigInt {
    let value = this.get("sourceChainId");
    return value!.toBigInt();
  }

  set sourceChainId(value: BigInt) {
    this.set("sourceChainId", Value.fromBigInt(value));
  }

  get targetTokenAddress(): Bytes {
    let value = this.get("targetTokenAddress");
    return value!.toBytes();
  }

  set targetTokenAddress(value: Bytes) {
    this.set("targetTokenAddress", Value.fromBytes(value));
  }

  get filler(): Bytes {
    let value = this.get("filler");
    return value!.toBytes();
  }

  set filler(value: Bytes) {
    this.set("filler", Value.fromBytes(value));
  }

  get amount(): BigInt {
    let value = this.get("amount");
    return value!.toBigInt();
  }

  set amount(value: BigInt) {
    this.set("amount", Value.fromBigInt(value));
  }
}

export class ClaimMade extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save ClaimMade entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type ClaimMade must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("ClaimMade", id.toString(), this);
    }
  }

  static load(id: string): ClaimMade | null {
    return changetype<ClaimMade | null>(store.get("ClaimMade", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get requestId(): BigInt {
    let value = this.get("requestId");
    return value!.toBigInt();
  }

  set requestId(value: BigInt) {
    this.set("requestId", Value.fromBigInt(value));
  }

  get claimId(): BigInt {
    let value = this.get("claimId");
    return value!.toBigInt();
  }

  set claimId(value: BigInt) {
    this.set("claimId", Value.fromBigInt(value));
  }

  get claimer(): Bytes {
    let value = this.get("claimer");
    return value!.toBytes();
  }

  set claimer(value: Bytes) {
    this.set("claimer", Value.fromBytes(value));
  }

  get claimerStake(): BigInt {
    let value = this.get("claimerStake");
    return value!.toBigInt();
  }

  set claimerStake(value: BigInt) {
    this.set("claimerStake", Value.fromBigInt(value));
  }

  get lastChallenger(): Bytes {
    let value = this.get("lastChallenger");
    return value!.toBytes();
  }

  set lastChallenger(value: Bytes) {
    this.set("lastChallenger", Value.fromBytes(value));
  }

  get challengerStakeTotal(): BigInt {
    let value = this.get("challengerStakeTotal");
    return value!.toBigInt();
  }

  set challengerStakeTotal(value: BigInt) {
    this.set("challengerStakeTotal", Value.fromBigInt(value));
  }

  get termination(): BigInt {
    let value = this.get("termination");
    return value!.toBigInt();
  }

  set termination(value: BigInt) {
    this.set("termination", Value.fromBigInt(value));
  }

  get fillId(): Bytes {
    let value = this.get("fillId");
    return value!.toBytes();
  }

  set fillId(value: Bytes) {
    this.set("fillId", Value.fromBytes(value));
  }
}

export class ClaimStakeWithdrawn extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save ClaimStakeWithdrawn entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type ClaimStakeWithdrawn must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("ClaimStakeWithdrawn", id.toString(), this);
    }
  }

  static load(id: string): ClaimStakeWithdrawn | null {
    return changetype<ClaimStakeWithdrawn | null>(
      store.get("ClaimStakeWithdrawn", id)
    );
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get claimId(): BigInt {
    let value = this.get("claimId");
    return value!.toBigInt();
  }

  set claimId(value: BigInt) {
    this.set("claimId", Value.fromBigInt(value));
  }

  get requestId(): BigInt {
    let value = this.get("requestId");
    return value!.toBigInt();
  }

  set requestId(value: BigInt) {
    this.set("requestId", Value.fromBigInt(value));
  }

  get claimReceiver(): Bytes {
    let value = this.get("claimReceiver");
    return value!.toBytes();
  }

  set claimReceiver(value: Bytes) {
    this.set("claimReceiver", Value.fromBytes(value));
  }
}

export class DepositWithdrawn extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save DepositWithdrawn entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type DepositWithdrawn must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("DepositWithdrawn", id.toString(), this);
    }
  }

  static load(id: string): DepositWithdrawn | null {
    return changetype<DepositWithdrawn | null>(
      store.get("DepositWithdrawn", id)
    );
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get requestId(): BigInt {
    let value = this.get("requestId");
    return value!.toBigInt();
  }

  set requestId(value: BigInt) {
    this.set("requestId", Value.fromBigInt(value));
  }

  get receiver(): Bytes {
    let value = this.get("receiver");
    return value!.toBytes();
  }

  set receiver(value: Bytes) {
    this.set("receiver", Value.fromBytes(value));
  }
}

export class FinalityPeriodUpdated extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(
      id != null,
      "Cannot save FinalityPeriodUpdated entity without an ID"
    );
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type FinalityPeriodUpdated must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("FinalityPeriodUpdated", id.toString(), this);
    }
  }

  static load(id: string): FinalityPeriodUpdated | null {
    return changetype<FinalityPeriodUpdated | null>(
      store.get("FinalityPeriodUpdated", id)
    );
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get targetChainId(): BigInt {
    let value = this.get("targetChainId");
    return value!.toBigInt();
  }

  set targetChainId(value: BigInt) {
    this.set("targetChainId", Value.fromBigInt(value));
  }

  get finalityPeriod(): BigInt {
    let value = this.get("finalityPeriod");
    return value!.toBigInt();
  }

  set finalityPeriod(value: BigInt) {
    this.set("finalityPeriod", Value.fromBigInt(value));
  }
}

export class OwnershipTransferred extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save OwnershipTransferred entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type OwnershipTransferred must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("OwnershipTransferred", id.toString(), this);
    }
  }

  static load(id: string): OwnershipTransferred | null {
    return changetype<OwnershipTransferred | null>(
      store.get("OwnershipTransferred", id)
    );
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get previousOwner(): Bytes {
    let value = this.get("previousOwner");
    return value!.toBytes();
  }

  set previousOwner(value: Bytes) {
    this.set("previousOwner", Value.fromBytes(value));
  }

  get newOwner(): Bytes {
    let value = this.get("newOwner");
    return value!.toBytes();
  }

  set newOwner(value: Bytes) {
    this.set("newOwner", Value.fromBytes(value));
  }
}

export class RequestCreated extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save RequestCreated entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type RequestCreated must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("RequestCreated", id.toString(), this);
    }
  }

  static load(id: string): RequestCreated | null {
    return changetype<RequestCreated | null>(store.get("RequestCreated", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get requestId(): BigInt {
    let value = this.get("requestId");
    return value!.toBigInt();
  }

  set requestId(value: BigInt) {
    this.set("requestId", Value.fromBigInt(value));
  }

  get targetChainId(): BigInt {
    let value = this.get("targetChainId");
    return value!.toBigInt();
  }

  set targetChainId(value: BigInt) {
    this.set("targetChainId", Value.fromBigInt(value));
  }

  get sourceTokenAddress(): Bytes {
    let value = this.get("sourceTokenAddress");
    return value!.toBytes();
  }

  set sourceTokenAddress(value: Bytes) {
    this.set("sourceTokenAddress", Value.fromBytes(value));
  }

  get targetTokenAddress(): Bytes {
    let value = this.get("targetTokenAddress");
    return value!.toBytes();
  }

  set targetTokenAddress(value: Bytes) {
    this.set("targetTokenAddress", Value.fromBytes(value));
  }

  get targetAddress(): Bytes {
    let value = this.get("targetAddress");
    return value!.toBytes();
  }

  set targetAddress(value: Bytes) {
    this.set("targetAddress", Value.fromBytes(value));
  }

  get amount(): BigInt {
    let value = this.get("amount");
    return value!.toBigInt();
  }

  set amount(value: BigInt) {
    this.set("amount", Value.fromBigInt(value));
  }

  get validUntil(): BigInt {
    let value = this.get("validUntil");
    return value!.toBigInt();
  }

  set validUntil(value: BigInt) {
    this.set("validUntil", Value.fromBigInt(value));
  }
}