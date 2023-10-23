import { FetchOptions, useFetch } from "./useFetch.ts";
import { useChainContext } from "../contexts";
import { toast } from "react-toastify";
import { SWAP } from "../constants";
import { useState } from "react";


type AmountOut = {
  amountIn: bigint,
  reserveIn: bigint,
  reserveOut: bigint
}
export const useGetAmountOut = (opts: Partial<FetchOptions<bigint>> = {}) => {
  const {publicClientActions} = useChainContext()
  const [amountIn, setAmountIn] = useState(0n)
  const [reserveIn, setReserveIn] = useState(0n)
  const [reserveOut, setReserveOut] = useState(0n)
  const promise = async () => {
    return publicClientActions.readContract({
      address: SWAP.UNISWAP_V2.router,
      abi: SWAP.UNISWAP_V2.routerABI || [],
      functionName: 'getAmountOut',
      args: [amountIn, reserveIn, reserveOut]
    }) as Promise<bigint>;
  };
  const getAmountOut = ({ amountIn, reserveOut, reserveIn}: AmountOut) => {
    setAmountIn(amountIn)
    setReserveOut(reserveOut)
    setReserveIn(reserveIn)
    fetchMethods.refetch()
  }

  const fetchMethods = useFetch(async () => promise(), {
    isEnabled: false,
    onError(err) {
      toast.error(err.message, { toastId: "getAmountOut"})

    },
    ...opts
  });
  return {
    getAmountOut,
    ...fetchMethods
  };
};
