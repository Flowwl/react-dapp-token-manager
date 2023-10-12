import { TokenName, TOKENS } from "../constants/tokens.ts";
import { useChainContext, useConnectedWalletContext } from "../contexts";
import { FetchOptions, useFetch } from "./useFetch.ts";
import { computeBigIntToFloat } from "../utils";
import { assertAddressExists } from "../asserts";

export function useGetUserBalanceByToken(token: TokenName, opts: Partial<FetchOptions<number>> = {}) {
  const { publicClientActions } = useChainContext()
  const { account } = useConnectedWalletContext()
  const promise = async () => {
    const address = TOKENS[token].address
    assertAddressExists(address);
    const balance = await publicClientActions.readContract<bigint>({
      address,
      abi: TOKENS[token]?.abi || [],
      functionName: 'balanceOf',
      args: [account],
    })

    const tokenDecimals = await publicClientActions.readContract<bigint>({
      address,
      abi: TOKENS[token]?.abi || [],
      functionName: 'decimals'
    })


    return computeBigIntToFloat(balance, tokenDecimals);
  }

  return useFetch(async () => promise(), opts);
}
