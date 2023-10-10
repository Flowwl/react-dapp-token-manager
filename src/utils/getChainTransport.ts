import { polygonMumbai } from "viem/chains";
import { custom } from "viem";
import "viem/window";

export const getChainTransport = () => {
  if (! window.ethereum) {
    throw new Error("MetaMask or another web3 wallet is not installed. Please install one to proceed.");
  }

  return { chain: polygonMumbai, transport: custom(window.ethereum) }
}
