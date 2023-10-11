import { useChainContext, useConnectedWalletContext } from "../contexts";
import { useFetch } from "./useFetch.ts";
import { useState } from "react";
import { TOKENS } from "../constants/tokens.ts";

export const useCheckAllowance = () => {
  const { selectedToken, publicClientActions } = useChainContext();
  const { address } = useConnectedWalletContext();
  const [of, setOf] = useState<string>("")
  const promise = async () => {
    // const { request } = await publicClientActions.simulateContract({
    //   account: address,
    //   address: TOKENS[selectedToken].address,
    //   abi: TOKENS[selectedToken].abi,
    //   functionName: 'checkAllowance',
    //   args: [of]
    // });
    // const contractAddress = await walletClientActions.writeContract(request);

    return publicClientActions.readContract<bigint>({
      address: TOKENS[selectedToken].address,
      abi: TOKENS[selectedToken].abi,
      functionName: 'allowance',
      args: [address, of]
    })
  };

  const checkAllowance = (to: string) => {
    setOf(to);
    fetchMethods.setEnabled(true)
  }

  const fetchMethods = useFetch(async () => promise(), { isEnabled: false })
  return {
    checkAllowance,
    ...fetchMethods
  }
};
