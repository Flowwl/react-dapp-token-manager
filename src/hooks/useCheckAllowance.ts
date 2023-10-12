import { useChainContext, useConnectedWalletContext } from "../contexts";
import { FetchOptions, useFetch } from "./useFetch.ts";
import { useState } from "react";
import { TOKENS } from "../constants/tokens.ts";

export const useCheckAllowance = (opts: Partial<FetchOptions<bigint>> = {}) => {
  const { selectedToken, publicClientActions } = useChainContext();
  const { account } = useConnectedWalletContext();
  const [of, setOf] = useState<string>("")
  const promise = async () => {
    return publicClientActions.readContract<bigint>({
      address: TOKENS[selectedToken].address,
      abi: TOKENS[selectedToken]?.abi || [],
      functionName: 'allowance',
      args: [account, of]
    })
  };

  const checkAllowance = (to: string) => {
    setOf(to);
    fetchMethods.setEnabled(true)
  }

  const fetchMethods = useFetch(async () => promise(), { ...opts, isEnabled: false })
  return {
    checkAllowance,
    ...fetchMethods
  }
};
