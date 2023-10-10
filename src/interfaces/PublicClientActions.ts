import { createPublicClient, PublicClient } from "viem";
import { getMainNet } from "../utils/getMainNet.ts";

export class PublicClientActions {
  private publicClient: PublicClient;

  constructor() {
    const mainNet = getMainNet();
    this.publicClient = createPublicClient(mainNet);
  }

  async getBalance(address: string) {
    if (!address.startsWith("0x")) {
      throw new Error("Token address is invalid");
    }
    return this.publicClient.getBalance({ address: address as `0x${string}` });
  }
}
