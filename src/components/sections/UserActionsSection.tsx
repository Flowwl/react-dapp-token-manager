import { FC } from 'react';
import cx from "classnames";
import SendButton from "../molecules/SendButton.tsx";
import { useGetTotalSupply } from "../../hooks";
import { useChainContext } from "../../contexts";
import { computeBigIntToFloat } from "../../utils/computeBigIntToFloat.ts";

interface UserActionsSectionProps {
  className?: string;
}

const UserActionsSection: FC<UserActionsSectionProps> = ({ className }) => {
  const {selectedToken, tokenDecimals} = useChainContext()
  const { data: totalSupply }  = useGetTotalSupply(selectedToken)

  return (
    <div className={cx(className)}>
      <div>Total Supply: {computeBigIntToFloat(totalSupply || 0n, tokenDecimals)}</div>
      <SendButton/>
    </div>
  );
};

export default UserActionsSection;
