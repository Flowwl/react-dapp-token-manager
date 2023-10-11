import { HexString } from "../types";
import { TOKENS } from "../constants/tokens.ts";
import { publicClientActions } from "../interfaces";

export const getUserBalanceByToken = async (address: HexString, token: keyof typeof TOKENS) => {
  const balance = await publicClientActions.getBalance(address)
  const decimals = await publicClientActions.readContract<bigint>({
    address: TOKENS[token].address,
    abi: TOKENS[token].abi,
    functionName: 'decimals'
  })

  return Number(balance / BigInt(10) ** decimals);
};
