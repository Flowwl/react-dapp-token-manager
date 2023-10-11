import { publicClientActions } from "../interfaces";
import { TOKENS } from "../constants/tokens.ts";

export async function getTotalSupply(token: keyof typeof TOKENS) {
  return publicClientActions.readContract<bigint>({
    address: TOKENS[token].address,
    abi: TOKENS[token].abi,
    functionName: 'totalSupply',
  })
}
