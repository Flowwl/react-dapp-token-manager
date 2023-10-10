import { FC, ReactNode } from "react";
import { createCtx, getChainTransport } from "../utils";
import cx from "classnames";
import { HexString } from "../types";
import { parseEther } from "viem";
import { publicClientActions, walletClientActions } from "../interfaces";
import { getAbi } from "../utils/abi.ts";

interface Props {
  children: ReactNode;
  address: HexString;
}

const ConnectedWalletContextProvider: FC<Props> = ({ children, address }) => {
  async function sendTransaction(to: HexString, value: string) {
    try {
      const hash = await walletClientActions.sendTransaction({
        account: address,
        to: to,
        value: parseEther(value),
        chain: getChainTransport().chain,
      });
      alert(`Transaction successful. Transaction Hash: ${hash}`);
    } catch (error) {
      alert(`Transaction failed: ${error}`);
    }
  }

  async function getTotalSupply() {
    return publicClientActions.readContract<bigint>({
      address,
      abi: getAbi(),
      functionName: 'totalSupply',
    })
  }
  return (
    <ConnectedWalletContextBaseProvider value={{
      sendTransaction,
      getTotalSupply
    }}>
      <div className={cx("h-full")}>{children}</div>
    </ConnectedWalletContextBaseProvider>
  );
};

export default ConnectedWalletContextProvider;

export interface ConnectedWalletContext {
  sendTransaction: (to: HexString, value: string) => Promise<void>;
  getTotalSupply: () => Promise<bigint>;
}

export const [useConnectedWalletContext, ConnectedWalletContextBaseProvider] = createCtx<ConnectedWalletContext>();
