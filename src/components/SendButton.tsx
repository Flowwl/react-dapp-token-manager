import { FC } from 'react';
import { useRpcPublicClient } from "../contexts";

interface SendButtonProps {
  className?: string;
}

const SendButton: FC<SendButtonProps> = () => {
  const { sendTransaction } = useRpcPublicClient();


  const handleClick = async () => {
    //#FIXME choose address to send to
    await sendTransaction("0x000000", "0.001");
  }

  return (
    <button
      className="py-2.5 px-2 rounded-md bg-[#1e2124] flex flex-row items-center justify-center border border-[#1e2124] hover:border hover:border-indigo-600 shadow-md shadow-indigo-500/10"
      onClick={handleClick}>
      Send Transaction
    </button>
  );
};

export default SendButton;
