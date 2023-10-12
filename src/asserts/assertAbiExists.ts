import { Abi } from "viem";

export function assertAbiExists(abi: Abi | undefined | null): asserts abi is Abi {
  if (!abi) {
    throw new Error("No abi found");
  }
}
