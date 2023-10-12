import { HexString } from "../types";
import { computeBigIntToFloat } from "../utils";
import { useChainContext } from "../contexts";
import { FetchOptions, useFetch } from "./useFetch.ts";

export const useGetUserBalance = (address: HexString, opts: Partial<FetchOptions<number>> = {}) => {
  const { publicClientActions, tokenDecimals } = useChainContext();
  const promise = async () => {
    const balance = await publicClientActions.getBalance({ address });
    return computeBigIntToFloat(balance, tokenDecimals);
  };
  return useFetch(async () => promise(), { deps: [address], ...opts });
};
