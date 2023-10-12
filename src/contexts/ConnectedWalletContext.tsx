import { FC, ReactNode } from "react";
import { createCtx } from "../utils";
import cx from "classnames";
import { HexString } from "../types";

interface Props {
  children: ReactNode;
  address: HexString;
}

const ConnectedWalletContextProvider: FC<Props> = ({ children, address }) => {
  return (
    <ConnectedWalletContextBaseProvider value={{
      account: address,
    }}>
      <div className={cx("h-full")}>{children}</div>
    </ConnectedWalletContextBaseProvider>
  );
};

export default ConnectedWalletContextProvider;

export interface ConnectedWalletContext {
  account: HexString;
}

export const [useConnectedWalletContext, ConnectedWalletContextBaseProvider] = createCtx<ConnectedWalletContext>();
