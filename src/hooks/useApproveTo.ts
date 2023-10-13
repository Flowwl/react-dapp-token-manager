import { useChainContext, useConnectedWalletContext } from "../contexts";
import { FetchOptions, useFetch } from "./useFetch.ts";
import { useState } from "react";
import { computeFloatToBigInt } from "../utils";
import { TOKENS } from "../constants/tokens.ts";
import { assertAddressExists } from "../asserts";

export const useApproveTo = (opts: Partial<FetchOptions<boolean>> = {}) => {
  const { walletClientActions, selectedToken, publicClientActions, tokenDecimals } = useChainContext();
  const { account } = useConnectedWalletContext();
  const [value, setValue] = useState("0");
  const [to, setTo] = useState<string>("");
  const promise = async () => {
    console.log("Calling approve")
    const address = TOKENS[selectedToken].address;
    try {
      assertAddressExists(address);
      const { request } = await publicClientActions.simulateContract({
        account,
        address: address,
        abi: TOKENS[selectedToken]?.abi || [],
        functionName: 'approve',
        args: [to, computeFloatToBigInt(parseFloat(value), tokenDecimals)]
      });
      return walletClientActions.writeContract(request) as unknown as boolean;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const approve = (to: string, value: string) => {
    setTo(to);
    setValue(value);
    fetchMethods.refetch();
  };

  const fetchMethods = useFetch(async () => promise(), { isEnabled: false, ...opts });
  return {
    approve,
    ...fetchMethods
  };
};
