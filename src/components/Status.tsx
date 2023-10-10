import { useRpcPublicClient } from "../contexts";

export default function Status() {
  const { address, balance } = useRpcPublicClient();

  if (!address) {
    return (
      <div className="flex items-center">
        <div className="border bg-red-600 border-red-600 rounded-full w-1.5 h-1.5 mr-2">
        </div>
        <div>Disconnected</div>
      </div>);
  }
  return (
    <div className="flex items-center w-full">
      <div className="border bg-green-500 border-green-500 rounded-full w-1.5 h-1.5 mr-2"></div>
      <div className="text-xs md:text-xs">{address} <br/> Balance: {balance.toString()}</div>
    </div>
  );
}
