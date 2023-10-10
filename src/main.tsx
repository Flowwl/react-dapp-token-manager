import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import RPCPublicClientContext from "./contexts/RPCPublicClientContext.tsx";
import "./globals.scss"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RPCPublicClientContext>
      <App/>
    </RPCPublicClientContext>
  </React.StrictMode>
);
