import TopBar from "./components/sections/TopBar.tsx";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from "react";
import Switch from "./components/atoms/Switch.tsx";
import AmongUsParticles from "./components/atoms/AmongUsParticles.tsx";
import ConfettisParticles from "./components/atoms/ConfettisParticles.tsx";
import MyWalletView from "./views/MyWalletView.tsx";
import SwapView from "./views/SwapView.tsx";
import { Routes, Route } from "react-router-dom";
function App() {
  const areParticlesVisible = localStorage.getItem("particlesActivated") === "true";
  const [particlesActivated, setParticlesActivated] = useState<boolean>(areParticlesVisible);

  const onParticlesClick = () => {
    setParticlesActivated((state) => {
      localStorage.setItem("particlesActivated", `${!state}`);
      return !state
    });
  };

  useEffect(() => {
  }, [particlesActivated]);
  return (
    <div
      className="h-screen overflow-hidden w-full p-4 flex flex-col items-center gap-4 text-gray-50 scrollbar scrollbar-thumb-gray-400 scrollbar-track-gray-100">
      <TopBar className="h-20"/>
      <div className="h-[85vh] w-11/12">
        <Routes>
          <Route path="/" element={<MyWalletView/>}/>
          <Route path="/swap" element={<SwapView/>}/>
        </Routes>
      </div>
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
