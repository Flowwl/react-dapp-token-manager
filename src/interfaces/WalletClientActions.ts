import { createWalletClient, SendTransactionParameters, WalletClient } from "viem";
import { getChainTransport } from "../utils";
import { Chain } from "viem/chains";

export class WalletClientActions {
  private walletClient: WalletClient;

  constructor(chain: Chain) {
    const chainTransport = getChainTransport(chain);
    this.walletClient = createWalletClient(chainTransport);
  }

  async requestAddresses() {
    return this.walletClient.requestAddresses()
  }

  async sendTransaction(params: SendTransactionParameters) {
    return this.walletClient.sendTransaction(params);
  }
}
