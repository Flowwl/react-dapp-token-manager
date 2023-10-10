import { FC, ReactNode, useState } from "react";
import { createCtx, getChainTransport } from "../utils";
import { PublicClientActions, WalletClientActions } from "../interfaces";
import { LOCAL_STORAGE_KEYS } from "../constants";
import { HexString } from "../types";
import { parseEther } from "viem";

interface Props {
  children: ReactNode;
}

const RpcPublicClientProvider: FC<Props> = ({ children }) => {
  const publicClientActions = new PublicClientActions();
  const walletClientActions = new WalletClientActions();

  const [address, setAddress] = useState<HexString | null>((localStorage.getItem(LOCAL_STORAGE_KEYS.WALLET_ADDRESS) as HexString) || null);

  async function connect() {
    try {
      const [address] = await walletClientActions.requestAddresses();
      localStorage.setItem(LOCAL_STORAGE_KEYS.WALLET_ADDRESS, address);
      setAddress(address);
    } catch (error) {
      alert(`Transaction failed: ${error}`);
    }
  }

  async function sendTransaction(to: HexString, value: string) {
    try {
      if (address === null) {
        alert("Please connect your wallet first");
        return;
      }
      const hash = await walletClientActions.sendTransaction({
        account: address,
        to: to,
        value: parseEther(value), // send 0.001 matic
        chain: getChainTransport().chain,
      });
      alert(`Transaction successful. Transaction Hash: ${hash}`);
    } catch (error) {
      alert(`Transaction failed: ${error}`);
    }
  }

  return (
    <RpcPublicClientBaseProvider value={{
      publicClientActions,
      walletClientActions,
      connect,
      address,
      sendTransaction
    }}>
      <div className="h-full">{children}</div>
    </RpcPublicClientBaseProvider>
  );
};

export default RpcPublicClientProvider;

export interface RpcPublicClient {
  publicClientActions: PublicClientActions,
  walletClientActions: WalletClientActions,
  connect: () => Promise<void>,
  sendTransaction: (to: HexString, value: string) => Promise<void>,
  address: HexString | null,
}

export const [useRpcPublicClient, RpcPublicClientBaseProvider] = createCtx<RpcPublicClient>();
