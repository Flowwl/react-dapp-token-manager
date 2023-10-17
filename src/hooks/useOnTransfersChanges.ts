import { useChainContext, useConnectedWalletContext } from "../contexts";
import { Log, parseAbiItem } from "viem";
import { useEffect } from "react";
import { TOKENS } from "../constants/tokens.ts";

export function useOnTransfersChanges(callback: (logs?: Log[]) => void) {
  const { webSocketPublicClientActions, selectedToken } = useChainContext();
  const { account } = useConnectedWalletContext();

  useEffect(() => {
    const address = TOKENS[selectedToken].address;

    const unwatchTransfersFrom = webSocketPublicClientActions.watchEvent({
      ...(address ? { address } : {}),
      onLogs: (logs) => {
        callback(logs)
      },
      event: parseAbiItem('event Transfer(address indexed from, address indexed to, uint256 value)'),
      args: { from: account }
    });

    const unwatchTransfersTo = webSocketPublicClientActions.watchEvent({
      ...(address ? { address } : {}),
      onLogs: (logs) => {
        callback(logs)
      },
      event: parseAbiItem('event Transfer(address indexed from, address indexed to, uint256 value)'),
      args: { to: account }
    });

    return () => {
      unwatchTransfersTo();
      unwatchTransfersFrom();
    };

  }, [account, callback, selectedToken, webSocketPublicClientActions]);
}
