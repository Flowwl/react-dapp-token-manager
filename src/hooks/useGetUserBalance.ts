import { HexString } from "../types";
import { computeBigIntToFloat } from "../utils";
import { useChainContext, useChainInfoContext } from "../contexts";
import { useFetch } from "./useFetch.ts";

export const useGetUserBalance = (address: HexString) => {
  const { publicClientActions} = useChainContext();
  const { tokenDecimals } = useChainInfoContext();
  const promise = async () => {
    const balance = await publicClientActions.getBalance(address);
    return computeBigIntToFloat(balance, tokenDecimals);
  };
  return useFetch(async () => promise(), { deps: [address]});
};
