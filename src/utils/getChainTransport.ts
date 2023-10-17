import { Chain } from "viem/chains";
import { ClientConfig, custom, fallback, http, webSocket } from "viem";
import "viem/window";
import { ENV_CONFIG } from "../config.ts";

export const getPublicChainTransport = (chain: Chain): ClientConfig => {
  const alchemy = http(`https://polygon-mumbai.g.alchemy.com/v2/${ENV_CONFIG.ALCHEMY_API_KEY}`);
  const customWallet = window.ethereum ? [custom(window.ethereum)] : []
  return { chain, transport: fallback([alchemy, ...customWallet], { retryCount: 1 }) }
}

export const getWalletChainTransport = (chain: Chain): ClientConfig => {
  if (! window.ethereum) {
    throw new Error("MetaMask or another web3 wallet is not installed. Please install one to proceed.");
  }
  return { chain, transport: fallback([custom(window.ethereum)], { retryCount: 1 }) }
}


export const getWebsocketChainTransport = (chain: Chain): ClientConfig => {
  const alchemy = webSocket(`ws://polygon-mumbai.g.alchemy.com/v2/${ENV_CONFIG.ALCHEMY_API_KEY}`, { retryCount: 1, retryDelay: 2000 });
  return { chain, transport: alchemy }
}
