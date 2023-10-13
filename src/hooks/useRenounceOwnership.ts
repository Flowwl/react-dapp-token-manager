import { useChainContext, useConnectedWalletContext } from "../contexts";
import { FetchOptions, useFetch } from "./useFetch.ts";
import { TOKENS } from "../constants/tokens.ts";
import { assertAddressExists } from "../asserts";

export const useRenounceOwnership = (opts: Partial<FetchOptions<void>> = {}) => {
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
    return walletClientActions.writeContract(request) as unknown as void;
  };

  const renounceOwnership = () => {
    fetchMethods.refetch()
  }

  const fetchMethods = useFetch(async () => promise(), { isEnabled: false, ...opts })
  return {
    renounceOwnership,
    ...fetchMethods
  }
};
