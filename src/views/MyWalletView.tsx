import { FC } from 'react';
import LeftPanel from "../components/sections/LeftPanel.tsx";
import UserActionsSection from "../components/sections/UserActionsSection.tsx";
import EventsSection from "../components/sections/EventsSection.tsx";
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
      <div className="h-1/2 w-full flex flex-col mx-auto gap-4">
        <div className="flex h-full w-full gap-4">
          <LeftPanel className="!w-3/12"/>
          <UserActionsSection className="!w-5/12"/>
          <EventsSection className="!w-4/12 p-2"/>
        </div>
      </div>
      <ChartSection className="w-full h-1/2"/>
    </ConnectedWalletContext>
  );
};

export default MyWalletView;
