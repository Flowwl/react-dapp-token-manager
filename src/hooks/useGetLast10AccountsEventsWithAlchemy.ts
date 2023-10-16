import { useChainContext, useConnectedWalletContext } from "../contexts";
import { FetchOptions, useFetch } from "./useFetch.ts";
import { TOKENS } from "../constants/tokens.ts";
import { getAlchemyInstance } from "../utils";
import { assertAddressExists } from "../asserts";
import { Log } from "alchemy-sdk";

export function useGetLast10AccountEventsWithAlchemy(opts: Partial<FetchOptions<Array<Log>>> = {}) {
  const { selectedToken } = useChainContext();
  const { account } = useConnectedWalletContext();
  const promise = async () => {
    const alchemy = getAlchemyInstance(TOKENS[selectedToken].alchemyNetwork);

    const address = TOKENS[selectedToken].address;
    assertAddressExists(address);

    const approvals = await alchemy.core.getLogs({
      fromBlock: TOKENS[selectedToken].block,
      toBlock: "latest",
      address: address,
      topics: [TOKENS[selectedToken].events?.Approval || "", account],
    })

    const transfers = await alchemy.core.getLogs({
      fromBlock: TOKENS[selectedToken].block,
      toBlock: "latest",
      address: address,
      topics: [TOKENS[selectedToken].events?.Transfer || "", account],
    })

    console.log("account", approvals, transfers)
    return [...approvals, ...transfers];
  };

  const fetchLast10AccountEventsWithAlchemy = () => {
    fetchMethods.refetch();
  };

  const fetchMethods = useFetch(async () => promise(), { ...opts });
  return {
    fetchLast10AccountEventsWithAlchemy,
    ...fetchMethods
  };
}
