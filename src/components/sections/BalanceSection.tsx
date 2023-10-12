import { FC } from 'react';
import cx from "classnames";
import Spinner from "../atoms/Spinner.tsx";
import { TOKENS } from "../../constants/tokens.ts";
import { useGetTotalSupply, useGetUserBalance, useGetUserBalanceByToken } from "../../hooks";
import { useChainContext, useConnectedWalletContext } from "../../contexts";
import dollarIcon from "../../assets/dollar-icon.png";
import maticIcon from "../../assets/matic.svg";

interface BalanceSectionProps {
  className?: string;
}

const BalanceSection: FC<BalanceSectionProps> = ({ className }) => {
  const { selectedToken } = useChainContext();
  const { address } = useConnectedWalletContext();

  const { data: totalSupply } = useGetTotalSupply(selectedToken);
  const { data: userBalance, isLoading: isBalanceLoading } = useGetUserBalance(address);
  const { data: busdUserBalance, isLoading: isBUSDBalanceLoading } = useGetUserBalanceByToken("BUSD");

  return (
    <div className={cx("bg-bg-700 rounded-lg", className)}>
      <h2 className="text-xl self-center py-4 px-8">Balances</h2>
      <div className="flex flex-col gap-1 px-8 pt-4 pb-8">
        <div className="flex justify-between">
          <p>Total Supply</p>
          <p className="pl-4">{totalSupply || 0}</p>
        </div>
        <div className="flex justify-between">
          <p className="flex items-center gap-2">
            <img src={maticIcon} className="h-6 w-6 scale-125"/>
            {TOKENS[selectedToken].label}
          </p>
          {!isBalanceLoading && <p className="pl-4">{userBalance || 0}</p>}
          {isBalanceLoading && <Spinner className={"ml-0"}/>}
        </div>
        <div className="flex justify-between">
          <p className="flex items-center gap-2">
            <img src={dollarIcon} className="h-6 w-6"/>
            {TOKENS["BUSD"].label}
          </p>
          {!isBUSDBalanceLoading && <p className="pl-4">{busdUserBalance || 0}</p>}
          {isBUSDBalanceLoading && <Spinner className={"ml-0"}/>}
        </div>
      </div>
    </div>
  );
};

export default BalanceSection;
