import { useChainContext } from "../contexts";
import { Log, parseAbiItem } from "viem";
import { useEffect, useState } from "react";
import { TOKENS } from "../constants/tokens.ts";
import { arrayToObjectByKey } from "../utils/arrayToObjectByKey.ts";
import { uniqueArrayByKey } from "../utils/uniqueArrayByKey.ts";

export function useWatchEvents() {
  const { webSocketPublicClientActions, selectedToken } = useChainContext();
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
        // toast.info("Someone approved on the chain!")
      },
      event: parseAbiItem('event Approval(address indexed owner, address indexed sender, uint256 value)'),
    });
    const unwatchTransfers = webSocketPublicClientActions.watchEvent({
      ...(address ? { address } : {}),
      onLogs: (logs) => {
        const transfersByHash = arrayToObjectByKey(logs, 'transactionHash');
        setTransfers((transfers) => ({ ...transfers, ...transfersByHash }));
        // toast.info("Someone transferred on the chain!")
      },
      event: parseAbiItem('event Transfer(address indexed from, address indexed to, uint256 value)'),
    });


    return () => {
      unwatchApprovals();
      unwatchTransfers();
    };

  }, [selectedToken]);

  function getLast10Logs(approvals: Log[], transfers: Log[]) {
    return uniqueArrayByKey([...approvals, ...transfers], "transactionHash")
      .sort((a, b) => Number(b.blockNumber) - Number(a.blockNumber))
      .slice(0, 10);
  }

  return { events: getLast10Logs(Object.values(approvals), Object.values(transfers)) };
}
