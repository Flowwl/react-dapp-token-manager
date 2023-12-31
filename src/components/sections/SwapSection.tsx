import {FC} from 'react';
import cx from "classnames"
import SwapForm from "./SwapForm.tsx";
import SwapContext from "../../contexts/SwapContext.tsx";

interface SwapSectionProps {
  className?: string
}


const SwapSection: FC<SwapSectionProps> = ({className}) => {
  return (
    <SwapContext className={cx("bg-bg-700/70 rounded-lg shadow-xl m-auto w-1/2 px-8 pt-8 pb-12 overflow-y-auto", className)}>
      <h2 className="text-4xl font-title text-center">SWAP</h2>
      <SwapForm/>
    </SwapContext>
  );
};

export default SwapSection;
