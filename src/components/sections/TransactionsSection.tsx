import { FC } from 'react';
import cx from "classnames";
import { ArrowPathIcon } from "@heroicons/react/20/solid";
import Spinner from "../atoms/Spinner.tsx";
import { useGetLastLogs } from "../../hooks/useGetLastLogs.ts";

interface TransactionsSectionProps {
  className?: string;
}

const TransactionsSection: FC<TransactionsSectionProps> = ({ className }) => {
  // const { data: pendingTransactions } = useGetPendingTransactions({ isEnabled: true });
  const { data: logs, isLoading: areLogsLoading, fetchLastLogs } = useGetLastLogs({ isEnabled: true, refetchInterval: 60000 });

  const onRefetch = () => {
    fetchLastLogs();
  };
  return (
    <div className={cx("bg-bg-700/70 rounded-lg flex flex-col", className)}>
      <div className="flex items-center justify-between">
        <div/>
        <h2 className="py-4 px-8 font-title text-3xl">Transactions</h2>
        <ArrowPathIcon
          className={cx("mr-4 text-gray-400 hover:text-gray-50 cursor-pointer h-7 w-7", {
            "animate-spin": areLogsLoading
          })}
          onClick={onRefetch}
        />
      </div>
      <div className="flex flex-col gap-1 px-8 pt-4 pb-8 h-full overflow-y-auto">
        <div className="h-1/2 flex flex-col gap-3">
          <h3 className="font-title text-lg">Pending transactions</h3>
          <div className="flex justify-center h-full items-center">

            {/*{pendingTransactions?.length === 0 && (*/}
            {/*  <p className="text-center">No pending transactions</p>*/}
            {/*)}*/}
            {/*{pendingTransactions?.map(() => (*/}
            {/*    <p>{}</p>*/}
            {/*  )*/}
            {/*)}*/}
          </div>
        </div>
        {/*<div className="border-purple-500 border-t "/>*/}
        <div className="flex flex-col gap-3 h-1/2">
          <h3 className="font-title text-lg">Past transactions</h3>
          <div className="flex flex-col overflow-y-auto h-full">
            {logs?.length === 0 && (
              <p className="text-center">No transactions</p>
            )}
            {areLogsLoading && (<Spinner/>)}
            {(logs?.length || 0) > 0 && logs?.map((log) => (
                <div className="w-full" key={log.logIndex}>
                  <a href={`https://mumbai.polygonscan.com/tx/${log.transactionHash}`} target="_blank">
                    <p className="truncate w-full">{log.transactionHash}</p>
                  </a>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionsSection;
