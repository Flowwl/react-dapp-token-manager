import { useRpcPublicClient } from "../contexts";

export default function WalletButton() {
  const { connect } = useRpcPublicClient();

  return (
    <button
      className="px-8 py-2 rounded-md bg-[#1e2124] flex flex-row items-center justify-center border border-[#1e2124] hover:border hover:border-indigo-600 shadow-md shadow-indigo-500/10"
      onClick={connect}
    >
      <img src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg" alt="MetaMask Fox"
           style={{ width: "25px", height: "25px" }}/>
      <h1 className="mx-auto">Connect Wallet</h1>
    </button>
  );
}
