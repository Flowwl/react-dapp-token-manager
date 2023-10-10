import { FC, ReactNode, useState } from "react";
import { createCtx } from "../utils";
import { PublicClientActions, WalletClientActions } from "../interfaces";

interface Props {
  children: ReactNode;
}

const RpcPublicClientProvider: FC<Props> = ({ children }) => {
  const publicClientActions = new PublicClientActions();
  const walletClientActions = new WalletClientActions();

  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<bigint>(BigInt(0));

  async function connect() {
    try {
      const [address] = await walletClientActions.requestAddresses();
      const balance = await publicClientActions.getBalance(address);
      setAddress(address);
      setBalance(balance);
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
      balance
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
  address: string | null,
  balance: bigint
}

export const [useRpcPublicClient, RpcPublicClientBaseProvider] = createCtx<RpcPublicClient>();
