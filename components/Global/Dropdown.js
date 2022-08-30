import { Fragment, useState, useContext } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { userContext } from '../../context/userContext';
import { Icon } from 'semantic-ui-react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const DropDownService = ({ setIsServiceSelected }) => {
  const userCtx = useContext(userContext);
  const { services } = userCtx;
  let isServices;
  if (!services) {
    isServices = localStorage.getItem('services');
  } else {
    isServices = services;
  }
  const people = [
    {
      _id: 1,
      serviceName: 'select a service',
    },
  ];

  const [selected, setSelected] = useState(people[0]);
  if (selected._id !== 1) {
    setIsServiceSelected(selected);
  }

  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <Listbox.Label className="block text-sm font-medium text-gray-700">
            Select Service
          </Listbox.Label>
          <div className="mt-1 relative">
            <Listbox.Button className="relative w-fit bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <span className="flex items-center">
                <Icon
                  size="large"
                  name="user circle"
                  className="flex-shrink-0 h-6 w-6 rounded-full"
                />
                <span className="ml-3 block truncate">
                  {selected.serviceName}
                </span>
              </span>
              <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <Icon
                  name="select"
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 w-fit bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                {isServices.map((service) => (
                  <Listbox.Option
                    key={service._id}
                    className={({ active }) =>
                      classNames(
                        active ? 'text-white bg-indigo-600' : 'text-gray-900',
                        'cursor-default select-none relative py-2 pl-3 pr-9'
                      )
                    }
                    value={service}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          <Icon
                            size="large"
                            name="user circle"
                            className="flex-shrink-0 h-6 w-6 rounded-full"
                          />

                          <span
                            className={classNames(
                              selected ? 'font-semibold' : 'font-normal',
                              'ml-3 block truncate'
                            )}
                          >
                            {service.serviceName}
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-indigo-600',
                              'absolute inset-y-0 right-0 flex items-center pr-4'
                            )}
                          >
                            <Icon
                              name="check"
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};

export default DropDownService;
