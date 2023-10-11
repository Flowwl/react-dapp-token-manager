import { FC, useEffect } from 'react';
import cx from "classnames";
import SendButton from "../molecules/SendButton.tsx";
import { useConnectedWalletContext } from "../../contexts";

interface UserActionsSectionProps {
  className?: string;
}

const UserActionsSection: FC<UserActionsSectionProps> = ({ className }) => {

  const { getTotalSupply } = useConnectedWalletContext();

  useEffect(() => {
    getTotalSupply().then((result) => {
      console.log(result);
    });
  }, []);

  return (
    <div className={cx(className)}>
      <SendButton/>
    </div>
  );
};

export default UserActionsSection;
