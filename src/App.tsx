import { useWalletAuthContext } from "./contexts";
import ConnectedWalletContext from "./contexts/ConnectedWalletContext.tsx";
import UserActionsSection from "./components/sections/UserActionsSection.tsx";
import TopBar from "./components/sections/TopBar.tsx";
import BalanceSection from "./components/sections/BalanceSection.tsx";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import EventsSection from "./components/sections/EventsSection.tsx";
import ChartSection from "./components/sections/ChartSection.tsx";

function App() {
  const { address } = useWalletAuthContext();
  return (
    <div className="h-screen w-full p-4 flex flex-col items-center gap-4 text-gray-50">
      <TopBar/>
      {address && (
        <ConnectedWalletContext address={address}>
          <div className="h-1/2 w-11/12 mx-auto">
            <div className="flex h-full w-full gap-4">
              <BalanceSection className="!w-3/12"/>
              <UserActionsSection className="!w-9/12"/>
              <EventsSection className="!w-4/12"/>
            </div>
          </div>
          <ChartSection className="w-11/12 h-1/2"/>
        </ConnectedWalletContext>
      )}
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
