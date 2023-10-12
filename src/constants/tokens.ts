import { HexString } from "../types";
import Matic_Abi from "./matic_abi.json";
import { Abi } from "viem";
import { assertIsAbi } from "../asserts";
import { Chain, polygonMumbai } from "viem/chains";

export type Token = {
  address?: HexString;
  abi?: Abi;
  label: string;
  chain: Chain;
}

const Tokens = ["MATIC", "BUSD"] as const;
export type TokenName = typeof Tokens[number];
export const TOKENS: Record<TokenName, Token> = {
  MATIC: {
    label: "MATIC",
    chain: polygonMumbai
  },
  BUSD: {
    address: "0x15A40d37e6f8A478DdE2cB18c83280D472B2fC35",
    abi: parseAbi(Matic_Abi),
    label: "BUSD",
    chain: polygonMumbai
  }
} as const


function parseAbi(abi: unknown): Abi {
  assertIsAbi(abi);
  return abi
}
