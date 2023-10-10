import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import WalletAuthContext from "./contexts/WalletAuthContext.tsx";
import "./globals.scss"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WalletAuthContext>
      <App/>
    </WalletAuthContext>
  </React.StrictMode>
);
