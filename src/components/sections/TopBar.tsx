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
    <div className={cx("h-24 w-full text-white flex justify-center items-center px-4 rounded-lg", className)}>
        { address && <ConnectedStatus/> }
        {!address && <WalletButton/>}
    </div>
  );
};

export default TopBar;
