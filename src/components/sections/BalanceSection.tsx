import { FC } from 'react';
import cx from "classnames";
import Spinner from "../atoms/Spinner.tsx";
import { TOKENS } from "../../constants/tokens.ts";
import { useGetTotalSupply, useGetUserBalance, useGetUserBalanceByToken } from "../../hooks";
import { useChainContext, useConnectedWalletContext } from "../../contexts";
import { ArrowPathIcon } from "@heroicons/react/20/solid";
import { useOnTransfersChanges } from "../../hooks/useOnTransfersChanges.ts";

interface BalanceSectionProps {
  className?: string;
}

const BalanceSection: FC<BalanceSectionProps> = ({ className }) => {
  const { selectedToken, changeTokenTo } = useChainContext();
  const { account } = useConnectedWalletContext();

  const { data: totalSupply } = useGetTotalSupply(selectedToken);
  const { data: userBalance, isLoading: isBalanceLoading, refetch: refetchBalance } = useGetUserBalance(account, {
    refetchInterval: 60 * 1000
  });
  const { data: busdUserBalance, isLoading: isBUSDBalanceLoading, refetch: refetchBUSD } = useGetUserBalanceByToken("BUSD", {
    deps: [account],
    refetchInterval: 60 * 1000
  });

  useOnTransfersChanges(() => onRefetch());

  const onRefetch = () => {
    refetchBalance();
    refetchBUSD();
  };

  return (
    <div className={cx("flex flex-col gap-3 bg-bg-700/70 rounded-lg shadow-xl overflow-y-auto px-8 py-4", className)}>
      <div className="flex items-center justify-between w-full">
        <div/>
        <h2 className="text-3xl self-center font-title">
          Balances
        </h2>
        <ArrowPathIcon
          className={cx("mr-4 text-gray-400 hover:text-gray-50 cursor-pointer h-6 w-6", {
            "animate-spin": isBalanceLoading || isBUSDBalanceLoading
          })}
          onClick={onRefetch}
        />
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex text-gray-400">
          <p className="font-title w-2/3">Total Supply</p>
          <p className="text-right w-1/3 truncate">{totalSupply || 0}</p>
        </div>
        <div
          className={cx("flex cursor-pointer hover:opacity-50 text-gray-400", { "text-gray-50": selectedToken === "MATIC" })}
          onClick={() => changeTokenTo("MATIC")}
        >
          <p className={cx("flex items-center gap-2 font-title w-2/3")}>
            {/*<img src={maticIcon} className="h-6 w-6 scale-125"/>*/}
            {selectedToken === "MATIC" && "> "}
            {TOKENS["MATIC"].label}
          </p>
          {!isBalanceLoading && <p className="text-right w-1/3">{userBalance || 0}</p>}
          {isBalanceLoading && <Spinner className={"ml-0 h-4 w-4"}/>}
        </div>
        <div
          className={cx("flex cursor-pointer hover:opacity-50 text-gray-400", { "text-gray-50": selectedToken === "BUSD" })}
          onClick={() => changeTokenTo("BUSD")}
        >
          <p className="flex items-center gap-3 font-title w-2/3">
            {/*<img src={dollarIcon} className="h-5 w-5"/>*/}
            {selectedToken === "BUSD" && "> "}
            {TOKENS["BUSD"].label}
          </p>
          {!isBUSDBalanceLoading && <p className="w-1/3 text-right">{busdUserBalance || 0}</p>}
          {isBUSDBalanceLoading && <Spinner className={"ml-0 h-4 w-4"}/>}
        </div>
      </div>
    </div>
  );
};

export default BalanceSection;
