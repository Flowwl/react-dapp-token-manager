import { FC } from 'react';
import cx from "classnames";
import BalanceSection from "./BalanceSection.tsx";
import AllowanceSection from "./AllowanceSection.tsx";
import EventsSection from "./EventsSection.tsx";

interface LeftPanelProps {
  className?: string;
}

const LeftPanel: FC<LeftPanelProps> = ({ className }) => {

  return (
    <div className={cx("flex flex-col gap-4", className)}>
      <BalanceSection className="h-56"/>
      <AllowanceSection className="h-56"/>
      <EventsSection className="grow p-2"/>
    </div>

  );
};

export default LeftPanel;
