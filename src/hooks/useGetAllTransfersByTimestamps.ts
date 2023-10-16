import { useChainContext } from "../contexts";
import { FetchOptions, useFetch } from "./useFetch.ts";
import { TOKENS } from "../constants/tokens.ts";
import { Log, parseAbiItem } from "viem";
import { assertAddressExists } from "../asserts";
import { HexString } from "../types";
import { logRunner } from "../logRunner.ts";

export function useGetAllTransfersByTimestamps(opts: Partial<FetchOptions<Record<string, number>>> = {}) {
  const { publicClientActions, selectedToken } = useChainContext();
  const promise = async () => {
    const address = TOKENS[selectedToken].address;
    assertAddressExists(address);
    try {
      const transfers = await getTransfers(address, TOKENS[selectedToken].deployBlock, "latest");
      return prepareLogsToSeries(transfers);
    }
    catch (e) {
      const blockNumber = await publicClientActions.getBlockNumber();
      const logs = await logRunner(blockNumber, 10, async (fromBlock, toBlock) => getTransfers(address, fromBlock, toBlock));
      return prepareLogsToSeries(Object.values(logs));
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

  async function prepareLogsToSeries(logs: Log[]) {
    const nbTransactionsByBlocks: Record<string, number> = {};

    await Promise.all(
      logs.map(async (log) => {
        const blockNumber = (log?.blockNumber || 0n) / 1_000_000n;
        const block = await publicClientActions.getBlock({ blockNumber: blockNumber * 1_000_000n });
        if (!nbTransactionsByBlocks[`${block.timestamp}`]) {
          nbTransactionsByBlocks[`${block.timestamp}`] = 0;
        }
        nbTransactionsByBlocks[`${block.timestamp}`] += 1;
      })
    );

    return nbTransactionsByBlocks;
  }

  const fetchMethods = useFetch(async () => promise(), { isEnabled: true, ...opts });
  return {
    fetchAllTransfers,
    ...fetchMethods
  };
}
