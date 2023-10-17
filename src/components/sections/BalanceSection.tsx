import { FC } from 'react';
import cx from "classnames";
import Spinner from "../atoms/Spinner.tsx";
import { TOKENS } from "../../constants/tokens.ts";
import { useGetTotalSupply, useGetUserBalance, useGetUserBalanceByToken } from "../../hooks";
import { useChainContext, useConnectedWalletContext } from "../../contexts";
import dollarIcon from "../../assets/dollar-icon.png";
import maticIcon from "../../assets/matic.svg";
import { ArrowPathIcon } from "@heroicons/react/20/solid";

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

  const onRefetch = () => {
    refetchBalance();
    refetchBUSD();
  };

  return (
    <div className={cx("flex flex-col gap-6", className)}>
      <div className="flex items-center justify-between w-full">
        <div/>
        <h2 className="text-3xl self-center font-title">
          Balances
        </h2>
        <ArrowPathIcon
          className={cx("mr-4 text-gray-400 hover:text-gray-50 cursor-pointer h-7 w-7", {
            "animate-spin": isBalanceLoading || isBUSDBalanceLoading
          })}
          onClick={onRefetch}
        />
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex justify-between">
          <p>Total Supply</p>
          <p className="pl-4">{totalSupply || 0}</p>
        </div>
        <div
          className={cx("flex justify-between cursor-pointer hover:opacity-50", { "text-purple-500": selectedToken === "MATIC" })}
          onClick={() => changeTokenTo("MATIC")}
        >
          <p className={cx("flex items-center gap-2")}>
            <img src={maticIcon} className="h-6 w-6 scale-125"/>
            {TOKENS["MATIC"].label}
          </p>
          {!isBalanceLoading && <p className="pl-4">{userBalance || 0}</p>}
          {isBalanceLoading && <Spinner className={"mr-0 h-4 w-4"}/>}
        </div>
        <div
          className={cx("flex justify-between cursor-pointer hover:opacity-50", { "text-purple-500": selectedToken === "BUSD" })}
          onClick={() => changeTokenTo("BUSD")}
        >
          <p className="flex items-center gap-2">
            <img src={dollarIcon} className="h-6 w-6"/>
            {TOKENS["BUSD"].label}
          </p>
          {!isBUSDBalanceLoading && <p className="pl-4">{busdUserBalance || 0}</p>}
          {isBUSDBalanceLoading && <Spinner className={"mr-0 h-4 w-4"}/>}
        </div>
      </div>
    </div>
  );
};

export default BalanceSection;
