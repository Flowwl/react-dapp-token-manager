import { FC } from 'react';
import { Button as MTButton, ButtonProps as MTButtonProps } from "@material-tailwind/react";
import cx from "classnames";

const Button: FC<MTButtonProps> = ({ className,color="purple",  children, ...props }) => {
  return (
    // @ts-expect-error Typing is weird https://github.com/creativetimofficial/material-tailwind/issues/427
    <MTButton className={cx("rounded-full px-16 mx-auto font-button text-md", className)} color={color} {...props} >{children}</MTButton>
  );
};

export default Button;
