import { FC } from 'react';
import cx from "classnames";
import { useWalletAuthContext } from "../../contexts";
import Listbox, { ListBoxValue } from "../atoms/Listbox.tsx";
import { HexString } from "../../types";

interface UserAddressListBoxProps {
  className?: string;
}

const UserAddressListBox: FC<UserAddressListBoxProps> = ({ className }) => {
  const { address, selectAddress, addresses } = useWalletAuthContext();
  const onSelect = async (value: ListBoxValue) => {
    selectAddress(value.name as HexString);
  };

  const addressValues = addresses?.map((address) => ({ name: address })) || [];
  const selectedAddress = addressValues.find((listboxAddress) => listboxAddress.name === address);
  return (
    <div className={cx(className)}>
      <Listbox onSelect={onSelect} values={addressValues} selectedValue={selectedAddress || null}/>
    </div>
  );
};

export default UserAddressListBox;
