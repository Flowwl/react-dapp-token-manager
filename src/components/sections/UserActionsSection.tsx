import { FC, useEffect } from 'react';
import cx from "classnames";
import SendButton from "../molecules/SendButton.tsx";
import { useGetTotalSupply } from "../../hooks";
import { useChainContext } from "../../contexts";

interface UserActionsSectionProps {
  className?: string;
}

const UserActionsSection: FC<UserActionsSectionProps> = ({ className }) => {
  const {selectedToken} = useChainContext()
  const { data }  = useGetTotalSupply(selectedToken)

  useEffect(() => {
    if (data) {
      console.log(data)
    }
  }, [data]);

  return (
    <div className={cx(className)}>
      <SendButton/>
    </div>
  );
};

export default UserActionsSection;
