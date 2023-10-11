import { createWalletClient, SendTransactionParameters, WalletClient, WriteContractParameters } from "viem";
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

  async writeContract(params: WriteContractParameters) {
    // @ts-expect-error type FIXME
    return this.walletClient.writeContract(params);
  }
}
