import WalletButton from "./components/WalletButton.tsx";
import SendButton from "./components/SendButton.tsx";
import Status from "./components/Status.tsx";
import { useWalletAuthContext } from "./contexts";
import ConnectedWalletContext from "./contexts/ConnectedWalletContext.tsx";

function App() {
  const { address } = useWalletAuthContext();
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center gap-2">
      <Status/>
      {!address && <WalletButton/>}
      {address && (
        <ConnectedWalletContext address={address}>
          <SendButton/>
        </ConnectedWalletContext>
      )}
    </div>

  );
}

export default App;
