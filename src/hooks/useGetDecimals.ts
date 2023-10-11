import { TokenName, TOKENS } from "../constants/tokens.ts";
import { useChainContext } from "../contexts";
import { useFetch } from "./useFetch.ts";

export function useGetDecimals(token: TokenName) {
  const { publicClientActions } = useChainContext()
  const promise = async () => {
   return publicClientActions.readContract<bigint>({
      address: TOKENS[token].address,
      abi: TOKENS[token].abi,
      functionName: 'decimals',
    })
  }

  return useFetch(async () => promise());
}
