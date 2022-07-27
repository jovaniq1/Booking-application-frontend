import React, { useState } from 'react';
import { Image, Modal, Button, Header, Table } from 'semantic-ui-react';
import EditBooking from './EditModal';
import DeleteModal from './DeleteModal';
import AppointmentLayout from './ApptListLayout';
import Link from 'next/link';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Bookings = () => {
  const [show, setShow] = useState(null);
  const [isChecked, setIsChecked] = useState([]);
  const [isDelete, setIsDelete] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [statusSelected, SetStatusSelected] = useState('All');
  const status = ['All', 'Done', 'Pending'];
  const appointments = [
    {
      id: 1233,
      customer: 'jovani',
      status: 'Urgent',
      msgs: '2',
      date: '02/04',
      time: 'AT 3:00 PM',
      active: true,
      completed: false,
    },
    {
      id: 1234,
      customer: 'elise',
      status: 'Pending',
      msgs: '23',
      date: '05/04',
      time: 'AT 6:00 PM',
      active: true,
      completed: false,
    },
    {
      id: 1235,
      customer: 'test',
      status: 'Canceled',
      msgs: '6',
      date: '09/04',
      time: 'AT 11:00 AM',
      active: false,
      completed: true,
    },
  ];
  const toggleDelete = (isVisible) => {
    setIsDelete(isVisible);
  };
  const toggleEdit = (isVisible) => {
    setIsEdit(isVisible);
  };

  const statusOnclick = (props) => {
    SetStatusSelected(props.status);
    console.log('testing stuff', props.status);
  };
  const Status = (props) => {
    return (
      <a onClick={() => statusOnclick(props)}>
        <div
          className={classNames(
            statusSelected === props.status
              ? 'bg-indigo-100 text-indigo-700 '
              : 'hover:text-indigo-700',
            'py-2 px-8 text-gray-600  hover:bg-indigo-100 rounded-full ml-4 sm:ml-8'
          )}
        >
          <p>{props.status}</p>
        </div>
      </a>
    );
  };
  const IsCheckedOnChange = (props) => {
    console.log('isChecked', isChecked);
    setIsChecked(...isChecked, props.customer);
  };

  return (
    <div>
      <div>
        {/* <div className="flex items-center">
          {status.map((item) => (
            <Status key={item} status={item} />
          ))}
        </div> */}
        <Button>Add Appointment</Button>
      </div>

      {appointments.map((item) => (
        <Table.Row key={item.id}>
          <Table.Cell>Cell</Table.Cell>
        </Table.Row>
      ))}
    </div>
  );
};

export default Bookings;
