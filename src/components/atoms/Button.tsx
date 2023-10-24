import { FC } from 'react';
import { Button as MTButton, ButtonProps as MTButtonProps } from "@material-tailwind/react";
import cx from "classnames";

const Button: FC<Omit<MTButtonProps, "ref">> = ({ className,color="purple",  children, ...props }) => {
  return (
    <MTButton className={cx("rounded-full px-16 mx-auto font-button text-md hover:opacity-80", className)} color={color} {...props} >{children}</MTButton>
  );
};

export default Button;
