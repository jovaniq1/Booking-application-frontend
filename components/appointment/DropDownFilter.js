import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';

import { Icon } from 'semantic-ui-react';
import { BlueButton } from '../Global/button/Button';
function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const DropDownFilter = ({ setFilter }) => {
  return (
    <Menu as="div" className="relative ">
      <div>
        <Menu.Button className="rounded-md flex  flex-row dark:bg-slate-200 dark:text-slate-200  opacity-3 sm:py-1 sm:px-3  shadow-lg hover:shadow-blue-800/50 hover:scale-105 bg-blue-800 before:bg-inherit bg-gradient-to-r from-blue-900 to-blue-800   border-0 text-center transition-all touch-auto text-slate-100 cursor-pointer font-normal font-sans text-sm lg:px-3 lg:py-2">
          Sort
          <Icon
            className="flex pl-2 lg:py-1 justify-center"
            name="arrow down"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-fit origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => setFilter('pending')}
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Pending
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => setFilter('approve')}
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Approved
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => setFilter('cancel')}
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Canceled
                </button>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => setFilter('date')}
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Date
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
export default DropDownFilter;
