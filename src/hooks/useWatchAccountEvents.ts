import { useChainContext, useConnectedWalletContext } from "../contexts";
import { Log, parseAbiItem } from "viem";
import { useEffect, useState } from "react";
import { TOKENS } from "../constants/tokens.ts";
import { arrayToObjectByKey } from "../utils/arrayToObjectByKey.ts";
import { toast } from "react-toastify";
import { uniqueArrayByKey } from "../utils/uniqueArrayByKey.ts";

export function useWatchAccountEvents() {
  const { webSocketPublicClientActions, selectedToken } = useChainContext();
  const { account } = useConnectedWalletContext();
  const [transfers, setTransfers] = useState<Record<string, Log>>({});
  const [approvals, setApprovals] = useState<Record<string, Log>>({});

  useEffect(() => {
    console.log("Watching events...");
    const address = TOKENS[selectedToken].address;
    const unwatchApprovals = webSocketPublicClientActions.watchEvent({
      ...(address ? { address } : {}),
      onLogs: (logs) => {
        const approvalsByHash = arrayToObjectByKey(logs, 'transactionHash');
        setApprovals((approvals) => ({ ...approvals, ...approvalsByHash }));
        toast.info("Approval Mined!");
      },
      event: parseAbiItem('event Approval(address indexed owner, address indexed sender, uint256 value)'),
      args: { owner: account }
    });
    const unwatchTransfersFrom = webSocketPublicClientActions.watchEvent({
      ...(address ? { address } : {}),
      onLogs: (logs) => {
        const transfersByHash = arrayToObjectByKey(logs, 'transactionHash');
        setTransfers((transfers) => ({ ...transfers, ...transfersByHash }));
        toast.info("Transfer Mined!");
      },
      event: parseAbiItem('event Transfer(address indexed from, address indexed to, uint256 value)'),
      args: { from: account }
    });

    const unwatchTransfersTo = webSocketPublicClientActions.watchEvent({
      ...(address ? { address } : {}),
      onLogs: (logs) => {
        const transfersByHash = arrayToObjectByKey(logs, 'transactionHash');
        setTransfers((transfers) => ({ ...transfers, ...transfersByHash }));
        toast.info("You have received some tokens, don't forget to thanks the sender !");
      },
      event: parseAbiItem('event Transfer(address indexed from, address indexed to, uint256 value)'),
      args: { to: account }
    });


    return () => {
      unwatchApprovals();
      unwatchTransfersFrom();
      unwatchTransfersTo();
    };

  }, [selectedToken]);

  function getLast10Logs(approvals: Log[], transfers: Log[]) {
    return uniqueArrayByKey([...approvals, ...transfers], "transactionHash")
      .sort((a, b) => Number(b.blockNumber) - Number(a.blockNumber))
      .slice(0, 10);
  }

  return { events: getLast10Logs(Object.values(approvals), Object.values(transfers)) };
}
