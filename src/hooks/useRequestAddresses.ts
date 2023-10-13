import { useChainContext } from "../contexts";
import { FetchOptions, useFetch } from "./useFetch.ts";
import { RequestAddressesReturnType } from "viem";

export const useRequestAddresses = (opts: Partial<FetchOptions<RequestAddressesReturnType>> = {}) => {
  const { walletClientActions} = useChainContext();
  const promise = async () => {
    return walletClientActions.requestAddresses();
  };
  const requestAddresses = () => {
    fetchMethods.refetch();
  };

  const fetchMethods = useFetch(async () => promise(), { ...opts, isEnabled: false });
  return {
    requestAddresses,
    ...fetchMethods
  };
};
