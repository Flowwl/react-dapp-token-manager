import { useChainContext } from "../contexts";
import { FetchOptions, useFetch } from "./useFetch.ts";
import { RequestAddressesReturnType } from "viem";
import { HexString } from "../types";

export const useRequestAddresses = (opts: Partial<FetchOptions<RequestAddressesReturnType>> = {}) => {
  const { walletClientActions} = useChainContext();
  const promise = async (): Promise<Array<HexString>> => {
    try {
      const addresses = await walletClientActions.request({ method: "eth_requestAccounts"});
      return addresses || [];
    } catch (error) {
      const addresses = await window.ethereum?.request({ method: "eth_requestAccounts" });
      return addresses || [];
    }
  };
  const requestAddresses = () => {
    fetchMethods.refetch();
  };

  const fetchMethods = useFetch(async () => promise(), { isEnabled: false, ...opts });
  return {
    requestAddresses,
    ...fetchMethods
  };
};
