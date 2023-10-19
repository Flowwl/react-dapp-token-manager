import {FC} from 'react';
import {useWalletAuthContext} from "../contexts";
import SwapSection from "../components/sections/SwapSection.tsx";

interface SwapViewProps {
  className?: string;
}

const SwapView: FC<SwapViewProps> = ({className}) => {
  const {address} = useWalletAuthContext();
  if (!address) {
    return (<div className="mx-auto w-full">Please connect your walled</div>);
  }

  return (
    <SwapSection className={className}/>
  );
};

export default SwapView;
