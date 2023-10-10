import { FC, ReactNode, useState } from "react";
import { createCtx } from "../utils";
import { walletClientActions } from "../interfaces";
import { LOCAL_STORAGE_KEYS } from "../constants";
import { HexString } from "../types";

interface Props {
  children: ReactNode;
}

const WalletAuthContextProvider: FC<Props> = ({ children }) => {
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
    <WalletAuthContextBaseProvider value={{
      connect,
      address,
    }}>
      {children}
    </WalletAuthContextBaseProvider>
  );
};

export default WalletAuthContextProvider;

export interface WalletAuthContext {
  connect: () => Promise<void>,
  address: HexString | null,
}

export const [useWalletAuthContext, WalletAuthContextBaseProvider] = createCtx<WalletAuthContext>();
