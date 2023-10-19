import {HexString} from "../types";
import busdABI from "./abis/busd_abi.json";
import wbtcABI from "./abis/wbtc_abi.json";
import {Abi} from "viem";
import {assertIsAbi} from "../asserts";
import {Chain, polygonMumbai} from "viem/chains";

export type Token = {
  address?: HexString;
  abi?: Abi;
  label: TokenName;
  chain: Chain;
  deployBlock: bigint;
}

const Tokens = ["MATIC", "BUSD", "WBTC"] as const;
export type TokenName = typeof Tokens[number];
export const TOKENS: Record<TokenName, Token> = {
  MATIC: {
    label: "MATIC",
    chain: polygonMumbai,
    deployBlock: 0n
  },
  BUSD: {
    address: "0x15A40d37e6f8A478DdE2cB18c83280D472B2fC35",
    abi: parseAbi(busdABI),
    label: "BUSD",
    chain: polygonMumbai,
    deployBlock: 22069112n,
  },
  WBTC: {
    address: "0x49755175C0D8A9a2513C0BAEf726E06699eD90AF",
    abi: parseAbi(wbtcABI),
    label: "WBTC",
    chain: polygonMumbai,
    deployBlock: 28939895n
  }
} as const


function parseAbi(abi: unknown): Abi {
  assertIsAbi(abi);
  return abi
}
