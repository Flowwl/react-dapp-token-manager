import { FC, ReactNode, useEffect, useState } from "react";
import { createCtx } from "../utils";
import cx from "classnames"
import { useGetTokenPrice } from "../hooks/useGetTokenPrice.ts";
import { useGetUserBalanceByToken } from "../hooks";
import { useConnectedWalletContext } from "./ConnectedWalletContext.tsx";

interface Props {
  children: ReactNode;
  className?: string
}

const SwapContextProvider: FC<Props> = ({ children, className }) => {
  const [token0, setToken0] = useState<"BUSD" | "WBTC">("WBTC");
  const [token1, setToken1] = useState<"BUSD" | "WBTC">("BUSD");

  const {account} = useConnectedWalletContext();
  const {data: token0UserBalance, isLoading: isTokenUserBalanceLoading, refetch: refetchTokenUserBalance} = useGetUserBalanceByToken(token0, {deps: [account]});

  const {data: tokenPrices, isLoading: areTokenPricesLoading, getTokenPrice} = useGetTokenPrice();
  const ratio0 = (tokenPrices ? tokenPrices[token0] / tokenPrices[token1] : 0).toFixed(10);
  const ratio1 = (tokenPrices ? tokenPrices[token1] / tokenPrices[token0] : 0).toFixed(10);

  const changeToken0 = (value: "BUSD" | "WBTC") => {
    setToken0(value);
  }

  const changeToken1 = (value: "BUSD" | "WBTC") => {
    setToken1(value);
  }
  useEffect(() => {
    getTokenPrice()
  }, []);

  useEffect(() => {
    refetchTokenUserBalance();
  }, [token0]);

  return (
    <SwapContextBaseProvider value={{
      token0,
      token1,
      changeToken0,
      changeToken1,
      ratio0,
      ratio1,
      areTokenPricesLoading,
      token0UserBalance,
      isTokenUserBalanceLoading
    }}>
      <div className={cx(className)}>{children}</div>
    </SwapContextBaseProvider>
  );
};

export default SwapContextProvider;

export interface SwapContext {
  token0: "BUSD" | "WBTC";
  token1: "BUSD" | "WBTC";
  changeToken0: (value: "BUSD" | "WBTC") => void;
  changeToken1: (value: "BUSD" | "WBTC") => void;
  ratio0: string;
  ratio1: string;
  isTokenUserBalanceLoading: boolean;
  token0UserBalance: number | null;
  areTokenPricesLoading: boolean;
}

export const [useSwapContext, SwapContextBaseProvider] = createCtx<SwapContext>();
