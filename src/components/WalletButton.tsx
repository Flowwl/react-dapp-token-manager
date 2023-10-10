import { useState } from "react";
import { useRpcPublicClient } from "../contexts";
import Status from "./Status.tsx";
export default function WalletButton() {
  //State variables for address & balance
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<BigInt>(BigInt(0));
  const { walletClientActions, publicClientActions} = useRpcPublicClient()
  // Function requests connection and retrieves the address of wallet
  // Then it retrievies the balance of the address
  // Finally it updates the value for address & balance variable
  async function handleClick() {
    try {
      // Instantiate a Wallet & Public Client
      // Performs Wallet Action to retrieve wallet address
      const [address] = await walletClientActions.getAddresses();

      // Performs Public Action to retrieve address balance
      const balance = await publicClientActions.getBalance(address);
      // Update values for address & balance state variable
      setAddress(address);
      setBalance(balance);
    } catch (error) {
      // Error handling
      alert(`Transaction failed: ${error}`);
    }
  }

// Unimportant Section Below / Nice to Have UI
  return (
    <>
      <Status address={address} balance={balance}/>
      <button
        className="px-8 py-2 rounded-md bg-[#1e2124] flex flex-row items-center justify-center border border-[#1e2124] hover:border hover:border-indigo-600 shadow-md shadow-indigo-500/10"
        onClick={handleClick}
      >
        <img src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg" alt="MetaMask Fox"
             style={{ width: "25px", height: "25px" }}/>
        <h1 className="mx-auto">Connect Wallet</h1>
      </button>
    </>);
}
