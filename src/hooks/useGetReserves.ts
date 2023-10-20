import { useFetch } from "./useFetch.ts";
import { useChainContext } from "../contexts";
import { toast } from "react-toastify";
import { SWAP } from "../constants";

export const useGetTokenPrice = () => {
  const { publicClientActions} = useChainContext()
  const promise = async () => {
    try {
      const reserves = await publicClientActions.readContract({
        address: SWAP.UNISWAP_V2.pair_wbtc_busd,
        abi: SWAP.UNISWAP_V2.pair_wbtc_busd_ABI || [],
        functionName: 'getReserves',
      }) as { reserve0: bigint, reserve1: bigint };
      console.log(reserves)
      return {
        reserveToken0: reserves.reserve0 || 0n,
        reserveToken1: reserves.reserve1 || 0n
      }
    }
    catch (err) {
      console.log(err)
    }
  };
  const getTokenPrice = () => {
    fetchMethods.refetch()
  }

  const fetchMethods = useFetch(async () => promise(), {
    isEnabled: false,
    onError(err) {
      toast.error(err.message)
    }
  });
  return {
    getTokenPrice,
    ...fetchMethods
  };
};
