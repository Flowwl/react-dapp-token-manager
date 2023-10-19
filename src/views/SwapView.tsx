import { FC } from 'react';
import cx from "classnames";

interface SwapViewProps {
  className?: string;
}

const SwapView: FC<SwapViewProps> = ({ className }) => {

  return (
    <div className={cx("bg-bg-700/70 rounded-lg shadow-xl mx-auto w-1/2", className)}>
      <p>SwapView</p>
    </div>
  );
};

export default SwapView;
