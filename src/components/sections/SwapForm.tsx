import { FC, useState } from 'react';
import cx from "classnames"
import NumericInput from "../atoms/NumericInput.tsx";
import { ArrowsUpDownIcon } from "@heroicons/react/20/solid";
import Button from "../atoms/Button.tsx";
import { useSwapExactTokensForTokens } from "../../hooks/useSwapExactTokensForTokens.ts";
import { useSwapContext } from "../../contexts/SwapContext.tsx";

interface SwapFormProps {
  className?: string
}

// - NE PAS UTILISER LES FONCTIONS getAmountIn / getAmountOut / getAmountsIn / getAmountsOut du router, faire le calcul en js, car sinon cela consomme des requete rpc a chaque chiffre entré par l'utilisateur et cela ralenti enormement l'app (ceci dit, ces fonctions peuvent etre utilise lors du dev, pour verifier les valeurs)
// - verifier que le amountOut est plus petit que la reserve correspondante dans le cas de swapTokenForExactToken
// - verifier que le amountIn est plus petit ou egal a la balance de l'utilisateur
// - mettre un bouton "max" sur le token a vendre
const SwapForm: FC<SwapFormProps> = ({className}) => {
  const {
    token0,
    token1,
    token0UserBalance,
    isTokenUserBalanceLoading,
    areTokenPricesLoading,
    ratio0,
    ratio1,
    changeToken1,
    changeToken0
  } = useSwapContext()

  const {swapExactTokensForTokens} = useSwapExactTokensForTokens(token0, token1)
  const [token0Amount, setToken0Amount] = useState<string>("0.0")
  const [token1Amount, setToken1Amount] = useState<string>("0.0")
  const onSwap = () => {
    changeToken0(token0 === "WBTC" ? "BUSD" : "WBTC");
    changeToken1(token1 === "WBTC" ? "BUSD" : "WBTC");
    const token0AmountMem = token0Amount;
    const token1AmountMem = token1Amount;
    setToken0Amount(token1AmountMem)
    setToken1Amount(token0AmountMem)
  };

  const onToken1AmountChange = (value: string) => {
    setToken0Amount(value);
    const newValue = (parseFloat(value || "0") * parseFloat(ratio0)).toFixed(10)
    setToken1Amount(newValue);
  }

  const onToken2AmountChange = (value: string) => {
    setToken1Amount(value);
    const newValue = (parseFloat(value || "0") * parseFloat(ratio1)).toFixed(10)
    setToken0Amount(newValue);
  }

  const onSwapClicked = () => {
    swapExactTokensForTokens(token0Amount)
  }

  return (
    <div className={cx("flex flex-col gap-4 mt-4 overflow-y-auto", className)}>
      <div className="flex flex-col gap-1 relative">
        <div className="flex justify-between">
          <div className="text-xl font-title flex items-center gap-4">
            {token0}
          </div>
          <div className="flex gap-2 mr-3 items-baseline font serif text-sm text-gray-400">
            <p>Balance:</p>
            {isTokenUserBalanceLoading && "-"}
            {!isTokenUserBalanceLoading && token0UserBalance && (<p>{token0UserBalance}</p>)}
          </div>
        </div>
        <NumericInput
          label="Amount"
          onChange={(e) => onToken1AmountChange(e.target.value)}
          value={token0Amount}
        />
        <p
          className="text-purple-700 absolute top-auto left-auto right-4 bottom-8 cursor-pointer hover:text-purple-500"
          onClick={() => onToken1AmountChange(token0UserBalance?.toString() || "0.0")}
        >
          Max
        </p>
        <div className="flex text-gray-400 font serif text-sm justify-between">
          <div className="flex gap-2 ml-3 items-baseline">
            <p>Ratio: 1 {token0} =</p>
            {areTokenPricesLoading && "-"}
            {!areTokenPricesLoading && (<p>{ratio0} {token1}</p>)}
          </div>

        </div>
      </div>
      <div className="flex w-full justify-center ml-auto gap-4 items-center relative">
        <ArrowsUpDownIcon
          className="h-10 w-10 text-gray-400 hover:text-gray-50 cursor-pointer relative"
          onClick={onSwap}
        />
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-xl font-title">{token1}</p>
        <NumericInput
          label="Amount"
          onChange={(e) => onToken2AmountChange(e.target.value)}
          value={token1Amount}
        />
      </div>
      <Button onClick={onSwapClicked}>Swap</Button>
    </div>
  );
};

export default SwapForm;
