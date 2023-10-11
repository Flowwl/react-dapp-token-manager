import { useFetch } from "./useFetch.ts";
import { TokenName, TOKENS } from "../constants/tokens.ts";

export const useAddCustomEthereumChain = (token: TokenName) => {
  const promise = async () => {
    const chain = TOKENS[token].chain;
    return window.ethereum?.request({
      method: "wallet_addEthereumChain",
      params: [{
        chainId: chain.id.toString(16),
        rpcUrls: chain.rpcUrls.default.http,
        chainName: chain.name,
        nativeCurrency: chain.nativeCurrency,
        blockExplorerUrls: [chain.blockExplorers?.default.url || "https://etherscan.io/"]
      }]
    });
  };
  const addCustomChain = () => {
    fetchMethods.setEnabled(true);
  }

  const fetchMethods = useFetch(async () => promise(), { isEnabled: false });
  return {
    addCustomChain,
    ...fetchMethods
  };
};
