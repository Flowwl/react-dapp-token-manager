import { FC, Fragment } from 'react';
import { Listbox as HListbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid';
import cx from "classnames";

export type ListBoxValue = {
  name: string;
}

interface ListboxProps {
  className?: string;
  onSelect: (value: ListBoxValue) => void;
  selectedValue?: ListBoxValue | null
  values: ListBoxValue[]
}

const Listbox: FC<ListboxProps> = ({ className, onSelect, selectedValue, values }) => {

  return (
    <div className={cx("w-56 text-gray-50", className)}>
      <HListbox value={selectedValue} onChange={onSelect}>
        <div className="relative">
          <HListbox.Button
            className="truncate relative w-full cursor-pointer hover:opacity-80 rounded-lg py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate text-gray-50">{selectedValue?.name || ""}</span>
            <span className="pointer-events-none  absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronDownIcon
                className="h-5 w-5 text-gray-50"
                aria-hidden="true"
              />
            </span>
          </HListbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <HListbox.Options
              className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {values.map((value) => (
                <HListbox.Option
                  key={value.name}
                  className={({ active }) =>
                    `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                    }`
                  }
                  value={value}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {value.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true"/>
                        </span>
                      ) : null}
                    </>
                  )}
                </HListbox.Option>
              ))}
            </HListbox.Options>
          </Transition>
        </div>
      </HListbox>
    </div>
  );
};


export default Listbox;
