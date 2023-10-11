import { FC, ReactNode } from "react";
import { createCtx } from "../utils";
import cx from "classnames";
import { HexString } from "../types";
import { parseEther } from "viem";
import { useChainContext } from "./ChainContext.tsx";

interface Props {
  children: ReactNode;
  address: HexString;
}

const ConnectedWalletContextProvider: FC<Props> = ({ children, address }) => {
  const { walletClientActions, selectedChain } = useChainContext()
  async function sendTransaction(to: HexString, value: string) {
    try {
      await walletClientActions.sendTransaction({
        account: address,
        to: to,
        value: parseEther(value),
        chain: selectedChain,
      });
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <ConnectedWalletContextBaseProvider value={{
      sendTransaction,
      address
    }}>
      <div className={cx("h-full")}>{children}</div>
    </ConnectedWalletContextBaseProvider>
  );
};

export default ConnectedWalletContextProvider;

export interface ConnectedWalletContext {
  sendTransaction: (to: HexString, value: string) => Promise<void>;
  address: HexString;
}

export const [useConnectedWalletContext, ConnectedWalletContextBaseProvider] = createCtx<ConnectedWalletContext>();
