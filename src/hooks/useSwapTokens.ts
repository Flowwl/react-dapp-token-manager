import { useSwapContext } from "../contexts/SwapContext.tsx";
import { useEffect, useState } from "react";
import { computeBigIntToFloat, computeFloatToBigInt, swapExactTokenForToken, swapTokenForExactToken } from "../utils";

export const useSwapTokens = () => {
  const {swapTokens, changeSwapTokens, changeTokenMode, tokenMode} = useSwapContext();

  const [ratio, setRatio] = useState<null | number>(null)
  const maxDecimal = Math.max(Number(swapTokens.IN.decimals), Number(swapTokens.OUT.decimals))
  // const { getAmountIn } = useGetAmountIn({
  //   onSuccess(amountIn) {
  //     console.log("amountIn from router", amountIn, computeBigIntToFloat(amountIn, swapTokens.IN.decimals).toFixed(maxDecimal))
  //   }
  // })
  // const { getAmountOut } = useGetAmountOut({
  //   onSuccess(amountOut) {
  //     console.log("amountOut from router", amountOut, computeBigIntToFloat(amountOut, swapTokens.OUT.decimals).toFixed(maxDecimal))
  //   }
  // })
  const onSwapTokens = () => {
    changeSwapTokens({IN: swapTokens.OUT, OUT: swapTokens.IN})
  };

  const onToken0AmountChange = (value: string) => {
    changeTokenMode("IN");
    computeTokenOutAmount(value);
  }

  const onToken1AmountChange = (value: string) => {
    changeTokenMode("OUT");
    computeTokenInAmount(value);
  }

  const computeTokenOutAmount = (valueIn: string) => {
    const amountIn = computeFloatToBigInt(parseFloat(valueIn || "0"), swapTokens.IN.decimals)
    const amountOut = swapExactTokenForToken(amountIn, swapTokens.IN.reserve, swapTokens.OUT.reserve)
    const computedAmountOut = computeBigIntToFloat(amountOut, swapTokens.OUT.decimals).toFixed(maxDecimal)

    changeSwapTokens({IN: {...swapTokens.IN, amount: valueIn}, OUT: {...swapTokens.OUT, amount: computedAmountOut}});
    // getAmountOut({amountIn, reserveIn: swapTokens.IN.reserve, reserveOut: swapTokens.OUT.reserve})
  }

  const computeTokenInAmount = (valueOut: string) => {
    const amountOut = computeFloatToBigInt(parseFloat(valueOut || "0"), swapTokens.OUT.decimals)
    const amountIn = swapTokenForExactToken(amountOut, swapTokens.IN.reserve, swapTokens.OUT.reserve)
    const computedAmountIn = computeBigIntToFloat(amountIn, swapTokens.IN.decimals).toFixed(maxDecimal)

    changeSwapTokens({OUT: {...swapTokens.OUT, amount: valueOut}, IN: {...swapTokens.IN, amount: computedAmountIn}});
    // getAmountIn({amountOut, reserveIn: swapTokens.IN.reserve, reserveOut: swapTokens.OUT.reserve})
  }

  useEffect(() => {
    const floatAmountIn = parseFloat(swapTokens.IN.amount)
    const floatAmountOut = parseFloat(swapTokens.OUT.amount)
    if (floatAmountIn === 0 || floatAmountOut === 0) {
      setRatio(null)
    }
    else {
      setRatio((floatAmountIn / floatAmountOut) || null)
    }
  }, [swapTokens.OUT.amount, swapTokens.IN.amount])

  useEffect(() => {
    if (tokenMode === "IN") {
      computeTokenInAmount(swapTokens.OUT.amount)
      changeTokenMode("OUT")
    }
    if (tokenMode === "OUT") {
      computeTokenOutAmount(swapTokens.IN.amount)
      changeTokenMode("IN")
    }
  }, [swapTokens.IN.token, swapTokens.OUT.token])
  return {
    onToken0AmountChange,
    onToken1AmountChange,
    onSwapTokens,
    swapTokens,
    ratio
  }

}
