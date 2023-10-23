import { useSwapContext } from "../contexts/SwapContext.tsx";
import { useState } from "react";
import { computeBigIntToFloat, computeFloatToBigInt, swapExactTokenForToken, swapTokenForExactToken } from "../utils";

export const useSwapTokens = () => {
  const {
    swapTokens,
    changeSwapTokens
  } = useSwapContext();

  console.log(swapTokens)
  // const [swapTokens, setSwapTokens] = useState({
  //   IN: {
  //     token: token0,
  //     amount: "0.0",
  //     reserve: reserves[token0],
  //     decimals: decimals[token0]
  //   },
  //   OUT: {
  //     token: token1,
  //     amount: "0.0",
  //     reserve: reserves[token1],
  //     decimals: decimals[token1]
  //   }
  // })
  //
  // const [token0Amount, setToken0Amount] = useState<string>("0.0")
  // const [token1Amount, setToken1Amount] = useState<string>("0.0")
  const [ratio, setRatio] = useState<null | number>(null)
  const maxDecimal = Math.max(Number(swapTokens.IN.decimals), Number(swapTokens.OUT.decimals))
  const onSwapTokens = () => {
    const { IN, OUT } = swapTokens
    changeSwapTokens({ IN: { ...OUT }, OUT: { ...IN }})
    // changeToken0(token0 === "WBTC" ? "BUSD" : "WBTC");
    // changeToken1(token1 === "WBTC" ? "BUSD" : "WBTC");
    // const token0AmountMem = token0Amount;
    // const token1AmountMem = token1Amount;
    // setToken0Amount(token1AmountMem)
    // setToken1Amount(token0AmountMem)

    // const swappedAmount = swapTokenForExactToken(computeFloatToBigInt(parseFloat(token1AmountMem || "0") || 0, decimals[token1]), reserves[token0], reserves[token1])
    // const computedSwappedAmount = computeBigIntToFloat(Math.floor(Number(swappedAmount)), decimals[token0]).toFixed(maxDecimal)

    // console.log(swappedAmount)
    // setRatio(parseFloat(computedSwappedAmount) === 0 ? null : parseFloat(computedSwappedAmount) / parseFloat(token1AmountMem))

    // const swappedAmount = swapExactTokenForToken(computeFloatToBigInt(parseFloat(token1AmountMem || "0") || 0, decimals[token0]), reserves[token0], reserves[token1])
    // const computedSwappedAmount = computeBigIntToFloat(Math.floor(Number(swappedAmount)), decimals[token1]).toFixed(maxDecimal)
    // setRatio(parseFloat(computedSwappedAmount) === 0 ? null : parseFloat(token1AmountMem) / parseFloat(computedSwappedAmount))

  };

  // console.log(reserves, decimals)
  const onToken0AmountChange = (value: string) => {
    changeSwapTokens({ IN: { ...swapTokens.IN, amount: value }})

    const amountIn = computeFloatToBigInt(parseFloat(value || "0") || 0, swapTokens.IN.decimals)
    const amountOut = swapExactTokenForToken(amountIn, swapTokens.IN.reserve, swapTokens.OUT.reserve)

    setRatio(amountOut === 0n ? null : computeBigIntToFloat(amountIn / amountOut, swapTokens.IN.decimals))
    console.log(amountIn / amountOut, computeBigIntToFloat(amountOut, swapTokens.OUT.decimals)/ computeBigIntToFloat(amountIn, swapTokens.IN.decimals))

    const computedAmountOut = computeBigIntToFloat(amountOut, swapTokens.OUT.decimals).toFixed(maxDecimal)
    changeSwapTokens({...swapTokens, OUT: { ...swapTokens.OUT, amount: computedAmountOut }});
  }

  const onToken1AmountChange = (value: string) => {
    changeSwapTokens({ OUT: { ...swapTokens.OUT, amount: value }})
    const amountOut = computeFloatToBigInt(parseFloat(swapTokens.OUT.amount || "0") || 0, swapTokens.OUT.decimals)
    const swappedAmount = swapTokenForExactToken(amountOut, swapTokens.IN.reserve, swapTokens.OUT.reserve)
    const computedSwappedAmount = computeBigIntToFloat(Math.floor(Number(swappedAmount)), swapTokens.IN.decimals).toFixed(maxDecimal)

    console.log(swappedAmount)
    setRatio(parseFloat(computedSwappedAmount) === 0 ? null : parseFloat(computedSwappedAmount) / parseFloat(swapTokens.OUT.amount))
    changeSwapTokens({...swapTokens, IN: { ...swapTokens.IN, amount: computedSwappedAmount }});
  }

  return {
    onToken0AmountChange,
    onToken1AmountChange,
    onSwapTokens,
    swapTokens,
    ratio
  }

}
