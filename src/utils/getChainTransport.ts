import { Chain } from "viem/chains";
import { custom } from "viem";
import "viem/window";

export const getChainTransport = (chain: Chain) => {
  if (! window.ethereum) {
    throw new Error("MetaMask or another web3 wallet is not installed. Please install one to proceed.");
  }

  return { chain, transport: custom(window.ethereum) }
}
