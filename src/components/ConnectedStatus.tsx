import { FC } from 'react';
import { useFetch } from "../hooks";
import { useRpcPublicClient } from "../contexts";
import Spinner from "./Spinner.tsx";

interface ConnectedStatusProps {
  className?: string;
}

const ConnectedStatus: FC<ConnectedStatusProps> = () => {
  const { address , publicClientActions} = useRpcPublicClient();
  const { data: balance, isLoading} = useFetch(publicClientActions.getBalance(address as string))

  if (balance === null && isLoading) return <Spinner/>
  if (balance === null) return <div>An error occurred while fetching the balance</div>
  return (
    <div className="flex items-center w-full">
      <div className="border bg-green-500 border-green-500 rounded-full w-1.5 h-1.5 mr-2"></div>
      <div className="text-xs md:text-xs">{address} <br/> Balance: {balance.toString()}</div>
    </div>
  );
};

export default ConnectedStatus;
