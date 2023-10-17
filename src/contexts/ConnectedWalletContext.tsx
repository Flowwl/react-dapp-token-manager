import { FC, ReactNode } from "react";
import { createCtx } from "../utils";
import { HexString } from "../types";

interface Props {
  children: ReactNode;
  address: HexString;
  className?: string
}

const ConnectedWalletContextProvider: FC<Props> = ({ className, children, address }) => {
  return (
    <ConnectedWalletContextBaseProvider value={{
      account: address,
    }}>
      <div className={className}>{children}</div>
    </ConnectedWalletContextBaseProvider>
  );
};

export default ConnectedWalletContextProvider;

export interface ConnectedWalletContext {
  account: HexString;
}

export const [useConnectedWalletContext, ConnectedWalletContextBaseProvider] = createCtx<ConnectedWalletContext>();
