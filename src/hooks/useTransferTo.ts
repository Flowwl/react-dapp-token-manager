import { useChainContext, useConnectedWalletContext } from "../contexts";
import { FetchOptions, useFetch } from "./useFetch.ts";
import { useState } from "react";
import { computeFloatToBigInt } from "../utils";
import { TOKENS } from "../constants/tokens.ts";
import { assertIsHexString } from "../asserts";

export const useTransferTo = (opts: Partial<FetchOptions<boolean>> = {}) => {
  const { walletClientActions, selectedToken, tokenDecimals } = useChainContext();
  const { account } = useConnectedWalletContext();
  const [value, setValue] = useState("0");
  const [to, setTo] = useState<string>("");
  const promise = async () => {
    assertIsHexString(to)
    return walletClientActions.sendTransaction({
      chain: TOKENS[selectedToken].chain,
      account,
      to: to,
      value: computeFloatToBigInt(parseFloat(value), tokenDecimals)
    }) as unknown as boolean;
  };

  const transfer = (to: string, value: string) => {
    setTo(to);
    setValue(value);
    fetchMethods.refetch();
  };

  const fetchMethods = useFetch(async () => promise(), { isEnabled: false, ...opts });
  return {
    transfer,
    ...fetchMethods
  };
};
