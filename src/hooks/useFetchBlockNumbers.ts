import { Block } from "viem";

import { useChainContext } from "../contexts";

export function useFetchBlockNumbers() {
  const { publicClientActions } = useChainContext();
  const fetchBlockNumbers = async (blockNumbers: bigint[]) => {
    const blockMappedByHash: Record<string, Block> = {};
    return Promise.all(blockNumbers.map(async (blockNumber) => {
      if (!blockMappedByHash[`${blockNumber}`]) {
        blockMappedByHash[`${blockNumber}`] = await publicClientActions.getBlock({ blockNumber });
      }
    }));
  };

  return { fetchBlockNumbers };
}
