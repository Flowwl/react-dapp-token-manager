import { FC, ReactNode, useEffect, useState } from "react";
import { createCtx } from "../utils";
import { Chain } from "viem/chains";
import { PublicClientActions, WalletClientActions } from "../interfaces";
import { TokenName, TOKENS } from "../constants/tokens.ts";
import { useSwitchToChain } from "../hooks/useSwitchToChain.ts";

interface Props {
  children: ReactNode;
}

const ChainContextProvider: FC<Props> = ({ children }) => {
  const [selectedToken, setSelectedToken] = useState<TokenName>("BUSD")
  const selectedChain = TOKENS[selectedToken].chain;
  // @ts-expect-error typescript doesn't know about ethereum networkVersion
  const networkVersion = parseInt(window.ethereum?.networkVersion || "0");

  const publicClientActions = new PublicClientActions(selectedChain);
  const walletClientActions = new WalletClientActions(selectedChain);

  const { switchToChain } = useSwitchToChain(selectedToken);
  const changeTokenTo = (token: TokenName) => {
    if (token === selectedToken) return;
    setSelectedToken(token)
  }

  const switchChainHandle = () => {
    const hasConfirmed = confirm("Please change your network before proceeding. Do you want to switch automatically ? ");

    if (hasConfirmed) {
      switchToChain();
    } else {
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
      changeTokenTo,
      tokenDecimals: BigInt(TOKENS[selectedToken].chain.nativeCurrency.decimals),
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
  changeTokenTo: (token: TokenName) => void;
}

export const [useChainContext, ChainContextBaseProvider] = createCtx<ChainContext>();
