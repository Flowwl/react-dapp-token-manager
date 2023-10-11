import { HexString } from "../types";
import { useChainContext, useConnectedWalletContext } from "../contexts";
import { useFetch } from "./useFetch.ts";
import { TOKENS } from "../constants/tokens.ts";
import { useState } from "react";
import { computeFloatToBigInt } from "../utils";

export const useTransferTo = () => {
  const { walletClientActions, publicClientActions, selectedToken, selectedChain } = useChainContext();
  const { address } = useConnectedWalletContext();
  const [value, setValue] = useState("0")
  const [to, setTo] = useState<string>("")
  const promise = async () => {
    const tokenDecimals = await publicClientActions.readContract<bigint>({
      address: TOKENS[selectedToken].address,
      abi: TOKENS[selectedToken].abi,
      functionName: 'decimals',
    })

    return walletClientActions.sendTransaction({
      account: address,
      to: to as HexString,
      value: computeFloatToBigInt(parseFloat(value), tokenDecimals),
      chain: selectedChain
    })
  };

  const transfer = (to: string, value: string) => {
    setTo(to);
    setValue(value);
    fetchMethods.setEnabled(true)
  }

  const fetchMethods = useFetch(async () => promise(), { isEnabled: false })
  return {
    transfer,
    ...fetchMethods
  }
};
