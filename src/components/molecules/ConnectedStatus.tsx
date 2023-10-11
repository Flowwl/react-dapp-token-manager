import { FC } from 'react';
import UserAddressListBox from "./UserAddressListBox.tsx";
import MetamaskIcon from "../atoms/MetamaskIcon.tsx";

interface ConnectedStatusProps {
  className?: string;
}

const ConnectedStatus: FC<ConnectedStatusProps> = () => {
  return (
    <div className="flex items-center">
      <MetamaskIcon className="h-12 w-12"/>
      <UserAddressListBox/>
    </div>
  );
};

export default ConnectedStatus;
