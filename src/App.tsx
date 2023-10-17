import { useWalletAuthContext } from "./contexts";
import ConnectedWalletContext from "./contexts/ConnectedWalletContext.tsx";
import UserActionsSection from "./components/sections/UserActionsSection.tsx";
import TopBar from "./components/sections/TopBar.tsx";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import EventsSection from "./components/sections/EventsSection.tsx";
import ChartSection from "./components/sections/ChartSection.tsx";
import LeftPanel from "./components/sections/LeftPanel.tsx";
import { useEffect, useState } from "react";
import Switch from "./components/atoms/Switch.tsx";
import AmongUsParticles from "./components/atoms/AmongUsParticles.tsx";
import ConfettisParticles from "./components/atoms/ConfettisParticles.tsx";

function App() {
  const [particlesActivated, setParticlesActivated] = useState<boolean>(localStorage.getItem("particlesActivated") === "true" || true);

  const onParticlesClick = () => {
    setParticlesActivated((state) => !state);
  };

  useEffect(() => {
    localStorage.setItem("particlesActivated", particlesActivated.toString());
  }, [particlesActivated]);
  const { address } = useWalletAuthContext();
  return (
    <div
      className="h-screen overflow-hidden w-full p-4 flex flex-col items-center gap-4 text-gray-50 scrollbar scrollbar-thumb-gray-400 scrollbar-track-gray-100">
      <TopBar className="h-20"/>
        {address && (
          <ConnectedWalletContext address={address} className={"h-[85vh] w-full mx-auto flex flex-col gap-4"}>
            <div className="h-1/2 w-11/12 flex flex-col mx-auto gap-4">
              <div className="flex h-full w-full gap-4">
                <LeftPanel className="!w-3/12"/>
                <UserActionsSection className="!w-5/12"/>
                <EventsSection className="!w-4/12 p-2"/>
              </div>
            </div>
            <ChartSection className="w-11/12 h-1/2"/>
          </ConnectedWalletContext>
        )}
      <div className="h-20 flex items-center gap-3 font-light text-sm font-title">
        Activate particles
        <Switch onClick={onParticlesClick} enabled={particlesActivated}/>
      </div>
      {particlesActivated && <AmongUsParticles/>}
      {particlesActivated && <ConfettisParticles/>}
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
