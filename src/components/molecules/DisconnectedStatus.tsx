import { FC } from 'react';

interface DisconnectedStatusProps {
  className?: string;
}

const DisconnectedStatus: FC<DisconnectedStatusProps> = () => {

  return (
    <div className="flex items-center">
      <div className="border bg-red-600 border-red-600 rounded-full w-1.5 h-1.5 mr-2">
      </div>
      <div>Disconnected</div>
    </div>
  );
};

export default DisconnectedStatus;
