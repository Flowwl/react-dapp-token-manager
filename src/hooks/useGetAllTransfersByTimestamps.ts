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
    } catch (e) {
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
    const granularity = 1_000_000n;
    const blockNumberByTimestamp: Record<string, string> = {};
    const nbTransactionsByBlockNumber: Record<string, number> = {};

    // get nb transactions by block number
    logs.map((log) => {
      const blockNumber = (log?.blockNumber || 0n) / granularity;
      if (!nbTransactionsByBlockNumber[`${blockNumber}`]) {
        nbTransactionsByBlockNumber[`${blockNumber}`] = 0;
      }
      nbTransactionsByBlockNumber[`${blockNumber}`] += 1;
    });

    //fetch all blocks and get timestamp
    await Promise.all(
      Object.keys(nbTransactionsByBlockNumber).map(async (blockNumber) => {
        const block = await publicClientActions.getBlock({ blockNumber: BigInt(blockNumber) * granularity });
        blockNumberByTimestamp[`${blockNumber}`] = `${block.timestamp}`;
      })
    );

    //get entries
    const nbTransactionsByTimestampEntries = logs.map((log) => {
      const blockNumber = (log?.blockNumber || 0n) / granularity;
      return [blockNumberByTimestamp[`${blockNumber}`], nbTransactionsByBlockNumber[`${blockNumber}`]];
    });

    return Object.fromEntries(nbTransactionsByTimestampEntries);
  }

  const fetchMethods = useFetch(async () => promise(), { isEnabled: true, ...opts });
  return {
    fetchAllTransfers,
    ...fetchMethods
  };
}
