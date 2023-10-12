import { useWalletAuthContext } from "./contexts";
import ConnectedWalletContext from "./contexts/ConnectedWalletContext.tsx";
import UserActionsSection from "./components/sections/UserActionsSection.tsx";
import TopBar from "./components/sections/TopBar.tsx";
import BalanceSection from "./components/sections/BalanceSection.tsx";

function App() {
  const { address } = useWalletAuthContext();
  return (
    <div className="h-screen w-full bg-bg-900 p-4 flex flex-col items-center gap-4">
      <TopBar/>
      <div className="h-full overflow-y-auto">

        {address && (
          <ConnectedWalletContext address={address}>
            <div className="flex h-full w-full gap-4 text-gray-50">
              <BalanceSection/>
              <UserActionsSection/>
            </div>
          </ConnectedWalletContext>
        )}
      </div>
    </div>

  );
}

export default App;
