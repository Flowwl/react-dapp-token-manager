import { useChainContext, useConnectedWalletContext } from "../contexts";
import { useFetch } from "./useFetch.ts";
import { TOKENS } from "../constants/tokens.ts";
import { useState } from "react";
import { computeFloatToBigInt } from "../utils";
import { assertAbiExists, assertAddressExists } from "../asserts";

export const useMint = () => {
  const { walletClientActions, publicClientActions, selectedToken, tokenDecimals } = useChainContext();
  const { account } = useConnectedWalletContext();
  const [value, setValue] = useState("0");
  const promise = async () => {
    console.log("Minting for token", selectedToken);
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
      console.log(e);
    }
  };
  const mint = (value: string) => {
    setValue(value);
    fetchMethods.setEnabled(true);
  };

  const fetchMethods = useFetch(async () => promise(), {
    isEnabled: false
  });
  return {
    mint,
    ...fetchMethods
  };
};
