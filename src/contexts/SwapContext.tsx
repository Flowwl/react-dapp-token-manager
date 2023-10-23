import { FC, ReactNode, useEffect, useState } from "react";
import { createCtx } from "../utils";
import cx from "classnames"
import { useGetUserBalanceByToken } from "../hooks";
import { useConnectedWalletContext } from "./ConnectedWalletContext.tsx";
import { useGetReserves } from "../hooks/useGetReserves.ts";
import { useGetDecimals } from "../hooks/useGetDecimals.ts";

interface Props {
  children: ReactNode;
  className?: string
}

type SwapInterface = {
  IN: {
    token: "BUSD" | "WBTC";
    amount: string;
    reserve: bigint;
    decimals: bigint;
  },
  OUT: {
    token: "BUSD" | "WBTC";
    amount: string;
    reserve: bigint;
    decimals: bigint;
  }
}
const SwapContextProvider: FC<Props> = ({children, className}) => {
    const token0 = "BUSD"
    const token1 = "WBTC"
    const [swapTokens, setSwapTokens] = useState<SwapInterface>({
      IN: {token: token0, amount: "0.0", reserve: 0n, decimals: 0n},
      OUT: {token: token1, amount: "0.0", reserve: 0n, decimals: 0n}
    })
    const [tokenMode, setTokenMode] = useState<"IN" | "OUT">("IN")

    const {account} = useConnectedWalletContext();
    const {
      data: token0UserBalance,
      isLoading: isTokenUserBalanceLoading,
      refetch: refetchTokenUserBalance
    } = useGetUserBalanceByToken(swapTokens.IN.token, {deps: [account]});

    const {getReserves} = useGetReserves({
      onSuccess: (data) => {
        setSwapTokens(prevState => ({
          IN: {...prevState.IN, reserve: data[prevState.IN.token]},
          OUT: {...prevState.OUT, reserve: data[prevState.OUT.token]}
        }))
      }
    });

    useGetDecimals(token0, {
      onSuccess: (data) => {
        if (swapTokens.IN.token === token0) setSwapTokens(prevState => ({
          ...prevState,
          IN: {...prevState.IN, decimals: data}
        }))
        else setSwapTokens(prevState => ({...prevState, OUT: {...prevState.OUT, decimals: data}}))
      }
    });

    useGetDecimals(token1, {
      onSuccess: (data) => {
        if (swapTokens.IN.token === token1) setSwapTokens(prevState => ({
          ...prevState,
          IN: {...prevState.IN, decimals: data}
        }))
        else setSwapTokens(prevState => ({...prevState, OUT: {...prevState.OUT, decimals: data}}))
      }
    });


    const changeSwapTokens = (value: Partial<SwapInterface>) => {
      setSwapTokens(prevState => ({...prevState, ...value}));
    }
    const changeTokenMode = (value: "IN" | "OUT") => {
      setTokenMode(value);
    }

    useEffect(() => {
      getReserves()
    }, []);

    useEffect(() => {
      refetchTokenUserBalance();
    }, [swapTokens.IN.token]);

    return (
      <SwapContextBaseProvider value={{
        swapTokens,
        tokenMode,
        changeTokenMode,
        changeSwapTokens,
        token0UserBalance,
        refetchTokenUserBalance,
        isTokenUserBalanceLoading
      }}>
        <div className={cx(className)}>{children}</div>
      </SwapContextBaseProvider>
    );
  }
;

export default SwapContextProvider;

export interface SwapContext {
  swapTokens: SwapInterface;
  changeSwapTokens: (value: Partial<SwapInterface>) => void;
  tokenMode: "IN" | "OUT";
  refetchTokenUserBalance: () => void;
  changeTokenMode: (value: "IN" | "OUT") => void;
  isTokenUserBalanceLoading: boolean;
  token0UserBalance: number | null;
}

export const [useSwapContext, SwapContextBaseProvider] = createCtx<SwapContext>();
