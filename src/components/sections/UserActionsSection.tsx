import { FC } from 'react';
import cx from "classnames";
import SendButton from "../molecules/SendButton.tsx";
import { useGetTotalSupply, useGetUserBalanceByToken } from "../../hooks";
import { useChainContext, useConnectedWalletContext } from "../../contexts";

interface UserActionsSectionProps {
  className?: string;
}

const UserActionsSection: FC<UserActionsSectionProps> = ({ className }) => {
  const {selectedToken, tokenDecimals} = useChainContext()
  const { address } = useConnectedWalletContext()
  const { data: totalSupply }  = useGetTotalSupply(selectedToken, tokenDecimals)
  const { data: userBalance }  = useGetUserBalanceByToken(address, tokenDecimals);

  return (
    <div className={cx(className)}>
      <div>Total Supply: {totalSupply || 0}</div>
      <div>Balance: {userBalance || 0}</div>
      <SendButton/>
    </div>
  );
};

export default UserActionsSection;
