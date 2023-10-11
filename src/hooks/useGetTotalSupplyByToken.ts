import { TokenName, TOKENS } from "../constants/tokens.ts";
import { useChainContext } from "../contexts";
import { useFetch } from "./useFetch.ts";
import { computeBigIntToFloat } from "../utils/computeBigIntToFloat.ts";

export function useGetTotalSupply(token: TokenName) {
  const { publicClientActions } = useChainContext()
  const promise = async () => {
    const totalSupply = await publicClientActions.readContract<bigint>({
      address: TOKENS[token].address,
      abi: TOKENS[token].abi,
      functionName: 'totalSupply',
    })

    const tokenDecimals = await publicClientActions.readContract<bigint>({
      address: TOKENS[token].address,
      abi: TOKENS[token].abi,
      functionName: 'decimals',
    })

    return computeBigIntToFloat(totalSupply, tokenDecimals);
  }

  return useFetch(promise());
}
