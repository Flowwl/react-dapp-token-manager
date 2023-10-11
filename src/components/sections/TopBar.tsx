import { FC } from 'react';
import cx from "classnames";
import WalletButton from "../molecules/WalletButton.tsx";
import { useWalletAuthContext } from "../../contexts";
import ConnectedStatus from "../molecules/ConnectedStatus.tsx";

interface TopBarProps {
  className?: string;
}

const TopBar: FC<TopBarProps> = ({ className }) => {
  const { address } = useWalletAuthContext();
  return (
    <div className={cx("h-24 bg-white/80 w-full text-gray-900 flex justify-between px-4", className)}>
      <div/>
      <div className="flex flex-col justify-center">
        { address && <ConnectedStatus/> }
        {!address && <WalletButton/>}
      </div>
    </div>
  );
};

export default TopBar;
