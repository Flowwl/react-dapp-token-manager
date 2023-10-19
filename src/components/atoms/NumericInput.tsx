import {FC} from 'react';
import {NumericFormat, NumericFormatProps} from "react-number-format";
import {InputProps as MTInputProps} from "@material-tailwind/react";

import Input from "./Input.tsx";

type Props = MTInputProps & NumericFormatProps
const NumericInput: FC<Props> = ({className, color = "white", ...props}) => {

  return (
    <NumericFormat {...props} customInput={Input} className={className} color={color}/>
  );
};

export default NumericInput;
