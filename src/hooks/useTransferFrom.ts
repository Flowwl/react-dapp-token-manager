import { useChainContext, useConnectedWalletContext } from "../contexts";
import { useFetch } from "./useFetch.ts";
import { useState } from "react";
import { computeFloatToBigInt } from "../utils";
import { TOKENS } from "../constants/tokens.ts";

export const useTransferFrom = () => {
  const { walletClientActions, selectedToken, publicClientActions, tokenDecimals } = useChainContext();
  const { address } = useConnectedWalletContext();
  const [value, setValue] = useState("0")
  const [to, setTo] = useState<string>("")
  const [from, setFrom] = useState<string>("")
  const promise = async () => {
    const { request } = await publicClientActions.simulateContract({
      account: address,
      address: TOKENS[selectedToken].address,
      abi: TOKENS[selectedToken]?.abi || [],
      functionName: 'transferFrom',
      args: [from, to, computeFloatToBigInt(parseFloat(value), tokenDecimals)]
    });
    return walletClientActions.writeContract(request);
  };

  const transferFrom = (from: string, to: string, value: string) => {
    setTo(to);
    setValue(value);
    setFrom(from);
    fetchMethods.setEnabled(true)
  }

  const fetchMethods = useFetch(async () => promise(), { isEnabled: false })
  return {
    transferFrom,
    ...fetchMethods
  }
};
