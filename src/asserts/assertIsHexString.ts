import { HexString } from "../types";

export function assertIsHexString(value: string): asserts value is HexString {
  if (!value.startsWith("0x")) {
    throw new Error("Value is not a hex string");
  }
}
