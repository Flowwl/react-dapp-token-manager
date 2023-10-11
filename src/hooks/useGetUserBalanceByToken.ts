import { HexString } from "../types";
import { computeBigIntToFloat } from "../utils/computeBigIntToFloat.ts";
import { useChainContext } from "../contexts";
import { useFetch } from "./useFetch.ts";
import { TokenName, TOKENS } from "../constants/tokens.ts";

export const useGetUserBalanceByToken = (address: HexString, token: TokenName) => {
  const { publicClientActions } = useChainContext();
  const promise = async () => {
    const balance = await publicClientActions.getBalance(address);

    const tokenDecimals = await publicClientActions.readContract<bigint>({
      address: TOKENS[token].address,
      abi: TOKENS[token].abi,
      functionName: 'decimals',
    })
    return computeBigIntToFloat(balance, tokenDecimals);
  };

  return useFetch(promise());
};
