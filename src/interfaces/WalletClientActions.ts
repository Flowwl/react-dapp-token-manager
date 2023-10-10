import { createWalletClient, WalletClient } from "viem";
import { getChainTransport } from "../utils";

export class WalletClientActions {
  private walletClient: WalletClient;

  constructor() {
    const mainNet = getChainTransport();
    this.walletClient = createWalletClient(mainNet);
  }

  getName() {
    return this.walletClient.name
  }

  async getAddresses() {
    console.log(await this.walletClient.getAddresses())
    return this.walletClient.getAddresses()
  }
}
