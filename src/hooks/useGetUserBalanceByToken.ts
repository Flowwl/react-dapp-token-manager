import { HexString } from "../types";
import { TOKENS } from "../constants/tokens.ts";
import { computeBigIntToFloat } from "../utils/computeBigIntToFloat.ts";
import { useChainContext } from "../contexts";
import { useFetch } from "./useFetch.ts";

export const useGetUserBalanceByToken = (address: HexString, token: keyof typeof TOKENS) => {
  const { publicClientActions } = useChainContext();
  const promise = async () => {
    const balance = await publicClientActions.getBalance(address);
    const decimals = await publicClientActions.readContract<bigint>({
      address: TOKENS[token].address,
      abi: TOKENS[token].abi,
      functionName: 'decimals'
    });

    return computeBigIntToFloat(balance, decimals);
  };

  return useFetch(promise());
};
