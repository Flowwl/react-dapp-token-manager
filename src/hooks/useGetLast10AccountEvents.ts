import { useChainContext, useConnectedWalletContext } from "../contexts";
import { FetchOptions, useFetch } from "./useFetch.ts";
import { TOKENS } from "../constants/tokens.ts";
import { Log, parseAbiItem } from "viem";
import { assertAddressExists } from "../asserts";
import { HexString } from "../types";
import { logRunner } from "../logRunner.ts";

export function useGetLast10AccountEvents(opts: Partial<FetchOptions<unknown[]>> = {}) {
  const { publicClientActions, selectedToken } = useChainContext();
  const { account } = useConnectedWalletContext();
  const promise = async () => {
    const address = TOKENS[selectedToken].address;
    assertAddressExists(address);
    try {
      const approvals = await getApprovals(address, account, TOKENS[selectedToken].deployBlock, "latest");
      const transfers = await getTransfers(address, account, TOKENS[selectedToken].deployBlock, "latest");
      return getLast10Logs(approvals, transfers);
    }
    catch (e) {
      const blockNumber = await publicClientActions.getBlockNumber();
      const fetchApprovals = logRunner(blockNumber, 10, async (fromBlock, toBlock) => getApprovals(address, account, fromBlock, toBlock));
      const fetchTransfers = logRunner(blockNumber, 10, async (fromBlock, toBlock) => getTransfers(address, account, fromBlock, toBlock));
      const [approvals, transfers] = await Promise.all([fetchApprovals, fetchTransfers]);
      return getLast10Logs(Object.values(approvals), Object.values(transfers));

    }
  };


  function getLast10Logs(approvals: Log[], transfers: Log[]) {
    return [...approvals, ...transfers].sort((a, b) => Number(b.blockNumber) - Number(a.blockNumber)).slice(0, 10);
  }
  const getApprovals = async (address: HexString, account: HexString, fromBlock: bigint, toBlock: bigint | "latest") => publicClientActions.getLogs({
      address,
      event: parseAbiItem('event Approval(address indexed owner, address indexed sender, uint256 value)'),
      args: { owner: account },
      fromBlock,
      toBlock
    });

  const getTransfers = async (address: HexString, account: HexString, fromBlock: bigint, toBlock: bigint | "latest") => publicClientActions.getLogs({
    address,
    event: parseAbiItem('event Transfer(address indexed from, address indexed to, uint256 value)'),
    args: { from: account },
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
