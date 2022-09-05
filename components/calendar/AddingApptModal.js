import 'fomantic-ui-css/semantic.css';
import useInput from '../CustomHooks/use-input';
import Link from 'next/link';
import { Listbox, Transition } from '@headlessui/react';
import React, { useState, useContext, useEffect } from 'react';
import { Label } from '@windmill/react-ui';
import { userContext } from '../../context/userContext';
import { Divider, Modal, Button, Form, Search, Icon } from 'semantic-ui-react';
import {
  createAppointment,
  getAppointments,
  updateAppointment,
} from '../fetching/PostsWithAxios';
import Staff from '../staff/Staff';
import AddStaffModal from '../staff/AddStaffModal';
import DropDownService from '../Global/Dropdown';
import { BlueButton } from '../Global/button/Button';

const AddingApptModal = ({ isOpen, toggleModal, slotInfo, data }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState([{ firstname: 'test' }]);
  const [isStaffSelected, setIsStaffSelected] = useState({});
  const [isServiceSelected, setIsServiceSelected] = useState({});
  const [isAddModal, setIsAddModal] = useState(false);
  // const [IsUpdate, setIsUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const userCtx = useContext(userContext);
  const { customers, fetchAppointments, token, website, user } = userCtx;

  let isCustomers;
  if (!customers) {
    isCustomers = localStorage.getItem('customers');
  } else {
    isCustomers = customers;
  }
  console.log('isCustomers', isCustomers);
  useEffect(() => {
    if (user.role !== 'customer') {
      var filterData = isCustomers?.filter((item) =>
        item?.firstname
          .toLowerCase()
          .includes(searchTerm?.firstname?.toLowerCase())
      );

      setSearchResults(filterData.slice(0, 3));
    }
  }, [searchTerm]);

  // useEffect(() => {
  //   setIsUpdate(data.isUpdate);
  // }, []);

  const handleChange = (event) => {
    setIsLoading(true);
    let searchInput = { firstname: event.target.value };
    setSearchTerm(searchInput);
    setIsLoading(false);
  };

  const handleSubmit = async () => {
    const info = {
      customer: searchTerm,
      staff: isStaffSelected,
      service: isServiceSelected,
      status: 'pending',
    };
    console.log('---info', info);
    if (searchTerm.firstname !== 'test' && isStaffSelected) {
      // creating new appt and saving it in db

      let query =
        data.isUpdate === 'true'
          ? `mutation updateAppointment($appointmentId: ID!, $customer:ID!,$staff:ID!, $service:ID!, $status: String!,$start: String!,$end: String!,$website: ID!) {
    updateAppointment(id: $appointmentId, AppointmentInput:{customer: $customer,staff: $staff, service: $service, status: $status,start: $start,end: $end,website: $website}) {
      _id
      
   }
}`
          : `mutation createAppointment( $customer:ID!,$staff:ID!, $service:ID!, $status: String!,$start: String!,$end: String!,$website: ID!) {
  createAppointment( AppointmentInput:{customer: $customer,staff: $staff, service: $service, status: $status,start: $start,end: $end,website: $website}) {
  _id
  }
  }`;

      let isToken = token;
      if (!token) {
        isToken = JSON.parse(localStorage.getItem('token'));
      }

      console.log('slotInfo', info.service);
      const queryAppt = {
        token: isToken,
        graphql: {
          query: query,
          variables: {
            appointmentId: data?._id,
            website: website._id,
            customer: user.role === 'customer' ? user._id : info.customer._id,
            staff: user.role === 'staff' ? user._id : info.staff._id,
            service: info.service._id,
            status: info.status,
            start: slotInfo.toString(),
            end: slotInfo.toString(),
          },
        },
      };

      if (data?.isUpdate == 'true') {
        const isUpdated = await updateAppointment(queryAppt);
      } else {
        const newAppointment = await createAppointment(queryAppt);
      }

      // fetch appointments
      await fetchAppointments();

      toggleModal(false);
    }
  };
  const handleStaffSelected = (staff) => {
    setIsStaffSelected(staff);
  };

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  const resultRenderer = (props) => {
    return (
      <div
        onClick={() => setSearchTerm(props)}
        className={classNames(
          searchTerm.firstname === props.firstname
            ? 'text-white bg-indigo-600'
            : 'hover:bg-indigo-600 hover:text-white  hover:ring-indigo-500 hover:border-indigo-500 ',
          'relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 sm:text-sm '
        )}
      >
        <div className="flex items-center">
          <Icon
            size="large"
            name="user circle"
            className="flex-shrink-0 rounded-full"
          />

          <span className="font-normal ml-3 block truncate">
            {props.firstname} {props.lastname}
          </span>
          {searchTerm.firstname === props.firstname ? (
            <span className="text-white  absolute inset-y-0 right-0 flex items-center pr-4">
              <Icon name="check" className="h-5 w-5" aria-hidden="true" />
            </span>
          ) : null}
        </div>
      </div>
    );
  };

  return (
    <div
      className={
        isOpen
          ? 'fixed bg-slate-900 bg-opacity-75 justify-center left-0 top-0 z-40 w-screen h-screen'
          : 'hidden '
      }
    >
      <div className="relative z-50 p-4 w-full m-auto py-24 max-w-2xl h-full md:h-auto">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex p-4 rounded-t border-b dark:border-gray-600">
            <h3 className="text-xl m-auto font-semibold text-gray-900 dark:text-white">
              Add Appointment
            </h3>
          </div>

          <div className="py-6 px-4">
            <div className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              {/* <div className="flex flex-row-reverse">
                <Button
                  basic
                  onClick={() => {
                    setIsAddModal(true);
                  }}
                  color="blue"
                  icon="user"
                  label={{
                    as: 'a',
                    basic: true,
                    color: 'blue',
                    pointing: 'left',
                    content: 'New Customer',
                  }}
                />
              </div> */}

              <div className=" flex justify-center flex-col lg:flex-row place-items-center gap-12">
                <Label className="py-2">
                  <DropDownService
                    setIsServiceSelected={setIsServiceSelected}
                  />
                </Label>

                {user.role === 'staff' ? null : (
                  <AddStaffModal
                    isOpen={isAddModal}
                    toggleModal={setIsAddModal}
                    user={'New Customer'}
                  />
                )}
                {user.role === 'customer' ? null : (
                  <Label className="py-2">
                    <span>Find Customer</span>
                    <Search
                      fluid
                      loading={isLoading}
                      onSearchChange={handleChange}
                      results={searchResults}
                      value={searchTerm?.firstname}
                      resultRenderer={resultRenderer}
                      placeholder="Customer name"
                    />
                  </Label>
                )}

                {user.role === 'staff' ? null : (
                  <Label className="py-1">
                    <Staff handleStaffSelected={handleStaffSelected} />
                  </Label>
                )}

                <Divider hidden />
              </div>
            </div>
          </div>

          <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
            <BlueButton title="Cancel" onClick={() => toggleModal(false)} />

            <BlueButton title="Submit" onClick={handleSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddingApptModal;
