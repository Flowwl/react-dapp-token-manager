import { FC, ReactNode, useEffect } from "react";
import { createCtx } from "../utils";
import { Chain } from "viem/chains";
import { PublicClientActions, WalletClientActions } from "../interfaces";
import { TokenName, TOKENS } from "../constants/tokens.ts";
import { useSwitchToChain } from "../hooks/useSwitchToChain.ts";
import ChainInfoContextProvider from "./ChainInfoContext.tsx";

interface Props {
  children: ReactNode;
}

const ChainContextProvider: FC<Props> = ({ children }) => {
  const selectedToken = "MATIC";
  const selectedChain = TOKENS[selectedToken].chain;
  // @ts-expect-error typescript doesn't know about ethereum networkVersion
  const networkVersion = parseInt(window.ethereum?.networkVersion || "0");

  const publicClientActions = new PublicClientActions(selectedChain);
  const walletClientActions = new WalletClientActions(selectedChain);

  const { switchToChain } = useSwitchToChain(selectedToken);

  const switchChainHandle = () => {
    const hasConfirmed = confirm("Please change your network before proceeding. Do you want to switch automatically ? ");

    if (hasConfirmed) {
      switchToChain();
    }
    else {
      window.location.reload();
    }
  };

  window.ethereum?.on('chainChanged', (chainId) => {
    if (chainId !== `0x${selectedChain.id.toString(16)}`) {
      window.location.reload();
    }
  });

  useEffect(() => {
    if (networkVersion !== selectedChain.id) {
      switchChainHandle();
    }
  }, []);


  return (
    <ChainContextBaseProvider value={{
      publicClientActions,
      walletClientActions,
      selectedChain,
      selectedToken,

    }}>
      <ChainInfoContextProvider>
        {children}
      </ChainInfoContextProvider>
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
