import { FC } from 'react';
import { useWalletAuthContext } from "../../contexts";
import { useGetUserBalanceByToken } from "../../hooks";
import Spinner from "../atoms/Spinner.tsx";
import { HexString } from "../../types";

interface UserBalanceProps {
  className?: string;
}

const UserBalance: FC<UserBalanceProps> = () => {
  const { address} = useWalletAuthContext();
  const { data: balance, isLoading } = useGetUserBalanceByToken(address as HexString, "MATIC");


  if (balance === null && isLoading) {
    return <Spinner/>;
  }

  if (balance === null) {
    return <div>An error occurred while fetching the balance</div>;
  }
  return (
    <p>Balance: {balance.toString()}</p>
  );
};

export default UserBalance;
