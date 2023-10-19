import { FC } from 'react';
import cx from "classnames";
import WalletButton from "../molecules/WalletButton.tsx";
import { useWalletAuthContext } from "../../contexts";
import ConnectedStatus from "../molecules/ConnectedStatus.tsx";
import { NavLink } from "react-router-dom";

interface TopBarProps {
  className?: string;
}

const TopBar: FC<TopBarProps> = ({ className}) => {
  const { address } = useWalletAuthContext();
  return (
    <div className={cx("w-full text-white flex justify-between items-center px-4 rounded-lg", className)}>
      <h1 className="font-title text-4xl">Smardex</h1>
      <div className="ml-20 flex gap-4 w-full h-full items-end">
      <NavLink to={"/"} className={({ isActive }) => cx("font-title text-2xl text-gray-400 hover:underline hover:text-white", { "text-white": isActive })}>MyWallet</NavLink>
      <NavLink to={"/swap"} className={({ isActive }) => cx("font-title text-2xl text-gray-400 hover:underline hover:text-white", { "text-white": isActive })}>Swap</NavLink>
      </div>
      <div>
        {address && <ConnectedStatus/>}
        {!address && <WalletButton/>}
      </div>
    </div>
  );
};

export default TopBar;
