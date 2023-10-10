import { createWalletClient, WalletClient } from "viem";
import { getChainTransport } from "../utils";

export class WalletClientActions {
  private walletClient: WalletClient;

  constructor() {
    const chainTransport = getChainTransport();
    this.walletClient = createWalletClient(chainTransport);
  }

  async requestAddresses() {
    return this.walletClient.requestAddresses()
  }
}
