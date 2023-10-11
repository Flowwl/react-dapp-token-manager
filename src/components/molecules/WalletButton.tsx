import { FC } from 'react';
import cx from "classnames";
import { useWalletAuthContext } from "../../contexts";
import MetamaskIcon from "../atoms/MetamaskIcon.tsx";

interface WalletButtonProps {
  className?: string;
}

const WalletButton: FC<WalletButtonProps> = ({ className }) => {
  const { connect } = useWalletAuthContext();

  return (
    <button
      className={cx("text-gray-50 px-8 py-2 rounded-md bg-[#1e2124] flex flex-row items-center justify-center border border-[#1e2124] hover:border hover:border-indigo-600 shadow-md shadow-indigo-500/10", className)}
      onClick={connect}
    >
      <MetamaskIcon/>
      <h1 className="mx-auto">Connect Wallet</h1>
    </button>
  );
};

export default WalletButton;
