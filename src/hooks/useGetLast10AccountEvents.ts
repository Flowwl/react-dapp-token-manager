import { useChainContext, useConnectedWalletContext } from "../contexts";
import { FetchOptions, useFetch } from "./useFetch.ts";
import { TOKENS } from "../constants/tokens.ts";
import { parseAbiItem } from "viem";
import { assertAddressExists } from "../asserts";
import { logRunner } from "../logRunner.ts";

export function useGetLast10AccountEvents(opts: Partial<FetchOptions<unknown[]>> = {}) {
  const { publicClientActions, selectedToken} = useChainContext()
  const { account } = useConnectedWalletContext()
  const promise = async () => {
    const address = TOKENS[selectedToken].address
    assertAddressExists(address);
    const blockNumber = await publicClientActions.getBlockNumber();
    const fetchApprovals = logRunner(blockNumber, 10, async (fromBlock, toBlock) => {
      return publicClientActions.getLogs({
        address,
        event: parseAbiItem('event Approval(address indexed owner, address indexed sender, uint256 value)'),
        // @ts-expect-error typescript doesn't like this
        args: { owner: account, },
        fromBlock,
        toBlock,
      });
    })
    const fetchTransfers = logRunner(blockNumber, 10, async (fromBlock, toBlock) => {
      return publicClientActions.getLogs({
        address,
        event: parseAbiItem('event Transfer(address indexed from, address indexed to, uint256 value)'),
        // @ts-expect-error typescript doesn't like this
        args: { from: account, },
        fromBlock,
        toBlock,
      });
    })

    const [approvals, transfers] = await Promise.all([fetchApprovals, fetchTransfers])

    const logsByTransactions = {...approvals, ...transfers}
    return Object.values(logsByTransactions).sort((a, b) => Number(b.blockNumber) - Number(a.blockNumber)).slice(0, 10);
  }

  const fetchLast10AccountEvents = () => {
    fetchMethods.refetch();
  };

  const fetchMethods = useFetch(async () => promise(), { isEnabled: true, ...opts });
  return {
    fetchLast10AccountEvents,
    ...fetchMethods
  };
}
