import { FC, useEffect } from 'react';
import cx from "classnames";
import { ArrowPathIcon } from "@heroicons/react/20/solid";
import Spinner from "../atoms/Spinner.tsx";
import { useGetLast10Events } from "../../hooks/useGetLast10Events.ts";
import { useGetLast10AccountEvents } from "../../hooks/useGetLast10AccountEvents.ts";

interface EventsSectionProps {
  className?: string;
}

const EventsSection: FC<EventsSectionProps> = ({ className }) => {
  const { data: last10Events, isLoading: areLast10EventsLoading, fetchLast10Events } = useGetLast10Events({ isEnabled: false, refetchInterval: 600000 });
  const { data: last10AccountEvents, isLoading: areLast10AccountEventsLoading, fetchLast10AccountEvents } = useGetLast10AccountEvents({ isEnabled: false, refetchInterval: 600000 });


  useEffect(() => {
      onRefetch()
  }, [])
  const onRefetch = () => {
      fetchLast10Events();
      fetchLast10AccountEvents();
  };
  return (
    <div className={cx("bg-bg-700/70 rounded-lg flex flex-col", className)}>
      <div className="flex items-center justify-between">
        <div/>
        <h2 className="py-4 px-8 font-title text-3xl">Events</h2>
        <ArrowPathIcon
          className={cx("mr-4 text-gray-400 hover:text-gray-50 cursor-pointer h-7 w-7", {
            "animate-spin": areLast10EventsLoading
          })}
          onClick={onRefetch}
        />
      </div>
      <div className="flex flex-col gap-1 px-8 pt-4 pb-8 h-full overflow-y-auto">
        <div className="flex flex-col gap-3 h-1/2">
          <h3 className="font-title text-lg">Last 10 of your events</h3>
          <div className="flex flex-col overflow-y-auto h-full">
            {last10AccountEvents?.length === 0 && (
              <p className="text-center">No event</p>
            )}
            {areLast10AccountEventsLoading && (<Spinner/>)}
            {(last10AccountEvents?.length || 0) > 0 && last10AccountEvents?.map((log) => (
                <div className="w-full" key={log.transactionHash}>
                  <a href={`https://mumbai.polygonscan.com/tx/${log.transactionHash}`} target="_blank">
                    <p className="truncate w-full">{log.transactionHash}</p>
                  </a>
                </div>
              )
            )}
          </div>
        </div>
        <div className="flex flex-col gap-3 h-1/2">
          <h3 className="font-title text-lg">Last 10 events</h3>
          <div className="flex flex-col overflow-y-auto h-full">
            {last10Events?.length === 0 && (
              <p className="text-center">No events</p>
            )}
            {areLast10EventsLoading && (<Spinner/>)}
            {(last10Events?.length || 0) > 0 && last10Events?.map((log) => (
                <div className="w-full" key={log.transactionHash}>
                  <a href={`https://mumbai.polygonscan.com/tx/${log.transactionHash}`} target="_blank">
                    <p className="truncate w-full">{log.transactionHash}</p>
                  </a>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsSection;
