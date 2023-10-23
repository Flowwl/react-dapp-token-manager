import { FC, useEffect, useState } from 'react';
import cx from "classnames";
import { useWatchEvents } from "../../hooks/useWatchEvents.ts";
import { Transition } from "@headlessui/react";
import LogEventRow from "./LogEventRow.tsx";
import Spinner from "../atoms/Spinner.tsx";
import { useGetLast10Events } from "../../hooks/useGetLast10Events.ts";

interface Last10EventsProps {
  className?: string;
  search: string;
  changeIsLoading: (value: boolean) => void;
  shouldRefetch: boolean;
}

const Last10Events: FC<Last10EventsProps> = ({ className, search, changeIsLoading, shouldRefetch }) => {
  const { data: last10Events, isLoading: areLast10EventsLoading, fetchLast10Events } = useGetLast10Events({ isEnabled: false, refetchInterval: 600000 });
  const { events, emptyEvents } = useWatchEvents();
  const [showEvents, setShowEvents] = useState(false);
  const onRefetch = () => fetchLast10Events();

  useEffect(() => {
    setShowEvents(true);
    setTimeout(() => setShowEvents(false), 1000);
  }, [events.length]);
  useEffect(() => { changeIsLoading(areLast10EventsLoading); }, [areLast10EventsLoading]);
  useEffect(() => {
    onRefetch();
    emptyEvents();
  }, [shouldRefetch]);


  const filteredLast10Events = (last10Events || []).filter((log) => search === "" || log.transactionHash?.includes(search));
  const filteredEvents = events.filter((log) => search === "" || log.transactionHash?.includes(search));
  return (
    <div className={cx("flex flex-col gap-3 h-full", className)}>
      <h3 className="font-title text-lg">Last 10 events</h3>
      <div className="flex flex-col h-48 overflow-y-auto gap-2">
        {filteredEvents.length > 0 && filteredEvents.map((log) =>
          <Transition
            show={showEvents}
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
        {!areLast10EventsLoading && (filteredLast10Events?.length || 0) > 0 && filteredLast10Events?.map((log) =>
          <LogEventRow key={log.transactionHash} log={log}/>)
        }
        {!areLast10EventsLoading
          && filteredEvents.length === 0
          && filteredLast10Events?.length === 0
          && (<p className="text-center">No event</p>)
        }
        {areLast10EventsLoading && (<Spinner/>)}
      </div>
    </div>
  );
};

export default Last10Events;
