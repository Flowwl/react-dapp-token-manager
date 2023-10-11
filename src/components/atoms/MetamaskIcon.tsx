import { FC } from 'react';
import cx from "classnames";

interface MetamaskIconProps {
  className?: string;
}

const MetamaskIcon: FC<MetamaskIconProps> = ({ className }) => {

  return (
    <img className={cx("h-[25px] w-[25px]", className)} src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg" alt="MetaMask Fox"/>
  );
};

export default MetamaskIcon;
