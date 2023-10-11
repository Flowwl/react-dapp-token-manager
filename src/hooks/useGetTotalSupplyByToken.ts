import { TOKENS } from "../constants/tokens.ts";
import { useChainContext } from "../contexts";
import { useFetch } from "./useFetch.ts";

export function useGetTotalSupply(token: keyof typeof TOKENS) {
  const { publicClientActions } = useChainContext()
  const promise = () => publicClientActions.readContract<bigint>({
    address: TOKENS[token].address,
    abi: TOKENS[token].abi,
    functionName: 'totalSupply',
  })

  return useFetch(promise());
}
