import { useChainContext } from "../contexts";
import { FetchOptions, useFetch } from "./useFetch.ts";
import { TOKENS } from "../constants/tokens.ts";
import { Log, parseAbi } from "viem";
import { assertAddressExists } from "../asserts";
import { logRunner } from "../logRunner.ts";
import { HexString } from "../types";

export function useGetLast10Events(opts: Partial<FetchOptions<unknown[]>> = {}) {
  const { publicClientActions, selectedToken } = useChainContext();
  const promise = async () => {
    const address = TOKENS[selectedToken].address;
    assertAddressExists(address);
    try {
      const logs = await getLogs(address, TOKENS[selectedToken].deployBlock, "latest");
      return getLast10Logs(logs);
    } catch (e) {
      const blockNumber = await publicClientActions.getBlockNumber();
      const logsByTransactions = await logRunner(blockNumber, 10, async (fromBlock, toBlock) => getLogs(address, fromBlock, toBlock));
      return getLast10Logs(Object.values(logsByTransactions));
    }
  };

  function getLast10Logs(logs: Log[]) {
    return logs.sort((a, b) => Number(b.blockNumber) - Number(a.blockNumber)).slice(0, 10);
  }
  const getLogs = async (address: HexString, fromBlock: bigint, toBlock: bigint | "latest"): Promise<Array<Log>> => publicClientActions.getLogs({
    address,
    events: parseAbi([
      'event Approval(address indexed owner, address indexed sender, uint256 value)',
      'event Transfer(address indexed from, address indexed to, uint256 value)'
    ]),
    fromBlock,
    toBlock
  });

  const fetchLast10Events = () => {
    fetchMethods.refetch();
  };

  const fetchMethods = useFetch(async () => promise(), { ...opts });
  return {
    fetchLast10Events,
    ...fetchMethods
  };
}
