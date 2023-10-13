import { useChainContext, useConnectedWalletContext } from "../contexts";
import { useFetch } from "./useFetch.ts";
import { TOKENS } from "../constants/tokens.ts";
import { useState } from "react";
import { computeFloatToBigInt } from "../utils";
import { assertAddressExists } from "../asserts";
import { toast } from "react-toastify";

export const useBurn = () => {
  const { walletClientActions, publicClientActions, selectedToken, tokenDecimals} = useChainContext();

  const { account } = useConnectedWalletContext();
  const [value, setValue] = useState("0");
  const promise = async () => {
    const address = TOKENS[selectedToken].address
    assertAddressExists(address);
    try {
      const { request } = await publicClientActions.simulateContract({
        account,
        address,
        abi: TOKENS[selectedToken]?.abi || [],
        functionName: 'burn',
        args: [computeFloatToBigInt(parseFloat(value), tokenDecimals)]
      });
      return walletClientActions.writeContract(request);
    }
    catch (e) {
      toast.error(`${e}`)
      throw e
    }
  };
  const burn = (value: string) => {
    setValue(value);
    fetchMethods.refetch()
  };

  const fetchMethods = useFetch(async () => toast.promise(promise(), { pending: "Burning...", success: "Burned!" }), { isEnabled: false });
  return {
    burn,
    ...fetchMethods
  };
};
