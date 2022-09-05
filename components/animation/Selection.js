import React, { useState } from 'react';
import { Button, Divider, Image, Transition } from 'semantic-ui-react';
import Nav from './Nav';
import ListItem from './ListItem';
import styles from './selection.module.css';
const Selection = ({ staff, services, staffSelected, serviceSelected }) => {
  const [visible, setVisible] = useState(true);
  const [selection, setSelection] = useState('Staff');
  setTimeout(() => {
    setVisible(!visible);
  }, 1000);

  return (
    <section className=" w-full text-sm text-left bg-blue-700  text-slate-200 uppercase  dark:bg-gray-700 dark:text-gray-400">
      <Nav>
        <button
          onClick={() => setSelection('Staff')}
          className={`block px-3 py-2 rounded-md border-2 hover:border-blue-200 ${
            selection === 'Staff'
              ? 'bg-blue-800 border-2 border-blue-200 text-white'
              : 'bg-blue-400 text-slate-100 dark:bg-blue-400 '
          }`}
        >
          Staff
        </button>
        <button
          onClick={() => setSelection('Services')}
          className={`block px-3 py-2 rounded-md border-2 hover:border-blue-200 ${
            selection === 'Services'
              ? 'bg-blue-800 border-2 border-blue-200 text-white'
              : ' bg-blue-400 text-slate-100 dark:bg-blue-400'
          }`}
        >
          Services
        </button>
      </Nav>

      <Divider hidden />
      <ul className="divide-y divide-slate-100">
        {selection === 'Staff'
          ? staff.map((person) => (
              <ListItem
                key={person._id}
                type="Staff"
                data={person}
                serviceSelected={serviceSelected}
                staffSelected={staffSelected}
              />
            ))
          : services.map((service) => (
              <ListItem
                key={service._id}
                type="Service"
                data={service}
                serviceSelected={serviceSelected}
                staffSelected={staffSelected}
              />
            ))}
      </ul>
    </section>
  );
};
export default Selection;
