import { createWalletClient, WalletClient } from "viem";
import { getMainNet } from "../utils";

export class WalletClientActions {
  private walletClient: WalletClient;

  constructor() {
    const mainNet = getMainNet();
    this.walletClient = createWalletClient(mainNet);
  }

  getName() {
    return this.walletClient.name
  }
}
