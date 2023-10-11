import { FC, ReactNode } from "react";
import { createCtx } from "../utils";
import cx from "classnames"
import { TOKENS } from "../constants/tokens.ts";
import { useFetch } from "../hooks";
import { useChainContext } from "./ChainContext.tsx";
import Spinner from "../components/atoms/Spinner.tsx";

interface Props {
  children: ReactNode;
}

const ChainInfoContextProvider: FC<Props> = ({ children }) => {
  const { selectedToken, publicClientActions} = useChainContext()
  const promise = async () => {
    return publicClientActions.readContract<bigint>({
      address: TOKENS[selectedToken].address,
      abi: TOKENS[selectedToken].abi,
      functionName: 'decimals'
    });
  };

  const { data: tokenDecimals, isLoading } = useFetch(async () => promise());

  if (tokenDecimals === null && isLoading) {
    return <Spinner/>;
  }
  return (
    <ChainInfoContextBaseProvider value={{
      tokenDecimals: tokenDecimals || 0n
    }}>
      <div className={cx("h-full")}>{children}</div>
    </ChainInfoContextBaseProvider>
  );
};

export default ChainInfoContextProvider;

export interface ChainInfoContext {
  tokenDecimals: bigint;
}

export const [useChainInfoContext, ChainInfoContextBaseProvider] = createCtx<ChainInfoContext>();
