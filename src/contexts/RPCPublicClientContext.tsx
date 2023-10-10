import { FC, ReactNode, useState } from "react";
import { createCtx } from "../utils";
import { PublicClientActions, WalletClientActions } from "../interfaces";
import { LOCAL_STORAGE_KEYS } from "../constants";
import { HexString } from "../types";

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

  return (
    <RpcPublicClientBaseProvider value={{
      publicClientActions,
      walletClientActions,
      connect,
      address
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
  address: HexString | null,
}

export const [useRpcPublicClient, RpcPublicClientBaseProvider] = createCtx<RpcPublicClient>();
