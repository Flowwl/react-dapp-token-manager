import { useChainContext, useConnectedWalletContext } from "../contexts";
import { useFetch } from "./useFetch.ts";
import { TOKENS } from "../constants/tokens.ts";

export const useRenounceOwnership = () => {
  const { walletClientActions, selectedToken, publicClientActions} = useChainContext();
  const { address } = useConnectedWalletContext();
  const promise = async () => {
    const { request } = await publicClientActions.simulateContract({
      account: address,
      address: TOKENS[selectedToken].address,
      abi: TOKENS[selectedToken]?.abi || [],
      functionName: 'renounceOwnership',
    });
    return walletClientActions.writeContract(request);
  };

  const renounceOwnership = () => {
    fetchMethods.setEnabled(true)
  }

  const fetchMethods = useFetch(async () => promise(), { isEnabled: false })
  return {
    renounceOwnership,
    ...fetchMethods
  }
};
