import { useChainContext, useConnectedWalletContext } from "../contexts";
import { FetchOptions, useFetch } from "./useFetch.ts";
import { useState } from "react";
import { TOKENS } from "../constants/tokens.ts";
import { assertAddressExists } from "../asserts";
import { toast } from "react-toastify";

export const useCheckAllowance = (opts: Partial<FetchOptions<bigint>> = {}) => {
  const { selectedToken, publicClientActions } = useChainContext();
  const { account } = useConnectedWalletContext();
  const [of, setOf] = useState<string>("")
  const promise = async () => {
    const address = TOKENS[selectedToken].address
    assertAddressExists(address);
    return publicClientActions.readContract({
      address,
      abi: TOKENS[selectedToken]?.abi || [],
      functionName: 'allowance',
      args: [account, of]
    }) as Promise<bigint>
  };

  const checkAllowance = (to: string) => {
    setOf(to);
    fetchMethods.setEnabled(true)
  }

  const fetchMethods = useFetch(async () => toast.promise(promise(), { pending: "Checking Allowance...", success: "Allowance checked!" }), { ...opts, isEnabled: false })
  return {
    checkAllowance,
    ...fetchMethods
  }
};
