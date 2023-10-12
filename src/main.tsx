import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import WalletAuthContext from "./contexts/WalletAuthContext.tsx";
import "./globals.scss";
import ChainContextProvider from "./contexts/ChainContext.tsx";
import { ThemeProvider } from "@material-tailwind/react";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider>
    <ChainContextProvider>
      <WalletAuthContext>
        <App/>
      </WalletAuthContext>
    </ChainContextProvider>
  </ThemeProvider>
);
