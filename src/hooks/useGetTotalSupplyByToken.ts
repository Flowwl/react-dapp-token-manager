import { TokenName, TOKENS } from "../constants/tokens.ts";
import { useChainContext } from "../contexts";
import { useFetch } from "./useFetch.ts";
import { computeBigIntToFloat } from "../utils";
import { assertAddressExists } from "../asserts";

export function useGetTotalSupply(token: TokenName) {
  const { publicClientActions, tokenDecimals} = useChainContext()
  const promise = async () => {
    const address = TOKENS[token].address
    assertAddressExists(address);
    const totalSupply = await publicClientActions.readContract<bigint>({
      address,
      abi: TOKENS[token]?.abi || [],
      functionName: 'totalSupply',
    })

    return computeBigIntToFloat(totalSupply, tokenDecimals);
  }

  return useFetch(async () => promise());
}
