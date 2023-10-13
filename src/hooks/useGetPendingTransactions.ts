import { useChainContext } from "../contexts";
import { FetchOptions, useFetch } from "./useFetch.ts";
import { useState } from "react";
import { OnTransactionsParameter } from "viem";

export function useGetPendingTransactions(opts: Partial<FetchOptions<unknown[]>> = {}) {
  const { publicClientActions} = useChainContext()
  const [pendingTransactions, setPendingTransactions] = useState<OnTransactionsParameter>([])
  const promise = async () => {
    console.time("calling watch pending transactions");
    publicClientActions.watchPendingTransactions({
      onTransactions: (transactions) => {
        console.time("refetching transactions");
        setPendingTransactions(transactions)
      },
      poll: true,
      pollingInterval: opts.refetchInterval || 1000
    });

    return pendingTransactions;
  }

  const fetchPendingTransactions = () => {
    fetchMethods.refetch();
  };

  const fetchMethods = useFetch(async () => promise(), { isEnabled: false, ...opts });
  return {
    fetchPendingTransactions,
    pendingTransactions,
    ...fetchMethods
  };
}
