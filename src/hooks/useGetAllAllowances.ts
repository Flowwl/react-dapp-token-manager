import { useChainContext, useConnectedWalletContext } from "../contexts";
import { FetchOptions, useFetch } from "./useFetch.ts";
import { TOKENS } from "../constants/tokens.ts";
import { assertAddressExists } from "../asserts";
import { logRunner } from "../logRunner.ts";
import { parseAbiItem, trim } from "viem";
import { HexString } from "../types";

export const useGetAllAllowances = (opts: Partial<FetchOptions<Record<HexString, bigint>>> = {}) => {
  const { publicClientActions, selectedToken} = useChainContext()
  const { account } = useConnectedWalletContext()
  const promise = async () => {
    const address = TOKENS[selectedToken].address
    assertAddressExists(address);
    const blockNumber = await publicClientActions.getBlockNumber();
    const approvals = await logRunner(blockNumber, 10, async (fromBlock, toBlock) => {
      return publicClientActions.getLogs({
        address,
        event: parseAbiItem('event Approval(address indexed owner, address indexed sender, uint256 value)'),
        // @ts-expect-error typescript doesn't recognize the abi type from approval event
        args: { owner: account, },
        fromBlock,
        toBlock,
      });
    }, 5 * 1000)

    const promises = Object.values(approvals).map(async (log) => {
      if (! log.topics[2]) { return [] }
      const spender = trim(log.topics[2])
      const allowance = await publicClientActions.readContract({
        address,
        abi: TOKENS[selectedToken]?.abi || [],
        functionName: 'allowance',
        args: [account, spender]
      }) as bigint;

      return [spender, allowance];
    })

    const allowances = await Promise.all(promises)
    return Object.fromEntries(allowances) as Record<HexString, bigint>
  }

  const fetchAllAllowances = () => {
    fetchMethods.refetch();
  };

  const fetchMethods = useFetch(async () => promise(), { isEnabled: true, ...opts });
  return {
    fetchAllAllowances,
    ...fetchMethods
  };
};
