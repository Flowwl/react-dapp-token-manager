import { useChainContext, useChainInfoContext, useConnectedWalletContext } from "../contexts";
import { useFetch } from "./useFetch.ts";
import { TOKENS } from "../constants/tokens.ts";
import { useState } from "react";
import { computeFloatToBigInt } from "../utils";

export const useMint = () => {
  const { walletClientActions, publicClientActions, selectedToken } = useChainContext();
  const { tokenDecimals } = useChainInfoContext();
  const { address } = useConnectedWalletContext();
  const [value, setValue] = useState("0");
  const promise = async () => {
    const { request } = await publicClientActions.simulateContract({
      account: address,
      address: TOKENS[selectedToken].address,
      abi: TOKENS[selectedToken].abi,
      functionName: 'mint',
      args: [computeFloatToBigInt(parseFloat(value), tokenDecimals)]
    });
    return walletClientActions.writeContract(request);
  };
  const mint = (value: string) => {
    setValue(value);
    fetchMethods.setEnabled(true);
  };

  const fetchMethods = useFetch(async () => promise(), { isEnabled: false });
  return {
    mint,
    ...fetchMethods
  };
};
