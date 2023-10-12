import { TokenName, TOKENS } from "../constants/tokens.ts";
import { useChainContext, useWalletAuthContext } from "../contexts";
import { useFetch } from "./useFetch.ts";
import { computeBigIntToFloat } from "../utils";

export function useGetUserBalanceByToken(token: TokenName) {
  const { publicClientActions } = useChainContext()
  const { address } = useWalletAuthContext()
  const promise = async () => {
    const balance = await publicClientActions.readContract<bigint>({
      address: TOKENS[token].address,
      abi: TOKENS[token]?.abi || [],
      functionName: 'balanceOf',
      args: [address],
    })

    const tokenDecimals = await publicClientActions.readContract<bigint>({
      address: TOKENS[token].address,
      abi: TOKENS[token]?.abi || [],
      functionName: 'decimals'
    })


    return computeBigIntToFloat(balance, tokenDecimals);
  }

  return useFetch(async () => promise());
}
