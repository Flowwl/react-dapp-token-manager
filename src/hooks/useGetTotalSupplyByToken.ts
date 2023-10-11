import { TokenName, TOKENS } from "../constants/tokens.ts";
import { useChainContext, useChainInfoContext } from "../contexts";
import { useFetch } from "./useFetch.ts";
import { computeBigIntToFloat } from "../utils";

export function useGetTotalSupply(token: TokenName) {
  const { publicClientActions} = useChainContext()
  const { tokenDecimals } = useChainInfoContext();
  const promise = async () => {
    const totalSupply = await publicClientActions.readContract<bigint>({
      address: TOKENS[token].address,
      abi: TOKENS[token].abi,
      functionName: 'totalSupply',
    })

    return computeBigIntToFloat(totalSupply, tokenDecimals);
  }

  return useFetch(async () => promise());
}
