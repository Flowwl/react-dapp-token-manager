import { HexString } from "../types";

export function assertAddressExists(address: HexString | undefined | null): asserts address is HexString {
  if (!address) {
    throw new Error("Address not found for token, are you trying to get the address of the native token ?");
  }
}
