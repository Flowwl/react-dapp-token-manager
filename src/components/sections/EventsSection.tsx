import { FC, useEffect, useState } from 'react';
import cx from "classnames";
import { ArrowPathIcon } from "@heroicons/react/20/solid";
import { Tooltip } from "react-tooltip";
import Input from "../atoms/Input.tsx";
import Last10Events from "./Last10Events.tsx";
import Last10AccountEvents from "./Last10AccountEvents.tsx";

interface EventsSectionProps {
  className?: string;
}

const EventsSection: FC<EventsSectionProps> = ({ className }) => {
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [shouldRefetch, setShouldRefetch] = useState(true);
  const changeIsLoading = (value: boolean) => {
    setIsLoading(value);
  };

  useEffect(() => {
    if (!isLoading && shouldRefetch) {
      setShouldRefetch(false);
    }
  }, [isLoading, shouldRefetch]);
  return (
    <div className={cx("bg-bg-700/70 rounded-lg flex flex-col gap-3 px-8 py-4", className)}>
      <div className="flex items-center justify-between">
        <div/>
        <h2 className="font-title text-3xl">Events</h2>
        <ArrowPathIcon
          className={cx("mr-4 text-gray-400 hover:text-gray-50 cursor-pointer h-6 w-6", { "animate-spin": isLoading })}
          onClick={() => setShouldRefetch(true)}
        />
      </div>
      <Input label="Search" type={"text"} onChange={(e) => setSearch(e.target.value)}/>
      <div className="flex flex-col gap-1 h-full overflow-y-auto justify-between">
        <Last10AccountEvents
          search={search}
          changeIsLoading={changeIsLoading}
          shouldRefetch={shouldRefetch}
        />
        <div className="h-0 w-full border-b-[0.001em] border-gray-50 rounded-full"/>
        <Last10Events
          search={search}
          changeIsLoading={changeIsLoading}
          shouldRefetch={shouldRefetch}
        />
      </div>
      <Tooltip id="event-address"/>
    </div>
  );
};

export default EventsSection;
