import { FC } from 'react';
import { Button as MTButton, ButtonProps as MTButtonProps } from "@material-tailwind/react";

const Button: FC<MTButtonProps> = ({ className,color="white",  children, ...props }) => {
  return (
    // @ts-expect-error Typing is weird https://github.com/creativetimofficial/material-tailwind/issues/427
    <MTButton className={className} color={color} {...props} >{children}</MTButton>
  );
};

export default Button;
