import { Abi } from "viem";

export function assertIsAbi(abi: unknown): asserts abi is Abi {
  if (!Array.isArray(abi)) {
    throw new Error("ABI must be an array")
  }
  for (const item of abi) {
    if (typeof item !== "object" || !item || !item.type) {
      throw new Error("ABI must be an array of objects")
    }
  }
}
