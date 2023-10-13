import { useChainContext, useConnectedWalletContext } from "../contexts";
import { useFetch } from "./useFetch.ts";
import { TOKENS } from "../constants/tokens.ts";
import { useState } from "react";
import { computeFloatToBigInt } from "../utils";
import { assertAbiExists, assertAddressExists } from "../asserts";
import { toast } from "react-toastify";

export const useMint = () => {
  const { walletClientActions, publicClientActions, selectedToken, tokenDecimals } = useChainContext();
  const { account } = useConnectedWalletContext();
  const [value, setValue] = useState("0");
  const promise = async () => {
    const address = TOKENS[selectedToken].address;
    const abi = TOKENS[selectedToken].abi;
    assertAddressExists(address);
    assertAbiExists(abi);
    try {
      const { request } = await publicClientActions.simulateContract({
        account,
        address,
        abi,
        functionName: 'mint',
        args: [computeFloatToBigInt(parseFloat(value), tokenDecimals)]
      });
      return walletClientActions.writeContract(request);
    } catch (e) {
      toast.error(`${e}`)
      throw e
    }
  };
  const mint = (value: string) => {
    setValue(value);
    fetchMethods.refetch()
  };


  const fetchMethods = useFetch(async () => toast.promise(promise(), { pending: "Minting...", success: "Minted!" }), {
    isEnabled: false
  });

  return {
    mint,
    ...fetchMethods
  };
};
