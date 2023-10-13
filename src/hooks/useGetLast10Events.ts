import { useChainContext } from "../contexts";
import { FetchOptions, useFetch } from "./useFetch.ts";
import { TOKENS } from "../constants/tokens.ts";
import { parseAbi } from "viem";
import { assertAddressExists } from "../asserts";
import { logRunner } from "../logRunner.ts";

export function useGetLast10Events(opts: Partial<FetchOptions<unknown[]>> = {}) {
  const { publicClientActions, selectedToken } = useChainContext();
  const promise = async () => {
    const address = TOKENS[selectedToken].address;
    assertAddressExists(address);
    const blockNumber = await publicClientActions.getBlockNumber();
    return logRunner(blockNumber, 10, async (fromBlock, toBlock) => {
      return publicClientActions.getLogs({
        address,
        events: parseAbi([
          'event Approval(address indexed owner, address indexed sender, uint256 value)',
          'event Transfer(address indexed from, address indexed to, uint256 value)',
        ]),
        fromBlock,
        toBlock,
      });
    })
  };

  const fetchLast10Events = () => {
    fetchMethods.refetch();
  };

  const fetchMethods = useFetch(async () => promise(), { ...opts });
  return {
    fetchLast10Events,
    ...fetchMethods
  };
}
