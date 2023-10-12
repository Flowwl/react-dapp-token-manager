import { useChainContext, useConnectedWalletContext } from "../contexts";
import { useFetch } from "./useFetch.ts";
import { TOKENS } from "../constants/tokens.ts";
import { assertAddressExists } from "../asserts";
import { toast } from "react-toastify";

export const useRenounceOwnership = () => {
  const { walletClientActions, selectedToken, publicClientActions} = useChainContext();
  const { account } = useConnectedWalletContext();
  const promise = async () => {
    const address = TOKENS[selectedToken].address
    assertAddressExists(address);
    const { request } = await publicClientActions.simulateContract({
      account,
      address,
      abi: TOKENS[selectedToken]?.abi || [],
      functionName: 'renounceOwnership',
    });
    return walletClientActions.writeContract(request);
  };

  const renounceOwnership = () => {
    fetchMethods.setEnabled(true)
  }

  const fetchMethods = useFetch(async () => toast.promise(promise(), { pending: "Renouncing Ownership...", success: "Bye bye!" }), { isEnabled: false })
  return {
    renounceOwnership,
    ...fetchMethods
  }
};
