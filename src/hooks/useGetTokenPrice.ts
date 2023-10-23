import {useFetch} from "./useFetch.ts";
import {useChainContext} from "../contexts";
import {toast} from "react-toastify";
import {SWAP} from "../constants";
import {computeBigIntToFloat} from "../utils";

export const useGetTokenPrice = () => {
  const { publicClientActions, tokenDecimals} = useChainContext()
  const promise = async () => {
    try {
      const price0 = await publicClientActions.readContract({
        address: SWAP.UNISWAP_V2.pair_wbtc_busd,
        abi: SWAP.UNISWAP_V2.pair_wbtc_busd_ABI || [],
        functionName: 'price0CumulativeLast',
      }) as bigint;

      const price1 = await publicClientActions.readContract({
        address: SWAP.UNISWAP_V2.pair_wbtc_busd,
        abi: SWAP.UNISWAP_V2.pair_wbtc_busd_ABI || [],
        functionName: 'price1CumulativeLast',
      }) as bigint;

      const tokenPrice0 = computeBigIntToFloat(price0, tokenDecimals)
      const tokenPrice1 = computeBigIntToFloat(price1, tokenDecimals)

      console.log("token0", tokenPrice0, price0)
      console.log("token1", tokenPrice1, price1)
      console.log("ratio", tokenPrice0 / tokenPrice1)

      return {
        "BUSD": tokenPrice0,
        "WBTC": tokenPrice1
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
