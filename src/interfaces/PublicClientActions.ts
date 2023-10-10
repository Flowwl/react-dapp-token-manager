import { createPublicClient, PublicClient } from "viem";
import { getChainTransport } from "../utils/getChainTransport.ts";

export class PublicClientActions {
  private publicClient: PublicClient;

  constructor() {
    const mainNet = getChainTransport();
    this.publicClient = createPublicClient(mainNet);
  }

  async getBalance(address: string) {
    if (!address.startsWith("0x")) {
      throw new Error("Token address is invalid");
    }
    return this.publicClient.getBalance({ address: address as `0x${string}` });
  }
}
