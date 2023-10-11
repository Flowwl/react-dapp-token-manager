import { HexString } from "../types";
import { computeBigIntToFloat } from "../utils/computeBigIntToFloat.ts";
import { useChainContext } from "../contexts";
import { useFetch } from "./useFetch.ts";

export const useGetUserBalanceByToken = (address: HexString, tokenDecimals: bigint) => {
  const { publicClientActions } = useChainContext();
  const promise = async () => {
    const balance = await publicClientActions.getBalance(address);
    return computeBigIntToFloat(balance, tokenDecimals);
  };

  return useFetch(promise());
};
