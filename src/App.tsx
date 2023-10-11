import { useWalletAuthContext } from "./contexts";
import ConnectedWalletContext from "./contexts/ConnectedWalletContext.tsx";
import UserActionsSection from "./components/sections/UserActionsSection.tsx";
import TopBar from "./components/sections/TopBar.tsx";

function App() {
  const { address } = useWalletAuthContext();
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center gap-2">
      <TopBar/>
      {address && (
        <ConnectedWalletContext address={address}>
          <UserActionsSection/>
        </ConnectedWalletContext>
      )}
    </div>

  );
}

export default App;
