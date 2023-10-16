import { useChainContext } from "../contexts";
import { FetchOptions, useFetch } from "./useFetch.ts";
import { TOKENS } from "../constants/tokens.ts";
import { getAlchemyInstance } from "../utils";
import { Log } from "alchemy-sdk";
import { assertAddressExists } from "../asserts";

export function useGetLast10EventsWithAlchemy(opts: Partial<FetchOptions<Array<Log>>> = {}) {
  const { selectedToken } = useChainContext();
  const promise = async () => {
    const address = TOKENS[selectedToken].address;
    assertAddressExists(address);
    const alchemy = getAlchemyInstance(TOKENS[selectedToken].alchemyNetwork);
    const approvals = await alchemy.core.getLogs({
      fromBlock: TOKENS[selectedToken].block,
      toBlock: "latest",
      address: address,
      topics: [TOKENS[selectedToken].events?.Approval || ""],
    })

    const transfers = await alchemy.core.getLogs({
      fromBlock: TOKENS[selectedToken].block,
      toBlock: "latest",
      address: address,
      topics: [TOKENS[selectedToken].events?.Transfer || ""],
    })

    console.log(approvals, transfers)
    return [...approvals, ...transfers];
  };

  const fetchLast10EventsWithAlchemy = () => {
    fetchMethods.refetch();
  };

  const fetchMethods = useFetch(async () => promise(), { ...opts });
  return {
    fetchLast10EventsWithAlchemy,
    ...fetchMethods
  };
}
