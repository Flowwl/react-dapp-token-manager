import { useRpcPublicClient } from "../contexts";
import DisconnectedStatus from "./DisconnectedStatus.tsx";
import ConnectedStatus from "./ConnectedStatus.tsx";

export default function Status() {
  const { address } = useRpcPublicClient();

  return (
    <>
    {address && <ConnectedStatus/>}
    {!address && <DisconnectedStatus/>}
    </>
  )
}
