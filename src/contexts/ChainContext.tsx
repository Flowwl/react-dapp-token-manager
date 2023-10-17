import { FC, ReactNode, useState } from "react";
import { createCtx, getPublicChainTransport, getWalletChainTransport, getWebsocketChainTransport } from "../utils";
import { Chain } from "viem/chains";
import { TokenName, TOKENS } from "../constants/tokens.ts";
import { useSwitchToChain } from "../hooks/useSwitchToChain.ts";
import { createPublicClient, createWalletClient, PublicClient, toHex, WalletClient } from "viem";
import { toast } from "react-toastify";
import { useGetUserChainId } from "../hooks/useGetUserChainId.ts";

interface Props {
  children: ReactNode;
}

const ChainContextProvider: FC<Props> = ({ children }) => {
  const [selectedToken, setSelectedToken] = useState<TokenName>("BUSD")
  const selectedChain = TOKENS[selectedToken].chain;

  const publicClientActions = createPublicClient(getPublicChainTransport(selectedChain));
  const walletClientActions = createWalletClient(getWalletChainTransport(selectedChain));
  const webSocketPublicClientActions = createPublicClient(getWebsocketChainTransport(selectedChain));

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
      toast.error("Please change your network before proceeding.", { autoClose: false, delay: 0, closeOnClick: false});
    }
  };

  window.ethereum?.on('chainChanged', (chainId) => {
    if (chainId !== toHex(selectedChain.id)) {
      window.location.reload();
    }
  });

  useGetUserChainId({
    isEnabled: true,
    onSuccess(chainId) {
      if (chainId !== toHex(selectedChain.id)) {
        switchChainHandle();
      }
    }
  })

  return (
    <ChainContextBaseProvider value={{
      publicClientActions,
      walletClientActions,
      webSocketPublicClientActions,
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
  publicClientActions: PublicClient;
  walletClientActions: WalletClient;
  webSocketPublicClientActions: PublicClient;
  selectedToken: TokenName;
  selectedChain: Chain;
  tokenDecimals: bigint;
  changeTokenTo: (token: TokenName) => void;
}

export const [useChainContext, ChainContextBaseProvider] = createCtx<ChainContext>();
