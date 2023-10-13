import { FC, ReactNode, useState } from "react";
import { createCtx } from "../utils";
import { LOCAL_STORAGE_KEYS } from "../constants";
import { HexString } from "../types";
import { useRequestAddresses } from "../hooks/useRequestAddresses.ts";
import Spinner from "../components/atoms/Spinner.tsx";

interface Props {
  children: ReactNode;
}

const WalletAuthContextProvider: FC<Props> = ({ children }) => {
  const [addresses, setAddresses] = useState<HexString[]>([]);
  const [address, setAddress] = useState<HexString | null>((localStorage.getItem(LOCAL_STORAGE_KEYS.WALLET_ADDRESS) as HexString) || null);

  const { requestAddresses: connect, isLoading, data } = useRequestAddresses({
    isEnabled: !!window.ethereum,
    onSuccess: (addresses) => {
      setAddressData(addresses);
    }
  })

  const setAddressData = (accounts: HexString[]) => {
    setAddresses(accounts);
    selectAddress(accounts[0]);
  }

  function selectAddress(address: HexString) {
    localStorage.setItem(LOCAL_STORAGE_KEYS.WALLET_ADDRESS, address);
    setAddress(address);
  }

  window.ethereum?.on('accountsChanged', (accounts: Array<HexString>) => {
    if (accounts.length === 0) {
      localStorage.removeItem(LOCAL_STORAGE_KEYS.WALLET_ADDRESS);
      setAddress(null);
    }
    window.location.reload()
  });

  window.ethereum?.on("connect", () => {
    connect()
  })

  window.ethereum?.on('disconnect', () => {
   console.log("Wallet disconnected. Please reconnect and refresh the page.");
  });


  if (!data && isLoading) {
    return <Spinner/>
  }
  return (
    <WalletAuthContextBaseProvider value={{
      connect,
      address,
      addresses,
      selectAddress,
      // getAddresses
    }}>
      {children}
    </WalletAuthContextBaseProvider>
  );
};

export default WalletAuthContextProvider;

export interface WalletAuthContext {
  connect: () => void;
  addresses: HexString[];
  // getAddresses: () => Promise<RequestAddressesReturnType | undefined>;
  selectAddress: (address: HexString) => void;
  address: HexString | null;
}

export const [useWalletAuthContext, WalletAuthContextBaseProvider] = createCtx<WalletAuthContext>();
