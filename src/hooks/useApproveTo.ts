import { useChainContext, useConnectedWalletContext } from "../contexts";
import { useFetch } from "./useFetch.ts";
import { useState } from "react";
import { computeFloatToBigInt } from "../utils";
import { TOKENS } from "../constants/tokens.ts";

export const useApproveTo = () => {
  const { walletClientActions, selectedToken, publicClientActions, tokenDecimals} = useChainContext();
  const { account } = useConnectedWalletContext();
  const [value, setValue] = useState("0")
  const [to, setTo] = useState<string>("")
  const promise = async () => {
    const { request } = await publicClientActions.simulateContract({
      account,
      address: TOKENS[selectedToken].address,
      abi: TOKENS[selectedToken]?.abi || [],
      functionName: 'approve',
      args: [to, computeFloatToBigInt(parseFloat(value), tokenDecimals)]
    });
    return walletClientActions.writeContract(request);
  };

  const approve = (to: string, value: string) => {
    setTo(to);
    setValue(value);
    fetchMethods.setEnabled(true)
  }

  const fetchMethods = useFetch(async () => promise(), { isEnabled: false })
  return {
    approve,
    ...fetchMethods
  }
};
