import { FC, useEffect, useState } from 'react';
import cx from "classnames";
import { ArrowPathIcon } from "@heroicons/react/20/solid";
import Spinner from "../atoms/Spinner.tsx";
import { useGetLast10Events } from "../../hooks/useGetLast10Events.ts";
import { useGetLast10AccountEvents } from "../../hooks/useGetLast10AccountEvents.ts";
import { Tooltip } from "react-tooltip";
import LogEventRow from "./LogEventRow.tsx";
import Input from "../atoms/Input.tsx";
import { useWatchAccountEvents } from "../../hooks/useWatchAccountEvents.ts";
import { useWatchEvents } from "../../hooks/useWatchEvents.ts";

interface EventsSectionProps {
  className?: string;
}

const EventsSection: FC<EventsSectionProps> = ({ className }) => {
  const { data: last10Events, isLoading: areLast10EventsLoading, fetchLast10Events } = useGetLast10Events({ isEnabled: false, refetchInterval: 600000 });
  const { data: last10AccountEvents, isLoading: areLast10AccountEventsLoading, fetchLast10AccountEvents } = useGetLast10AccountEvents({ isEnabled: false, refetchInterval: 600000 });
  const [search, setSearch] = useState("");
  const { events: accountEvents } = useWatchAccountEvents();
  const { events } = useWatchEvents();

  useEffect(() => { onRefetch(); }, []);
  const onRefetch = () => {
    fetchLast10Events();
    fetchLast10AccountEvents();
  };
  const filteredLast10AccountEvents = [...accountEvents, ...(last10AccountEvents || [])].filter((log) => search === "" || log.transactionHash?.includes(search));
  const filteredLast10Events = [...events, ...(last10Events || [])].filter((log) => search === "" || log.transactionHash?.includes(search));
  return (
    <div className={cx("bg-bg-700/70 rounded-lg flex flex-col gap-3 px-8 py-4", className)}>
      <div className="flex items-center justify-between">
        <div/>
        <h2 className="font-title text-3xl">Events</h2>
        <ArrowPathIcon
          className={cx("mr-4 text-gray-400 hover:text-gray-50 cursor-pointer h-6 w-6", { "animate-spin": areLast10EventsLoading })}
          onClick={onRefetch}
        />
      </div>
      <Input label="Search" type={"text"} onChange={(e) => setSearch(e.target.value)}/>
      <div className="flex flex-col gap-1 h-full overflow-y-auto">
        <div className="flex flex-col gap-3">
          <h3 className="font-title text-lg">Last 10 of your events</h3>
          <div className="flex flex-col overflow-y-auto h-28 gap-2">
            {areLast10AccountEventsLoading && (<Spinner/>)}
            {!areLast10AccountEventsLoading && filteredLast10AccountEvents?.length === 0 && (
              <p className="text-center">No event</p>)}
            {!areLast10AccountEventsLoading && (filteredLast10AccountEvents?.length || 0) > 0 && filteredLast10AccountEvents?.map((log) =>
              <LogEventRow
                key={log.transactionHash} log={log}/>)}
          </div>
        </div>
        <div className="h-0 w-full border-b-[0.001em] border-gray-50 rounded-full"/>
        <div className="flex flex-col gap-3">
          <h3 className="font-title text-lg">Last 10 events</h3>
          <div className="flex flex-col overflow-y-auto h-28 gap-2">
            {areLast10EventsLoading && (<Spinner/>)}
            {!areLast10EventsLoading && filteredLast10Events?.length === 0 && (<p className="text-center">No event</p>)}
            {!areLast10EventsLoading && (filteredLast10Events?.length || 0) > 0 && filteredLast10Events?.map((log) =>
              <LogEventRow key={log.transactionHash} log={log}/>)}
          </div>
        </div>
      </div>
      <Tooltip id="event-address"/>
    </div>
  );
};

export default EventsSection;
