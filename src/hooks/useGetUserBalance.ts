import { HexString } from "../types";
import { computeBigIntToFloat } from "../utils";
import { useChainContext } from "../contexts";
import { useFetch } from "./useFetch.ts";

export const useGetUserBalance = (address: HexString) => {
  const { publicClientActions, tokenDecimals} = useChainContext();
  const promise = async () => {
    const balance = await publicClientActions.getBalance(address);
    return computeBigIntToFloat(balance, tokenDecimals);
  };
  return useFetch(async () => promise(), { deps: [address]});
};
