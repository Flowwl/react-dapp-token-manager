import { FC, ReactNode } from "react";
import { createCtx, getChainTransport } from "../utils";
import cx from "classnames";
import { HexString } from "../types";
import { parseEther } from "viem";
import { walletClientActions } from "../interfaces";

interface Props {
  children: ReactNode;
  address: HexString;
}

const ConnectedWalletContextProvider: FC<Props> = ({ children, address }) => {
  async function sendTransaction(to: HexString, value: string) {
    try {
      await walletClientActions.sendTransaction({
        account: address,
        to: to,
        value: parseEther(value),
        chain: getChainTransport().chain,
      });
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <ConnectedWalletContextBaseProvider value={{
      sendTransaction,
    }}>
      <div className={cx("h-full")}>{children}</div>
    </ConnectedWalletContextBaseProvider>
  );
};

export default ConnectedWalletContextProvider;

export interface ConnectedWalletContext {
  sendTransaction: (to: HexString, value: string) => Promise<void>;
}

export const [useConnectedWalletContext, ConnectedWalletContextBaseProvider] = createCtx<ConnectedWalletContext>();
