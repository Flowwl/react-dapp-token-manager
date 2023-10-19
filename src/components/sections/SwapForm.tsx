import {FC, useEffect, useState} from 'react';
import cx from "classnames"
import NumericInput from "../atoms/NumericInput.tsx";
import {ArrowsUpDownIcon} from "@heroicons/react/20/solid";
import {TokenName} from "../../constants";
import {useGetUserBalanceByToken} from "../../hooks";
import {useConnectedWalletContext} from "../../contexts";
import Button from "../atoms/Button.tsx";

interface SwapFormProps {
  className?: string
}

const tokenValue: Record<TokenName, number> = {
  "WBTC": 1,
  "BUSD": 2,
  "MATIC": 3
} as const;

const SwapForm: FC<SwapFormProps> = ({className}) => {
  const [token1, setToken1] = useState<keyof typeof tokenValue>("WBTC");
  const [token2, setToken2] = useState<keyof typeof tokenValue>("BUSD");
  const {account} = useConnectedWalletContext();
  const {
    data: token1UserBalance,
    isLoading: isTokenUserBalanceLoading,
    refetch: refetchTokenUserBalance
  } = useGetUserBalanceByToken(token1, {deps: [account],});

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
    setToken2Amount(newValue ? newValue.toString() : "0.0");
  }

  const onToken2AmountChange = (value: string) => {
    setToken2Amount(value);
    const newValue = parseFloat(value) * ratio
    setToken1Amount(newValue ? newValue.toString() : "0.0");
  }

  useEffect(() => {
    refetchTokenUserBalance();
  }, [token1]);

  return (
    <div className={cx("flex flex-col gap-4 h-full mt-4 overflow-y-auto", className)}>
      <div className="flex flex-col gap-1 relative">
        <div className="text-xl font-title flex items-center gap-4">
          {token1}
        </div>
        <NumericInput
          label="Amount"
          onChange={(e) => onToken1AmountChange(e.target.value)}
          value={token1Amount}
        />
        <p
          className="text-purple-700 absolute top-auto left-auto right-4 bottom-8 cursor-pointer hover:text-purple-500"
          onClick={() => onToken1AmountChange(token1UserBalance?.toString() || "0.0")}
        >
          Max
        </p>
        <div className="flex gap-2 ml-auto mr-3 text-gray-400 font serif text-sm items-baseline">
          <p>Balance:</p>
          {isTokenUserBalanceLoading && "-"}
          {!isTokenUserBalanceLoading && token1UserBalance && (<p>{token1UserBalance}</p>)}
        </div>
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
      <Button>Swap</Button>
    </div>
  );
};

export default SwapForm;
