import { FC } from 'react';
import { Switch as HSwitch } from "@headlessui/react";
import cx from "classnames";
interface SwitchProps {
  className?: string;
  onClick: () => void;
  enabled: boolean;
}

const Switch: FC<SwitchProps> = ({ className, onClick, enabled }) => {

  return (
      <HSwitch
        checked={enabled}
        onChange={onClick}
        className={cx(
          className,
          {
            'bg-purple-900': enabled,
            'bg-purple-700': !enabled,
          },
          "relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out"
        )}
      >
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className={`${enabled ? 'translate-x-6' : 'translate-x-0'}
            pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition duration-200 ease-in-out`}
        />
      </HSwitch>
  )
};

export default Switch;
