import { FC, useEffect, useState } from 'react';
import cx from "classnames";
import { Transition } from "@headlessui/react";
import LogEventRow from "./LogEventRow.tsx";
import Spinner from "../atoms/Spinner.tsx";
import { useWatchAccountEvents } from "../../hooks/useWatchAccountEvents.ts";
import { useGetLast10AccountEvents } from "../../hooks/useGetLast10AccountEvents.ts";

interface Last10AccountEventsProps {
  className?: string;
  search: string;
  changeIsLoading: (value: boolean) => void;
  shouldRefetch: boolean;
}

const Last10AccountEvents: FC<Last10AccountEventsProps> = ({ className, search, changeIsLoading, shouldRefetch }) => {
  const { data: last10AccountEvents, isLoading: areLast10AccountEventsLoading, fetchLast10AccountEvents } = useGetLast10AccountEvents({ isEnabled: false, refetchInterval: 600000 });
  const { events: accountEvents, emptyEvents } = useWatchAccountEvents();
  const [showAccountEvents, setShowAccountEvents] = useState(false);
  const onRefetch = () => fetchLast10AccountEvents();

  useEffect(() => {
    setShowAccountEvents(true);
    setTimeout(() => setShowAccountEvents(false), 1000);
  }, [accountEvents.length]);
  useEffect(() => { changeIsLoading(areLast10AccountEventsLoading); }, [areLast10AccountEventsLoading]);
  useEffect(() => {
      onRefetch();
      emptyEvents();
    }, [shouldRefetch]);

  const filteredLast10AccountEvents = [...accountEvents, ...(last10AccountEvents || [])].filter((log) => search === "" || log.transactionHash?.includes(search));
  const filteredAccountEvents = accountEvents.filter((log) => search === "" || log.transactionHash?.includes(search));
  return (
    <div className={cx("flex flex-col gap-3", className)}>
      <h3 className="font-title text-lg">Last 10 of your events</h3>
      <div className={cx("flex flex-col overflow-y-auto h-28 gap-2")}>
        {!areLast10AccountEventsLoading && filteredLast10AccountEvents?.length === 0 && (
          <p className="text-center">No event</p>)}

        {filteredAccountEvents.length > 0 && filteredAccountEvents.map((log) =>
          <Transition
            show={showAccountEvents}
            enter="transition-translation duration-500"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
          >
            <LogEventRow
              key={log.transactionHash}
              log={log}
            />
          </Transition>
        )}
        {!areLast10AccountEventsLoading && (filteredLast10AccountEvents?.length || 0) > 0 && filteredLast10AccountEvents?.map((log) =>
          <LogEventRow
            key={log.transactionHash}
            log={log}
          />
        )}
        {areLast10AccountEventsLoading && (<Spinner/>)}
      </div>
    </div>
  );
};

export default Last10AccountEvents;
