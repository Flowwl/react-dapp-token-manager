import { FC } from 'react';
import cx from "classnames";
import BalanceSection from "./BalanceSection.tsx";
import AllowanceSection from "./AllowanceSection.tsx";

interface LeftPanelProps {
  className?: string;
}

const LeftPanel: FC<LeftPanelProps> = ({ className }) => {

  return (
    <div className={cx("bg-bg-700/70 rounded-lg flex flex-col gap-5 overflow-y-auto px-8 py-4", className)}>
      <BalanceSection />
      <div className="h-0 w-full border-b-[0.001em] border-gray-50 rounded-full"/>
      <AllowanceSection />
    </div>
  );
};

export default LeftPanel;
