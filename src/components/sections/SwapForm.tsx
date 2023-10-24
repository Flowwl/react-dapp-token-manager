import { FC, useState } from 'react';
import cx from "classnames"
import NumericInput from "../atoms/NumericInput.tsx";
import { ArrowsUpDownIcon } from "@heroicons/react/20/solid";
import Button from "../atoms/Button.tsx";
import { useSwapTokensForTokens } from "../../hooks/useSwapTokensForTokens.ts";
import { useSwapContext } from "../../contexts/SwapContext.tsx";
import { useSwapTokens } from "../../hooks/useSwapTokens.ts";
import { computeBigIntToFloat } from "../../utils";
import Slider from "../atoms/Slider.tsx";

interface SwapFormProps {
  className?: string
}

const SwapForm: FC<SwapFormProps> = ({className}) => {
  const {token0UserBalance, isTokenUserBalanceLoading, tokenMode, refetchTokenUserBalance} = useSwapContext()
  const {onSwapTokens, onToken1AmountChange, onToken0AmountChange, ratio, swapTokens} = useSwapTokens()
  const [slippage, setSlippage] = useState(1)

  const {swapTokensForTokens} = useSwapTokensForTokens({
    onSuccess: () => {
      refetchTokenUserBalance()
    }
  })

  const onSwapClicked = () => {
    swapTokensForTokens(slippage)
  }
  const isAmountInValid = parseFloat(swapTokens.IN.amount) > 0 && parseFloat(swapTokens.IN.amount) <= (token0UserBalance || 0)
  const isAmountOutValid = parseFloat(swapTokens.OUT.amount) <= computeBigIntToFloat(swapTokens.OUT.reserve, swapTokens.OUT.decimals)
  return (
    <div className={cx("flex flex-col gap-4 mt-4 overflow-y-auto", className)}>
      <div className="flex flex-col gap-1 relative">
        <div className="flex justify-between">
          <div className="text-xl font-title flex items-center gap-4">
            {swapTokens.IN.token}
          </div>
          <div className="flex gap-2 mr-3 items-baseline font serif text-sm text-gray-400">
            <p>Balance:</p>
            {isTokenUserBalanceLoading && "-"}
            {!isTokenUserBalanceLoading && token0UserBalance && (<p>{token0UserBalance}</p>)}
          </div>
        </div>
        <NumericInput
          error={!isAmountInValid}
          max={token0UserBalance || 0}
          label="Amount"
          onChange={(e) => onToken0AmountChange(e.target.value)}
          value={Math.max(parseFloat(swapTokens.IN.amount), 0)}
        />
        <p
          className="text-purple-700 absolute top-auto left-auto right-4 bottom-2 cursor-pointer hover:text-purple-500"
          onClick={() => onToken0AmountChange(token0UserBalance?.toString() || "0.0")}
        >
          Max
        </p>
        {!isAmountInValid && (
          <p className="absolute text-red-700 -bottom-6 text-sm left-4">
            {parseFloat(swapTokens.IN.amount) > (token0UserBalance || 0) && "Insufficient balance"}
            {parseFloat(swapTokens.IN.amount) === 0 && "Amount must be greater than 0"}
          </p>
        )}
      </div>
      <div className="flex w-full justify-center ml-auto gap-4 items-center relative">
        <ArrowsUpDownIcon
          className="h-10 w-10 text-gray-400 hover:text-gray-50 cursor-pointer relative"
          onClick={onSwapTokens}
        />
      </div>
      <div className="flex flex-col gap-1 relative">
        <div className="flex justify-between">
          <div className="text-xl font-title flex items-center gap-4">
            {swapTokens.OUT.token}
          </div>
          <div
            className={cx("flex gap-2 mr-3 items-baseline font serif text-sm text-gray-400", {"invisible": ratio === null || ratio === 0})}>
            <p>Ratio: 1 {swapTokens.OUT.token} =</p>
            <p>{ratio || 0} {swapTokens.IN.token}</p>
          </div>
        </div>
        <NumericInput
          error={!isAmountOutValid}
          label="Amount"
          onChange={(e) => onToken1AmountChange(e.target.value)}
          value={(tokenMode === "IN" && !isAmountOutValid) ? 0 : swapTokens.OUT.amount}
        />
        {!isAmountOutValid && (
          <p className="absolute text-red-700 -bottom-6 left-4 text-sm">
            {parseFloat(swapTokens.OUT.amount) > computeBigIntToFloat(swapTokens.OUT.reserve, swapTokens.OUT.decimals) && "Insufficient liquidity"}
          </p>
        )}
      </div>
      <div className="flex gap-8 my-4">
        <p className="font-title text-lg">Slippage</p>
      <Slider
        className="gap-8 w-2/3 ml-auto"
        size="md"
        value={slippage}
        onChange={(e) => setSlippage(parseFloat(e.target.value))}
        min={0}
        max={3}
        step={0.5}
      />
      </div>
      <Button onClick={onSwapClicked} disabled={
        (!isAmountInValid || !isAmountOutValid)
        || parseFloat(swapTokens.IN.amount) === 0
        || parseFloat(swapTokens.OUT.amount) === 0
      }>
        Swap
      </Button>
    </div>
  );
};

export default SwapForm;
