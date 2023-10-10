import { mainnet } from "viem/chains";
import { custom } from "viem";

export const getMainNet = () => {
  // @ts-expect-error
  if (! window.ethereum) {
    throw new Error("MetaMask or another web3 wallet is not installed. Please install one to proceed.");
  }

  // @ts-expect-error
  return { chain: mainnet, transport: custom(window.ethereum) }
}
