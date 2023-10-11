import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import WalletAuthContext from "./contexts/WalletAuthContext.tsx";
import "./globals.scss";
import ChainContextProvider from "./contexts/ChainContext.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <ChainContextProvider>
      <WalletAuthContext>
        <App/>
      </WalletAuthContext>
    </ChainContextProvider>
);
