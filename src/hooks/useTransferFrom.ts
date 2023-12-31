import { useChainContext, useConnectedWalletContext } from "../contexts";
import { FetchOptions, useFetch } from "./useFetch.ts";
import { useState } from "react";
import { computeFloatToBigInt } from "../utils";
import { TOKENS } from "../constants/tokens.ts";
import { assertAddressExists } from "../asserts";

export const useTransferFrom = (opts: Partial<FetchOptions<boolean>> = {}) => {
  const { walletClientActions, selectedToken, publicClientActions, tokenDecimals } = useChainContext();
  const { account } = useConnectedWalletContext();
  const [value, setValue] = useState("0");
  const [to, setTo] = useState<string>("");
  const [from, setFrom] = useState<string>("");
  const promise = async () => {
    const address = TOKENS[selectedToken].address;
    assertAddressExists(address);
    const { request } = await publicClientActions.simulateContract({
      account,
      address,
      abi: TOKENS[selectedToken]?.abi || [],
      functionName: 'transferFrom',
      args: [from, to, computeFloatToBigInt(parseFloat(value), tokenDecimals)]
    });
    return walletClientActions.writeContract(request) as unknown as boolean;
  };

  const transferFrom = (from: string, to: string, value: string) => {
    setTo(to);
    setValue(value);
    setFrom(from);
    fetchMethods.refetch()
  };

  const fetchMethods = useFetch(async () => promise(), { isEnabled: false, ...opts });
  return {
    transferFrom,
    ...fetchMethods
  };
};
