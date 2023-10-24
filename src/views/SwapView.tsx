import {FC} from 'react';
import {useWalletAuthContext} from "../contexts";
import SwapSection from "../components/sections/SwapSection.tsx";
import ConnectedWalletContextProvider from "../contexts/ConnectedWalletContext.tsx";
import cx from "classnames";

interface SwapViewProps {
  className?: string;
}

const SwapView: FC<SwapViewProps> = ({className}) => {
  const {address} = useWalletAuthContext();
  if (!address) {
    return (<div className="mx-auto w-full">Please connect your walled</div>);
  }
  return (
    <ConnectedWalletContextProvider address={address} className={cx("flex h-full w-full gap-4", className)}>
      {/*<BalanceSection className="my-auto !w-1/2 h-1/2"/>*/}
      <SwapSection className={"!w-1/2 h-3/5"}/>
    </ConnectedWalletContextProvider>
  );
};

export default SwapView;
