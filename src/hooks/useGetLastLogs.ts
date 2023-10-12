import { useChainContext } from "../contexts";
import { FetchOptions, useFetch } from "./useFetch.ts";
import { TOKENS } from "../constants/tokens.ts";

export function useGetLastLogs(opts: Partial<FetchOptions<unknown[]>> = {}) {
  const { publicClientActions} = useChainContext()
  const promise = async () => {
    const blockNumber = await publicClientActions.getBlockNumber();
    return publicClientActions.getLogs({
      address: TOKENS["MATIC"].address,
      fromBlock: blockNumber,
      toBlock: blockNumber
    });
  }

  const fetchLastLogs = () => {
    fetchMethods.setEnabled(true);
  };

  const fetchMethods = useFetch(async () => promise(), { isEnabled: true, ...opts });
  return {
    fetchLastLogs,
    ...fetchMethods
  };
}
