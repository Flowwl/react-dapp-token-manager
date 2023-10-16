import { useChainContext, useConnectedWalletContext } from "../contexts";
import { FetchOptions, useFetch } from "./useFetch.ts";
import { TOKENS } from "../constants/tokens.ts";
import { assertAddressExists } from "../asserts";
import { logRunner } from "../logRunner.ts";
import { Log, parseAbiItem, trim } from "viem";
import { HexString } from "../types";

export const useGetAllAllowances = (opts: Partial<FetchOptions<Record<HexString, bigint>>> = {}) => {
  const { publicClientActions, selectedToken } = useChainContext();
  const { account } = useConnectedWalletContext();
  const promise = async () => {
    const address = TOKENS[selectedToken].address;
    assertAddressExists(address);
    try {
      const approvals = await fetchApprovals(address, account, TOKENS[selectedToken].deployBlock, "latest");
      return fetchAllowances(address, Object.values(approvals));
    } catch (e) {
      const blockNumber = await publicClientActions.getBlockNumber();
      const approvals = await logRunner(blockNumber, 10, async (fromBlock, toBlock) => fetchApprovals(address, account, fromBlock, toBlock), 5 * 1000);
      return fetchAllowances(address, Object.values(approvals))
    }
  };

  const fetchAllowances = async (address: HexString, logs: Log[]) => {
    const allowancesBySpender = await Promise.all(
      logs.map(async (log) => {
        if (!log.topics[2]) { return []; }
        const spender = trim(log.topics[2]);
        const allowance = await publicClientActions.readContract({
          address,
          abi: TOKENS[selectedToken]?.abi || [],
          functionName: 'allowance',
          args: [account, spender]
        }) as bigint;

        return [spender, allowance];
      })
    );
    return Object.fromEntries(allowancesBySpender) as Record<HexString, bigint>;
  };
  const fetchApprovals = async (address: HexString, account: HexString, fromBlock: bigint, toBlock: bigint | "latest"): Promise<Log[]> => {
    return publicClientActions.getLogs({
      address,
      event: parseAbiItem('event Approval(address indexed owner, address indexed sender, uint256 value)'),
      // @ts-expect-error typescript doesn't know the type of event Approval
      args: { owner: account },
      fromBlock,
      toBlock
    });
  };

  const fetchAllAllowances = () => {
    fetchMethods.refetch();
  };

  const fetchMethods = useFetch(async () => promise(), { isEnabled: true, ...opts });
  return {
    fetchAllAllowances,
    ...fetchMethods
  };
};
