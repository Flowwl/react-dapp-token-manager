import { FC, useEffect } from 'react';
import cx from "classnames";
import { useGetAllAllowances } from "../../hooks/useGetAllAllowances.ts";
import Spinner from "../atoms/Spinner.tsx";
import { useChainContext } from "../../contexts";
import { ArrowPathIcon } from "@heroicons/react/20/solid";
import { Tooltip } from 'react-tooltip';
import { formatBigInt } from "../../utils/formatBigInt.ts";

interface AllowanceSectionProps {
  className?: string;
}

const AllowanceSection: FC<AllowanceSectionProps> = ({ className }) => {
  const { tokenDecimals } = useChainContext()
  const { fetchAllAllowances, data: allowances, isLoading } = useGetAllAllowances({ isEnabled: false });

  useEffect(() => {
    onRefetch();
  }, []);

  const onRefetch = () => {
    fetchAllAllowances();
  }
  return (
    <div className={cx("flex flex-col gap-3 bg-bg-700/70 rounded-lg shadow-xl overflow-y-auto px-8 py-4",className)}>
      <div className="flex items-center justify-between w-full">
        <div/>
        <h2 className="text-3xl self-center font-title">
          Allowances
        </h2>
        <ArrowPathIcon
          className={cx("mr-4 text-gray-400 hover:text-gray-50 cursor-pointer h-6 w-6", {
            "animate-spin": isLoading
          })}
          onClick={onRefetch}
        />
      </div>
      <div className="h-44 overflow-y-auto">
        {isLoading && <Spinner/>}
        {allowances && Object.entries(allowances).map(([spender, allowance]) => (
          <div className="flex flex-row justify-between gap-12 items-center" key={spender}>
            <p className="w-40 text-sm truncate" data-tooltip-id="allowance-big-number" data-tooltip-content={spender}>{spender}</p>
            <p className="w-1/3 truncate text-right" data-tooltip-id="allowance-big-number" data-tooltip-content={formatBigInt(allowance, tokenDecimals).toString()}>{formatBigInt(allowance, tokenDecimals).toString()}</p>
          </div>
        )
        )}
        <Tooltip id="allowance-big-number" />
      </div>
    </div>
  );
};

export default AllowanceSection;
