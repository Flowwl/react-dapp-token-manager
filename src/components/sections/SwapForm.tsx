import { FC } from 'react';
import cx from "classnames"
import NumericInput from "../atoms/NumericInput.tsx";
import { ArrowsUpDownIcon } from "@heroicons/react/20/solid";
import Button from "../atoms/Button.tsx";
import { useSwapExactTokensForTokens } from "../../hooks/useSwapExactTokensForTokens.ts";
import { useSwapContext } from "../../contexts/SwapContext.tsx";
import { useSwapTokens } from "../../hooks/useSwapTokens.ts";

interface SwapFormProps {
  className?: string
}

const SwapForm: FC<SwapFormProps> = ({className}) => {
  const { token0UserBalance, isTokenUserBalanceLoading,} = useSwapContext()
  const {onSwapTokens, onToken1AmountChange, onToken0AmountChange, ratio, swapTokens} = useSwapTokens()
  const {swapExactTokensForTokens} = useSwapExactTokensForTokens(swapTokens.IN.token, swapTokens.OUT.token)


  const onSwapClicked = () => {
    swapExactTokensForTokens(swapTokens.IN.amount)
  }

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
          label="Amount"
          onChange={(e) => onToken0AmountChange(e.target.value)}
          value={swapTokens.IN.amount}
        />
        <p
          className="text-purple-700 absolute top-auto left-auto right-4 bottom-2 cursor-pointer hover:text-purple-500"
          onClick={() => onToken0AmountChange(token0UserBalance?.toString() || "0.0")}
        >
          Max
        </p>
      </div>
      <div className="flex w-full justify-center ml-auto gap-4 items-center relative">
        <ArrowsUpDownIcon
          className="h-10 w-10 text-gray-400 hover:text-gray-50 cursor-pointer relative"
          onClick={onSwapTokens}
        />
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex justify-between">
          <div className="text-xl font-title flex items-center gap-4">
            {swapTokens.OUT.token}
          </div>
          <div
            className={cx("flex gap-2 mr-3 items-baseline font serif text-sm text-gray-400", {"invisible": ratio === null})}>
            <p>Ratio: 1 {swapTokens.OUT.token} =</p>
            <p>{ratio || 0} {swapTokens.IN.token}</p>
          </div>
        </div>
        <NumericInput
          label="Amount"
          onChange={(e) => onToken1AmountChange(e.target.value)}
          value={swapTokens.OUT.amount}
        />
      </div>
      <Button onClick={onSwapClicked}>Swap</Button>
    </div>
  );
};

export default SwapForm;
