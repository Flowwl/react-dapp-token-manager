import { FC } from 'react';
import cx from "classnames";
import { useGetPendingTransactions } from "../../hooks/useGetPendingTransactions.ts";
import { ArrowPathIcon } from "@heroicons/react/20/solid";

interface TransactionsSectionProps {
  className?: string;
}

const TransactionsSection: FC<TransactionsSectionProps> = ({ className }) => {
  const { data: pendingTransactions, pendingTransactions: toto, isLoading, fetchPendingTransactions } = useGetPendingTransactions({ isEnabled: true });

  console.log(pendingTransactions, toto);
  return (
    <div className={cx("bg-bg-700/70 rounded-lg flex flex-col", className)}>
      <div className="flex items-center justify-between">
        <div/>
        <h2 className="py-4 px-8 font-title text-3xl">Transactions</h2>
        <ArrowPathIcon className={cx("mr-4 text-gray-400 hover:text-gray-50 cursor-pointer h-7 w-7", {
          "animate-spin": isLoading
        })} onClick={fetchPendingTransactions}/>
      </div>
      <div className="flex flex-col gap-1 px-8 pt-4 pb-8 h-full justify-around">
        <div className="h-1/2 flex flex-col gap-3">
          <h3 className="font-title text-lg">Pending transactions</h3>
          <div className="flex justify-center h-full items-center">

            {pendingTransactions?.length === 0 && (
              <p className="text-center">No pending transactions</p>
            )}
            {pendingTransactions?.map((transaction) => (
                <p>{transaction}</p>
              )
            )}
          </div>
        </div>
        {/*<div className="border-purple-500 border-t "/>*/}
        <div className="h-1/2 flex flex-col gap-3">
          <h3 className="font-title text-lg">Past transactions</h3>
          <div className="flex justify-center h-full items-center">
            {pendingTransactions?.length === 0 && (
              <p className="text-center">No transactions</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionsSection;
