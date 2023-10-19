import {FC, useState} from 'react';
import cx from "classnames";
import {ArrowsUpDownIcon} from "@heroicons/react/20/solid";
import NumericInput from "../components/atoms/NumericInput.tsx";

interface SwapViewProps {
  className?: string;
}

const tokenValue = {
  "WBTC": 1,
  "BUSD": 2
} as const;
const SwapView: FC<SwapViewProps> = ({className}) => {
  const [token1, setToken1] = useState<keyof typeof tokenValue>("WBTC");
  const [token2, setToken2] = useState<keyof typeof tokenValue>("BUSD");
  const ratio = tokenValue[token1] / tokenValue[token2];
  const [token1Amount, setToken1Amount] = useState<string>("0.0")
  const [token2Amount, setToken2Amount] = useState<string>("0.0")
  const onSwap = () => {
    setToken1((prevState) => prevState === "WBTC" ? "BUSD" : "WBTC");
    setToken2((prevState) => prevState === "WBTC" ? "BUSD" : "WBTC");
    onToken1AmountChange(token2Amount);
  };

  const onToken1AmountChange = (value: string) => {
    setToken1Amount(value);
    const newValue = parseFloat(value) * ratio
    setToken2Amount( newValue ? newValue.toString() : "0.0");
  }

  const onToken2AmountChange = (value: string) => {
    setToken2Amount(value);
    const newValue = parseFloat(value) * ratio
    setToken1Amount(newValue ? newValue.toString() : "0.0");
  }

  return (
    <div className={cx("bg-bg-700/70 rounded-lg shadow-xl m-auto w-1/2 px-8 pt-8 pb-12 overflow-y-auto", className)}>
      <h2 className="text-4xl font-title text-center">SWAP</h2>
      <div className="flex flex-col gap-4 h-full mt-4 overflow-y-auto">
        <div className="flex flex-col gap-1">
          <p className="text-xl font-title">{token1}</p>
          <NumericInput
            label="Amount"
            onChange={(e) => onToken1AmountChange(e.target.value)}
            value={token1Amount}
          />
        </div>
        <div className="flex w-full justify-center ml-auto gap-4 items-center relative">
          <ArrowsUpDownIcon
            className="h-10 w-10 text-gray-400 hover:text-gray-50 cursor-pointer relative"
            onClick={onSwap}
          />
          <p className="font-light font-title text-xl absolute inset-auto ml-32">ratio: <span>{ratio}</span></p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-xl font-title">{token2}</p>
          <NumericInput
            label="Amount"
            onChange={(e) => onToken2AmountChange(e.target.value)}
            value={token2Amount}
          />
        </div>
      </div>
    </div>
  );
};

export default SwapView;
