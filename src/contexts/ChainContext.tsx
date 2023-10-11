import { FC, ReactNode } from "react";
import { createCtx } from "../utils";
import { Chain, polygonMumbai } from "viem/chains";
import { PublicClientActions, WalletClientActions } from "../interfaces";
import { TokenName, TOKENS } from "../constants/tokens.ts";
import { useFetch } from "../hooks";

interface Props {
  children: ReactNode;
}

const ChainContextProvider: FC<Props> = ({ children }) => {
  const selectedToken = "MATIC";
  const selectedChain = polygonMumbai;

  const publicClientActions = new PublicClientActions(selectedChain);
  const walletClientActions = new WalletClientActions(selectedChain);
  const getTokenDecimals = () => publicClientActions.readContract<bigint>({
    address: TOKENS[selectedToken].address,
    abi: TOKENS[selectedToken].abi,
    functionName: 'decimals',
  });

  const { data: tokenDecimals } = useFetch(getTokenDecimals())

  return (
    <ChainContextBaseProvider value={{
      publicClientActions,
      walletClientActions,
      selectedChain,
      selectedToken,
      tokenDecimals: tokenDecimals || 0n
    }}>
      {children}
    </ChainContextBaseProvider>
  );
};

export default ChainContextProvider;

export interface ChainContext {
  publicClientActions: PublicClientActions;
  walletClientActions: WalletClientActions;
  selectedToken: TokenName;
  selectedChain: Chain;
  tokenDecimals: bigint;
}

export const [useChainContext, ChainContextBaseProvider] = createCtx<ChainContext>();
