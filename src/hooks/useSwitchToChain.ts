import { useFetch } from "./useFetch.ts";
import { TokenName, TOKENS } from "../constants/tokens.ts";
import { useAddCustomEthereumChain } from "./useAddCustomEthereumChain.ts";
import { EIP1193ProviderRpcError } from "viem";

export const useSwitchToChain = (token: TokenName) => {
  const { addCustomChain } = useAddCustomEthereumChain(token);
  const promise = async () => {
    const chain = TOKENS[token].chain;
    await window.ethereum?.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: `0x${chain.id.toString(16)}` }]
    });
  };
  const switchToChain = () => {
    fetchMethods.setEnabled(true);
  }

  const fetchMethods = useFetch<void, EIP1193ProviderRpcError>(async () => promise(), {
    isEnabled: false,
    onError(err) {
      if (err.code === 4902) {
        addCustomChain();
      }
    }
  });
  return {
    switchToChain,
    ...fetchMethods
  };
};
