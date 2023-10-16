import { HexString } from "../types";
import Matic_Abi from "./matic_abi.json";
import { Abi } from "viem";
import { assertIsAbi } from "../asserts";
import { Chain, polygonMumbai } from "viem/chains";
import { Network } from "alchemy-sdk";

export type Token = {
  address?: HexString;
  abi?: Abi;
  label: string;
  chain: Chain;
  block: string;
  alchemyNetwork: Network;
  events?: Record<string, HexString>;
}

const Tokens = ["MATIC", "BUSD"] as const;
export type TokenName = typeof Tokens[number];
export const TOKENS: Record<TokenName, Token> = {
  MATIC: {
    label: "MATIC",
    chain: polygonMumbai,
    block: "0",
    alchemyNetwork: Network.MATIC_MUMBAI
  },
  BUSD: {
    address: "0x15A40d37e6f8A478DdE2cB18c83280D472B2fC35",
    abi: parseAbi(Matic_Abi),
    label: "BUSD",
    chain: polygonMumbai,
    alchemyNetwork: Network.MATIC_MUMBAI,
    block: "22069112",
    events: {
      Transfer: "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
      Approval: "0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925"
    }
  }
} as const


function parseAbi(abi: unknown): Abi {
  assertIsAbi(abi);
  return abi
}
