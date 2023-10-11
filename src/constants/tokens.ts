import { HexString } from "../types";
import Matic_Abi from "./matic_abi.json";
import { Abi } from "viem";
import { assertIsAbi } from "../asserts";

type Token = {
  address: HexString,
  abi: Abi
}

const Tokens = ["MATIC"] as const;
export const TOKENS: Record<typeof Tokens[number],Token> = {
  MATIC: {
    address: "0x15A40d37e6f8A478DdE2cB18c83280D472B2fC35",
    abi: parseAbi(Matic_Abi)
  }
} as const


function parseAbi(abi: unknown): Abi {
  assertIsAbi(abi);
  return abi
}
