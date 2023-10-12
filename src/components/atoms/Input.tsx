import { FC } from 'react';
import { Input as MTInput, InputProps as MTInputProps } from "@material-tailwind/react";
import cx from "classnames";
const Input: FC<MTInputProps> = ({ className, color="white", ...props }) => {

  return (
    // @ts-expect-error Typing is weird https://github.com/creativetimofficial/material-tailwind/issues/427
    <MTInput color={color}  className={cx("!min-w-24", className)} {...props} />
  );
};

export default Input;
