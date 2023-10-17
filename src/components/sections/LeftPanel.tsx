import { FC } from 'react';
import cx from "classnames";
import BalanceSection from "./BalanceSection.tsx";
import AllowanceSection from "./AllowanceSection.tsx";

interface LeftPanelProps {
  className?: string;
}

const LeftPanel: FC<LeftPanelProps> = ({ className }) => {

  return (
    <div className={cx("bg-bg-700/70 rounded-lg flex flex-col gap-3 overflow-y-auto px-8 py-4", className)}>
      <BalanceSection />
      <AllowanceSection />
    </div>
  );
};

export default LeftPanel;
