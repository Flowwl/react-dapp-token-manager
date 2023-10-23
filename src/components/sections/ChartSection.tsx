import { FC, useEffect } from 'react';
import cx from "classnames";
import { ArrowPathIcon } from "@heroicons/react/20/solid";
import Spinner from "../atoms/Spinner.tsx";
import TransferChart from "../molecules/TransferChart.tsx";
import { useGetAllTransfersByTimestamps } from "../../hooks/useGetAllTransfersByTimestamps.ts";

interface ChartSectionProps {
  className?: string;
}

const ChartSection: FC<ChartSectionProps> = ({ className }) => {
  const { data: transfers, isLoading: areTransfersLoading, fetchAllTransfers } = useGetAllTransfersByTimestamps({ isEnabled: false });

  useEffect(() => {
    refetch();
  }, []);

  const refetch = () => {
    fetchAllTransfers();
  };
  return (
    <div className={cx("bg-bg-700/70 rounded-lg shadow-xl flex flex-col mx-auto", className)}>
      <div className="flex items-center justify-between w-full">
        <div/>
        <h2 className="text-3xl self-center py-4 px-8 font-title">
          Charts
        </h2>
        <ArrowPathIcon
          className={cx("mr-4 text-gray-400 hover:text-gray-50 cursor-pointer h-7 w-7", {
            "animate-spin": areTransfersLoading
          })}
          onClick={refetch}
        />
      </div>
      <div className="h-full w-full flex flex-col mx-auto">
        {!transfers && <Spinner className="h-16 w-16"/>}
        {transfers && <TransferChart transfers={transfers}/>}
      </div>
    </div>
  );
};

export default ChartSection;
