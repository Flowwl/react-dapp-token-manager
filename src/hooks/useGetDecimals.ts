import { TokenName, TOKENS } from "../constants/tokens.ts";
import { useChainContext } from "../contexts";
import { useFetch } from "./useFetch.ts";
import { assertAddressExists } from "../asserts";

export function useGetDecimals(token: TokenName) {
  const { publicClientActions } = useChainContext()
  const promise = async () => {
    const address = TOKENS[token].address
    assertAddressExists(address);

   return publicClientActions.readContract({
      address,
      abi: TOKENS[token]?.abi || [],
      functionName: 'decimals',
    }) as Promise<bigint>
  }

  return useFetch(async () => promise());
}
