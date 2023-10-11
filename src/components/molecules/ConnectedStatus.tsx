import { FC } from 'react';
import UserAddressListBox from "./UserAddressListBox.tsx";
import UserBalance from "./UserBalance.tsx";

interface ConnectedStatusProps {
  className?: string;
}

const ConnectedStatus: FC<ConnectedStatusProps> = () => {
  return (
    <div className="flex items-center">
      <div className="border bg-green-500 border-green-500 rounded-full w-1.5 h-1.5 mr-2"></div>
      <div className="text-xs md:text-xs flex flex-col w-24">
        <UserAddressListBox/>
        <UserBalance/>
      </div>
    </div>
  );
};

export default ConnectedStatus;
