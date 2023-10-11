import { createPublicClient, PublicClient, ReadContractParameters, SimulateContractParameters } from "viem";
import { getChainTransport } from "../utils";
import { assertIsHexString } from "../asserts";
import { Chain } from "viem/chains";

export class PublicClientActions {
  private publicClient: PublicClient;

  constructor(chain: Chain) {
    const chainTransport = getChainTransport(chain);
    this.publicClient = createPublicClient(chainTransport);
  }

  async getBalance(address: string) {
    assertIsHexString(address);
    return this.publicClient.getBalance({ address: address });
  }

  async readContract<T>(args: ReadContractParameters): Promise<T> {
    return this.publicClient.readContract(args) as T;
  }

  async simulateContract(args: SimulateContractParameters) {
    return this.publicClient.simulateContract(args);
  }
}

