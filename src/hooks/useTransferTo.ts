import { HexString } from "../types";
import { useChainContext, useChainInfoContext, useConnectedWalletContext } from "../contexts";
import { useFetch } from "./useFetch.ts";
import { useState } from "react";
import { computeFloatToBigInt } from "../utils";

export const useTransferTo = () => {
  const { walletClientActions, selectedChain } = useChainContext();
  const { tokenDecimals } = useChainInfoContext();
  const { address } = useConnectedWalletContext();
  const [value, setValue] = useState("0");
  const [to, setTo] = useState<string>("");
  const promise = async () => {
    return walletClientActions.sendTransaction({
      account: address,
      to: to as HexString,
      value: computeFloatToBigInt(parseFloat(value), tokenDecimals),
      chain: selectedChain
    });
  };

  const transfer = (to: string, value: string) => {
    setTo(to);
    setValue(value);
    fetchMethods.setEnabled(true);
  };

  const fetchMethods = useFetch(async () => promise(), { isEnabled: false });
  return {
    transfer,
    ...fetchMethods
  };
};
