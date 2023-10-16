import { Chain } from "viem/chains";
import { ClientConfig, custom, fallback, http } from "viem";
import "viem/window";
import { ENV_CONFIG } from "../config.ts";

export const getChainTransport = (chain: Chain): ClientConfig => {
  if (! window.ethereum) {
    throw new Error("MetaMask or another web3 wallet is not installed. Please install one to proceed.");
  }
  const alchemy = http(`https://polygon-mumbai.g.alchemy.com/v2/${ENV_CONFIG.ALCHEMY_API_KEY}`);
  return { chain, transport: fallback([alchemy, custom(window.ethereum)], { rank: true }) }
}
