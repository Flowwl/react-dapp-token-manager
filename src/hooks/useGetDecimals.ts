import { TokenName, TOKENS } from "../constants";
import { useChainContext } from "../contexts";
import { FetchOptions, useFetch } from "./useFetch.ts";
import { assertAddressExists } from "../asserts";

export function useGetDecimals(token: TokenName, opts: Partial<FetchOptions<bigint>> = {}) {
  const { publicClientActions } = useChainContext()
  const promise = async () => {
    const address = TOKENS[token].address
    assertAddressExists(address);

   const decimal = await publicClientActions.readContract({
      address,
      abi: TOKENS[token]?.abi || [],
      functionName: 'decimals',
    }) as number

    return BigInt(decimal);
  }

  return useFetch(async () => promise(), {...opts});
}
