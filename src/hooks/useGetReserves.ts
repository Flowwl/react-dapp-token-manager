import { FetchOptions, useFetch } from "./useFetch.ts";
import { useChainContext } from "../contexts";
import { toast } from "react-toastify";
import { SWAP } from "../constants";

export const useGetReserves = (opts: Partial<FetchOptions<{ WBTC: bigint; BUSD: bigint; }>> = {}) => {
  const {publicClientActions} = useChainContext()
  const promise = async () => {
    const reserves = await publicClientActions.readContract({
      address: SWAP.UNISWAP_V2.pair_wbtc_busd,
      abi: SWAP.UNISWAP_V2.pair_wbtc_busd_ABI || [],
      functionName: 'getReserves',
    }) as [bigint, bigint];
    return {
      "BUSD": BigInt(reserves[0]) || 0n,
      "WBTC": BigInt(reserves[1]) || 0n
    }
  };
  const getReserves = () => {
    fetchMethods.refetch()
  }

  const fetchMethods = useFetch(async () => promise(), {
    isEnabled: false,
    onError(err) {
      toast.error(err.message)
    },
    ...opts
  });
  return {
    getReserves,
    ...fetchMethods
  };
};
