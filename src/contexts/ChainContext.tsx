import { FC, ReactNode, useEffect } from "react";
import { createCtx } from "../utils";
import { Chain } from "viem/chains";
import { PublicClientActions, WalletClientActions } from "../interfaces";
import { TokenName, TOKENS } from "../constants/tokens.ts";
import { useFetch } from "../hooks";
import Spinner from "../components/atoms/Spinner.tsx";
interface Props {
  children: ReactNode;
}

const ChainContextProvider: FC<Props> = ({ children }) => {
  const selectedToken = "MATIC";
  const selectedChain = TOKENS[selectedToken].chain;
  // @ts-expect-error typescript doesn't know about ethereum networkVersion
  const networkVersion = parseInt(window.ethereum?.networkVersion || "0")

  const publicClientActions = new PublicClientActions(selectedChain);
  const walletClientActions = new WalletClientActions(selectedChain);

  useEffect(() => {
    if (networkVersion !== selectedChain.id) {
      alert("Please change your network before proceeding.")
    }
  }, [networkVersion, selectedChain]);

  window.ethereum?.on('chainChanged', (chainId) => {
    if (chainId !== `0x${selectedChain.id.toString(16)}`) {
      console.log("Hey change your network to the correct one!");
      window.location.reload();
    }
  });
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
