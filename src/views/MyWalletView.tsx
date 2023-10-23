import { FC } from 'react';
import LeftPanel from "../components/sections/LeftPanel.tsx";
import UserActionsSection from "../components/sections/UserActionsSection.tsx";
import ChartSection from "../components/sections/ChartSection.tsx";
import { useWalletAuthContext } from "../contexts";
import ConnectedWalletContext from "../contexts/ConnectedWalletContext.tsx";
import cx from "classnames";

interface MyWalletViewProps {
  className?: string;
}

const MyWalletView: FC<MyWalletViewProps> = ({ className }) => {
  const { address } = useWalletAuthContext();

  if (!address) {
    return (<div className="mx-auto w-full">Please connect your walled</div>);
  }
  return (
    <ConnectedWalletContext address={address} className={cx("w-full h-full mx-auto flex flex-col gap-4", className)}>
      <div className="w-full flex flex-col mx-auto gap-4">
        <div className="flex h-full w-full gap-4">
          <LeftPanel className="!w-1/3"/>
          <UserActionsSection className="w-2/3"/>
        </div>
      </div>
      <ChartSection className="w-full h-1/2"/>
    </ConnectedWalletContext>
  );
};

export default MyWalletView;
