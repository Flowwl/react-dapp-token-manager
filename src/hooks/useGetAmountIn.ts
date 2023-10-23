import { FetchOptions, useFetch } from "./useFetch.ts";
import { useChainContext } from "../contexts";
import { toast } from "react-toastify";
import { SWAP } from "../constants";
import { useState } from "react";


type AmountIn = {
  amountOut: bigint,
  reserveIn: bigint,
  reserveOut: bigint
}
export const useGetAmountIn = (opts: Partial<FetchOptions<bigint>> = {}) => {
  const {publicClientActions} = useChainContext()
  const [amountOut, setAmountOut] = useState(0n)
  const [reserveIn, setReserveIn] = useState(0n)
  const [reserveOut, setReserveOut] = useState(0n)
  const promise = async () => {
    return publicClientActions.readContract({
      address: SWAP.UNISWAP_V2.router,
      abi: SWAP.UNISWAP_V2.routerABI || [],
      functionName: 'getAmountIn',
      args: [amountOut, reserveIn, reserveOut]
    }) as Promise<bigint>;
  };
  const getAmountIn = ({ amountOut, reserveOut, reserveIn}: AmountIn) => {
    setAmountOut(amountOut)
    setReserveOut(reserveOut)
    setReserveIn(reserveIn)
    fetchMethods.refetch()
  }

  const fetchMethods = useFetch(async () => promise(), {
    isEnabled: false,
    onError(err) {
      toast.error(err.message, { toastId: "getAmountIn"})
    },
    ...opts
  });
  return {
    getAmountIn,
    ...fetchMethods
  };
};
