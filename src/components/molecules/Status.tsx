import { useWalletAuthContext } from "../../contexts";
import DisconnectedStatus from "../molecules/DisconnectedStatus.tsx";
import ConnectedStatus from "../molecules/ConnectedStatus.tsx";

export default function Status() {
  const { address } = useWalletAuthContext();

  return (
    <>
    {address && <ConnectedStatus/>}
    {!address && <DisconnectedStatus/>}
    </>
  )
}
