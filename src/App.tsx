import { useWalletAuthContext } from "./contexts";
import ConnectedWalletContext from "./contexts/ConnectedWalletContext.tsx";
import UserActionsSection from "./components/sections/UserActionsSection.tsx";
import TopBar from "./components/sections/TopBar.tsx";
import BalanceSection from "./components/sections/BalanceSection.tsx";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import EventsSection from "./components/sections/EventsSection.tsx";

function App() {
  const { address } = useWalletAuthContext();
  return (
    <div className="h-screen w-full p-4 flex flex-col items-center gap-4">
      <TopBar/>
      <div className="h-full w-11/12 mx-auto overflow-y-auto">

        {address && (
          <ConnectedWalletContext address={address}>
            <div className="flex h-full w-full gap-4 text-gray-50">
              <BalanceSection className="!w-3/12"/>
              <UserActionsSection className="!w-9/12"/>
              <EventsSection className="!w-4/12"/>
            </div>
          </ConnectedWalletContext>
        )}
      </div>
      <ToastContainer
        theme="dark"
        autoClose={2000}
        limit={1}
        pauseOnFocusLoss={false}
        pauseOnHover={true}
        enableMultiContainer={false}
      />
    </div>

  );
}

export default App;
