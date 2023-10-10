import { createPublicClient, PublicClient } from "viem";
import { getChainTransport } from "../utils";
import { assertIsHexString } from "../asserts";

export class PublicClientActions {
  private publicClient: PublicClient;

  constructor() {
    const chainTransport = getChainTransport();
    this.publicClient = createPublicClient(chainTransport);
  }

  async getBalance(address: string) {
    assertIsHexString(address);
    return this.publicClient.getBalance({ address: address });
  }
}
