import { FC, useEffect } from 'react';
import cx from "classnames";
import { useGetAllAllowances } from "../../hooks/useGetAllAllowances.ts";
import Spinner from "../atoms/Spinner.tsx";
import { computeBigIntToFloat } from "../../utils";
import { useChainContext } from "../../contexts";
import { ArrowPathIcon } from "@heroicons/react/20/solid";

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
    <div className={cx(className)}>
      <div className="flex items-center justify-between w-full">
        <div/>
        <h2 className="text-3xl self-center py-4 px-8 font-title">
          Allowances
        </h2>
        <ArrowPathIcon
          className={cx("mr-4 text-gray-400 hover:text-gray-50 cursor-pointer h-6 w-6", {
            "animate-spin": isLoading
          })}
          onClick={onRefetch}
        />
      </div>
      <div className="px-8 pt-4 pb-8">
        {isLoading && <Spinner/>}
        {allowances && Object.entries(allowances).map(([spender, allowance]) => (
          <div className="flex flex-row justify-between">
            <p className="w-24 truncate">{spender}</p>
            {computeBigIntToFloat(allowance, tokenDecimals)}
          </div>
        )
        )}
      </div>
    </div>
  );
};

export default AllowanceSection;
