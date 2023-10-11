import { FC, ReactNode } from "react";
import { createCtx } from "../utils";
import { Chain, polygonMumbai } from "viem/chains";
import { PublicClientActions, WalletClientActions } from "../interfaces";
import { TokenName } from "../constants/tokens.ts";

interface Props {
  children: ReactNode;
}

const ChainContextProvider: FC<Props> = ({ children }) => {
  const selectedToken = "MATIC";
  const selectedChain = polygonMumbai;

  const publicClientActions = new PublicClientActions(selectedChain);
  const walletClientActions = new WalletClientActions(selectedChain);


  return (
    <ChainContextBaseProvider value={{
      publicClientActions,
      walletClientActions,
      selectedChain,
      selectedToken
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
}

export const [useChainContext, ChainContextBaseProvider] = createCtx<ChainContext>();
