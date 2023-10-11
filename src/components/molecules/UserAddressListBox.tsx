import { FC } from 'react';
import cx from "classnames";
import { useFetch } from "../../hooks";
import { useWalletAuthContext } from "../../contexts";
import Listbox, { ListBoxValue } from "../atoms/Listbox.tsx";
import { HexString } from "../../types";
import Spinner from "../atoms/Spinner.tsx";

interface UserAddressListBoxProps {
  className?: string;
}

const UserAddressListBox: FC<UserAddressListBoxProps> = ({ className }) => {
  const { address, getAddresses, selectAddress } = useWalletAuthContext();
  const { data: addresses, isLoading: areAddressesLoading } = useFetch(getAddresses());
  const onSelect = async (value: ListBoxValue) => {
    selectAddress(value.name as HexString);
  };

  if (addresses === null && areAddressesLoading) {
    return <Spinner/>
  }
  const addressValues = addresses?.map((address) => ({ name: address })) || [];
  const selectedAddress = addressValues.find((listboxAddress) => listboxAddress.name === address);
  return (
    <div className={cx(className)}>
      <Listbox onSelect={onSelect} values={addressValues} selectedValue={selectedAddress || null}/>
    </div>
  );
};

export default UserAddressListBox;
