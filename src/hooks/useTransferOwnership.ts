import { useChainContext, useConnectedWalletContext } from "../contexts";
import { useFetch } from "./useFetch.ts";
import { useState } from "react";
import { TOKENS } from "../constants/tokens.ts";
import { assertAddressExists } from "../asserts";

export const useTransferOwnership = () => {
  const { walletClientActions, selectedToken, publicClientActions} = useChainContext();
  const { account } = useConnectedWalletContext();
  const [to, setTo] = useState<string>("")
  const promise = async () => {
    const address = TOKENS[selectedToken].address
    assertAddressExists(address);
    const { request } = await publicClientActions.simulateContract({
      account,
      address,
      abi: TOKENS[selectedToken]?.abi || [],
      functionName: 'transferOwnership',
      args: [to]
    });
    return walletClientActions.writeContract(request);
  };

  const transferOwnership = (to: string) => {
    setTo(to);
    fetchMethods.setEnabled(true)
  }

  const fetchMethods = useFetch(async () => promise(), { isEnabled: false })
  return {
    transferOwnership,
    ...fetchMethods
  }
};
