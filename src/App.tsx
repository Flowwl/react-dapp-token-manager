import WalletButton from "./components/WalletButton.tsx";
import SendButton from "./components/SendButton.tsx";
import { useRpcPublicClient } from "./contexts";
import Status from "./components/Status.tsx";
function App() {
  const { address } = useRpcPublicClient();
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center gap-2">
      <Status />
      {! address && <WalletButton/> }
      {address && <SendButton/>}
    </div>

  );
}

export default App;
