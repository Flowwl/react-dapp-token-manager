import { createPublicClient, PublicClient, http } from "viem";
import { mainnet } from "viem/chains";

export class PublicClientActions {
  private publicClient: PublicClient;
  constructor() {
    this.publicClient = createPublicClient({ chain: mainnet, transport: http() })
  }

  async getBalance(address: string) {
    if (!address.startsWith("0x")) {
      throw new Error("Token address is invalid");
    }
    return this.publicClient.getBalance({ address: address as `0x${string}` });
  }
}
