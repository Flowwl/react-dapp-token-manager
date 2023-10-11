import { FC } from 'react';
import cx from "classnames";
import WalletButton from "../molecules/WalletButton.tsx";
import { useChainContext, useWalletAuthContext } from "../../contexts";
import ConnectedStatus from "../molecules/ConnectedStatus.tsx";
import { TOKENS } from "../../constants/tokens.ts";

interface TopBarProps {
  className?: string;
}

const TopBar: FC<TopBarProps> = ({ className }) => {
  const { selectedToken } = useChainContext();
  const { address } = useWalletAuthContext();
  return (
    <div className={cx("h-24 bg-white/80 w-full text-gray-900 flex justify-between items-center px-4", className)}>
      <div>Token: {TOKENS[selectedToken].label}</div>
      <div className="flex flex-col justify-center">
        { address && <ConnectedStatus/> }
        {!address && <WalletButton/>}
      </div>
    </div>
  );
};

export default TopBar;
