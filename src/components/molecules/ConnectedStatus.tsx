import { FC } from 'react';
import UserAddressListBox from "./UserAddressListBox.tsx";
import MetamaskIcon from "../atoms/MetamaskIcon.tsx";

interface ConnectedStatusProps {
  className?: string;
}

const ConnectedStatus: FC<ConnectedStatusProps> = () => {
  return (
    <div className="flex items-center gap-2">
      <MetamaskIcon className="h-10 w-10"/>
      <UserAddressListBox/>
    </div>
  );
};

export default ConnectedStatus;
