import { FC, useEffect } from 'react';
import cx from "classnames";
import SendButton from "../molecules/SendButton.tsx";
import { getTotalSupply } from "../../services";

interface UserActionsSectionProps {
  className?: string;
}

const UserActionsSection: FC<UserActionsSectionProps> = ({ className }) => {

  useEffect(() => {
    getTotalSupply("MATIC").then((result) => {
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
