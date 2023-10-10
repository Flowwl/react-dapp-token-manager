import { FC, ReactNode } from "react";
import { createCtx } from "../utils";
import { ENV_CONFIG } from "../config";
import { PublicClientActions } from "../interfaces";

interface Props {
  children: ReactNode;
}


const RpcPublicClientProvider: FC<Props> = ({ children }) => {
  const publicClientActions = new PublicClientActions(ENV_CONFIG.ADDRESS_TOKEN);

  console.log(publicClientActions.getBalance())
  return (
    <RpcPublicClientBaseProvider value={{}}>
      <div className="h-full">{children}</div>
    </RpcPublicClientBaseProvider>
  );
};

export default RpcPublicClientProvider;

export interface RpcPublicClient {}

export const [useRpcPublicClient, RpcPublicClientBaseProvider] = createCtx<RpcPublicClient>();
