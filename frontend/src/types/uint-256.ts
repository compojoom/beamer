import { BigNumber, utils } from 'ethers';

import type { Encodable } from '@/types/encoding';

export class UInt256 implements Encodable<UInt256Data> {
  private value: BigNumber;

  constructor(data: UInt256Data) {
    this.value = BigNumber.from(data);
  }

  static parse(value: string, decimals?: number): UInt256 {
    return new this(utils.parseUnits(value, decimals ?? 0).toString());
  }

  get asString(): string {
    return this.value.toString();
  }

  public format(decimals: number): string {
    return utils.formatUnits(this.value, decimals);
  }

  public encode(): UInt256Data {
    return this.asString;
  }

  public add(value: UInt256): UInt256 {
    return new UInt256(this.value.add(value.value).toString());
  }

  public isZero(): boolean {
    return this.value.isZero();
  }

  public lte(value: UInt256): boolean {
    return this.value.lte(value.value);
  }

  public gte(value: UInt256): boolean {
    return this.value.gte(value.value);
  }
}

export type UInt256Data = string;
