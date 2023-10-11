import { FC, ReactNode, useState } from "react";
import { createCtx } from "../utils";
import { walletClientActions } from "../interfaces";
import { LOCAL_STORAGE_KEYS } from "../constants";
import { HexString } from "../types";
import { RequestAddressesReturnType } from "viem";

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
      console.log(error)
    }
  }

  async function getAddresses() {
    try {
      const addresses = await walletClientActions.requestAddresses();
      return addresses;
    } catch (error) {
      console.log(error)
    }
  }

  async function selectAddress(address: HexString) {
    localStorage.setItem(LOCAL_STORAGE_KEYS.WALLET_ADDRESS, address);
    setAddress(address);
  }

  return (
    <WalletAuthContextBaseProvider value={{
      connect,
      address,
      selectAddress,
      getAddresses
    }}>
      {children}
    </WalletAuthContextBaseProvider>
  );
};

export default WalletAuthContextProvider;

export interface WalletAuthContext {
  connect: () => Promise<void>;
  getAddresses: () => Promise<RequestAddressesReturnType | undefined>;
  selectAddress: (address: HexString) => void;
  address: HexString | null;
}

export const [useWalletAuthContext, WalletAuthContextBaseProvider] = createCtx<WalletAuthContext>();
