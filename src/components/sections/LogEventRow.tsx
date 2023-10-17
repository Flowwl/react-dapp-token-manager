import { FC } from 'react';
import cx from "classnames";
import { Log, trim } from "viem";
import Disclosure from "../atoms/Disclosure.tsx";
import { formatBigInt } from "../../utils/formatBigInt.ts";
import { useChainContext } from "../../contexts";

interface LogEventRowProps {
  className?: string;
  log: Log & { eventName?: string };
}

const LogEventRow: FC<LogEventRowProps> = ({ className, log }) => {

  const { tokenDecimals } = useChainContext();

  const TransferParams = () => {
    return (
      <>
        {log.topics[1] && <LogParam name="From" value={trim(log.topics[1])}/>}
        {log.topics[2] && <LogParam name="To" value={trim(log.topics[2])}/>}
        {log.data && <LogParam name="Value" value={formatBigInt(BigInt(log.data), tokenDecimals).toString()}/>}
      </>
    );
  };

  const ApprovalParams = () => {
    return (
      <>
        {log.topics[1] && <LogParam name="Owner" value={trim(log.topics[1])}/>}
        {log.topics[2] && <LogParam name="Spender" value={trim(log.topics[2])}/>}
        {log.data && <LogParam name="Value" value={formatBigInt(BigInt(log.data), tokenDecimals).toString()}/>}
      </>
    );
  };
  return (
    <Disclosure
      className={cx("w-full flex justify-between", className)}
      key={log.transactionHash}
      header={
        <a
          className="w-full flex justify-between gap-12"
          href={`https://mumbai.polygonscan.com/tx/${log.transactionHash}`}
          target="_blank"
          data-tooltip-id="event-address"
          data-tooltip-content={log.transactionHash}
        >
          {log.eventName && (
            <span className="underline">
              {log.eventName}
            </span>
          )}
          <span className="w-full truncate">
          {log.transactionHash}
          </span>
        </a>
      }
      body={
        <div className="flex flex-col w-full py-2 gap-1">
          {log.eventName === "Transfer" && <TransferParams/>}
          {log.eventName === "Approval" && <ApprovalParams/>}
        </div>
      }
    />
  );
};

const LogParam = ({ name, value }: { name: string; value: string }) => (
  <p className="w-full flex gap-14">
    <span className="w-14">{name}</span>
    <span
      className="w-56 text-left truncate"
      data-tooltip-id="event-address"
      data-tooltip-content={value}
    >
      {value}
    </span>
  </p>
);

export default LogEventRow;
