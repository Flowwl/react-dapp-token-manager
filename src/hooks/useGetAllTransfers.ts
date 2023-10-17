import { useChainContext } from "../contexts";
import { FetchOptions, useFetch } from "./useFetch.ts";
import { TOKENS } from "../constants/tokens.ts";
import { Log, parseAbiItem } from "viem";
import { assertAddressExists } from "../asserts";
import { HexString } from "../types";
import { logRunner } from "../logRunner.ts";

export function useGetAllTransfers(opts: Partial<FetchOptions<Log[]>> = {}) {
  const { publicClientActions, selectedToken } = useChainContext();
  const promise = async () => {
    const address = TOKENS[selectedToken].address;
    assertAddressExists(address);
    try {
      return getTransfers(address, TOKENS[selectedToken].deployBlock, "latest");
    }
    catch (e) {
      const blockNumber = await publicClientActions.getBlockNumber();
      const logs = await logRunner(blockNumber, 10, async (fromBlock, toBlock) => getTransfers(address, fromBlock, toBlock));
      return Object.values(logs);
    }
  };

  const getTransfers = async (address: HexString, fromBlock: bigint, toBlock: bigint | "latest"): Promise<Log[]> => publicClientActions.getLogs({
    address,
    event: parseAbiItem('event Transfer(address indexed from, address indexed to, uint256 value)'),
    fromBlock,
    toBlock
  });

  const fetchAllTransfers = () => {
    fetchMethods.refetch();
  };

  const fetchMethods = useFetch(async () => promise(), { isEnabled: true, ...opts });
  return {
    fetchAllTransfers,
    ...fetchMethods
  };
}
