import { useChainContext, useConnectedWalletContext } from "../contexts";
import { FetchOptions, useFetch } from "./useFetch.ts";
import { TOKENS } from "../constants/tokens.ts";
import { useState } from "react";
import { computeFloatToBigInt } from "../utils";
import { assertAddressExists } from "../asserts";

export const useBurn = (opts: Partial<FetchOptions<boolean>> = {}) => {
  const { walletClientActions, publicClientActions, selectedToken, tokenDecimals} = useChainContext();

  const { account } = useConnectedWalletContext();
  const [value, setValue] = useState("0");
  const promise = async () => {
    const address = TOKENS[selectedToken].address
    assertAddressExists(address);
      const { request } = await publicClientActions.simulateContract({
        account,
        address,
        abi: TOKENS[selectedToken]?.abi || [],
        functionName: 'burn',
        args: [computeFloatToBigInt(parseFloat(value), tokenDecimals)]
      });
      return walletClientActions.writeContract(request) as unknown as boolean;
  };
  const burn = (value: string) => {
    setValue(value);
    fetchMethods.refetch()
  };

  const fetchMethods = useFetch(async () => promise(), { isEnabled: false, ...opts });
  return {
    burn,
    ...fetchMethods
  };
};
