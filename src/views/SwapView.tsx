import { FC } from 'react';
import cx from "classnames";

interface SwapViewProps {
  className?: string;
}

const SwapView: FC<SwapViewProps> = ({ className }) => {

  return (
    <div className={cx(className)}>
      <p>SwapView</p>
    </div>
  );
};

export default SwapView;
