import { Disclosure as HDisclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/20/solid';

import * as React from 'react';
import { FC } from 'react';
import cx from "classnames";

interface DisclosureProps {
  className?: string;
  header: React.ReactNode;
  body: React.ReactNode;
}

const Disclosure: FC<DisclosureProps> = ({ className, header, body }) => {

  return (
    <div className={cx("w-full", className)}>
      <HDisclosure>
        {({ open }) => (
          <div className="flex flex-col w-full mx-auto">
            <HDisclosure.Button
              className="flex justify-between gap-3 text-left text-sm font-medium pr-5">
              <div className="w-11/12">{header}</div>
              <ChevronUpIcon className={cx({ 'rotate-180 transform' : open}, "h-5 w-5 text-gray-400")}/>
            </HDisclosure.Button>
            <HDisclosure.Panel className="text-sm font-light text-gray-500 pl-8">
              {body}
            </HDisclosure.Panel>

          </div>
        )}
      </HDisclosure>
    </div>
  );
};

export default Disclosure;
