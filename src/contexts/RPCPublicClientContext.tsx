import { FC, ReactNode } from "react";
import { createCtx } from "../utils";
import { ENV_CONFIG } from "../config";
import { PublicClientActions, WalletClientActions } from "../interfaces";
import { useFetch } from "../hooks";

interface Props {
  children: ReactNode;
}


const RpcPublicClientProvider: FC<Props> = ({ children }) => {
  const publicClientActions = new PublicClientActions(ENV_CONFIG.ADDRESS_TOKEN);
  const walletClientActions = new WalletClientActions();

  const { data, isLoading } = useFetch(publicClientActions.getBalance())
  if (isLoading) { return(<div>Loading...</div>)}
  console.log(data)
  return (
    <RpcPublicClientBaseProvider value={{
      publicClientActions,
      walletClientActions
    }}>
      <div className="h-full">{children}</div>
    </RpcPublicClientBaseProvider>
  );
};

export default RpcPublicClientProvider;

export interface RpcPublicClient {
  publicClientActions: PublicClientActions,
  walletClientActions: WalletClientActions
}

export const [useRpcPublicClient, RpcPublicClientBaseProvider] = createCtx<RpcPublicClient>();
