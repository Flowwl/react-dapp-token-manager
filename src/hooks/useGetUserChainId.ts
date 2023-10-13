import { FetchOptions, useFetch } from "./useFetch.ts";

export const useGetUserChainId = (opts: Partial<FetchOptions<string>> = {}) => {
  const promise = async () => {
      return window.ethereum?.request({method: "eth_chainId"}) || "0" as string
  };

  const getUserChainId = () => {
    fetchMethods.refetch();
  };

  const fetchMethods = useFetch(async () => promise(), { isEnabled: false, ...opts });
  return {
    getUserChainId,
    ...fetchMethods
  };
};
