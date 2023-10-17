import { useChainContext, useConnectedWalletContext } from "../contexts";
import { FetchOptions, useFetch } from "./useFetch.ts";
import { TOKENS } from "../constants/tokens.ts";
import { Log, parseAbiItem } from "viem";
import { assertAddressExists } from "../asserts";
import { HexString } from "../types";
import { logRunner } from "../logRunner.ts";
import { uniqueArrayByKey } from "../utils/uniqueArrayByKey.ts";

export function useGetLast10AccountEvents(opts: Partial<FetchOptions<unknown[]>> = {}) {
  const { publicClientActions, selectedToken } = useChainContext();
  const { account } = useConnectedWalletContext();
  const promise = async () => {
    const address = TOKENS[selectedToken].address;
    assertAddressExists(address);
    try {
      const approvals = await getApprovals(address, account, TOKENS[selectedToken].deployBlock, "latest");
      const transfersFrom = await getTransfersFrom(address, account, TOKENS[selectedToken].deployBlock, "latest");
      const transfersTo = await getTransfersTo(address, account, TOKENS[selectedToken].deployBlock, "latest");
      return getLast10Logs(approvals, [...transfersFrom, ...transfersTo]);
    } catch (e) {
      const blockNumber = await publicClientActions.getBlockNumber();
      const fetchApprovals = logRunner(blockNumber, 10, async (fromBlock, toBlock) => getApprovals(address, account, fromBlock, toBlock));
      const fetchTransfersFrom = logRunner(blockNumber, 10, async (fromBlock, toBlock) => getTransfersFrom(address, account, fromBlock, toBlock));
      const fetchTransfersTo = logRunner(blockNumber, 10, async (fromBlock, toBlock) => getTransfersTo(address, account, fromBlock, toBlock));
      const [approvals, transfersFrom, transfersTo] = await Promise.all([fetchApprovals, fetchTransfersFrom, fetchTransfersTo]);
      return getLast10Logs(Object.values(approvals), [...Object.values(transfersFrom), ...Object.values(transfersTo)]);

    }
  };


  function getLast10Logs(approvals: Log[], transfers: Log[]) {
    return uniqueArrayByKey([...approvals, ...transfers], "transactionHash")
      .sort((a, b) => Number(b.blockNumber) - Number(a.blockNumber))
      .slice(0, 10);
  }

  const getApprovals = async (address: HexString, account: HexString, fromBlock: bigint, toBlock: bigint | "latest") => publicClientActions.getLogs({
    address,
    event: parseAbiItem('event Approval(address indexed owner, address indexed sender, uint256 value)'),
    args: { owner: account },
    fromBlock,
    toBlock
  });

  const getTransfersFrom = async (address: HexString, account: HexString, fromBlock: bigint, toBlock: bigint | "latest") => publicClientActions.getLogs({
    address,
    event: parseAbiItem('event Transfer(address indexed from, address indexed to, uint256 value)'),
    args: { from: account },
    fromBlock,
    toBlock
  });

  const getTransfersTo = async (address: HexString, account: HexString, fromBlock: bigint, toBlock: bigint | "latest") => publicClientActions.getLogs({
    address,
    event: parseAbiItem('event Transfer(address indexed from, address indexed to, uint256 value)'),
    args: { to: account },
    fromBlock,
    toBlock
  });
  const fetchLast10AccountEvents = () => {
    fetchMethods.refetch();
  };

  const fetchMethods = useFetch(async () => promise(), { isEnabled: true, ...opts });
  return {
    fetchLast10AccountEvents,
    ...fetchMethods
  };
}
