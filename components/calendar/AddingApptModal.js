import 'fomantic-ui-css/semantic.css';
import useInput from '../CustomHooks/use-input';
import Link from 'next/link';
import { Listbox, Transition } from '@headlessui/react';
import React, { useState, useContext, useEffect } from 'react';
import { Label } from '@windmill/react-ui';
import { userContext } from '../../context/userContext';
import { Divider, Modal, Button, Form, Search, Icon } from 'semantic-ui-react';
import { createAppointment, getAppointments } from '../fetching/PostsWithAxios';
import Staff from '../staff/Staff';
import AddStaffModal from '../staff/AddStaffModal';

const AddingApptModal = ({ isOpen, toggleModal, slotInfo }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState([{ firstname: 'test' }]);
  const [isStaffSelected, setIsStaffSelected] = useState({});
  const [isAddModal, setIsAddModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const userCtx = useContext(userContext);
  const { customers, setAppointmentsData, token } = userCtx;

  useEffect(() => {
    var filterData = customers?.filter((item) =>
      item?.firstname
        .toLowerCase()
        .includes(searchTerm?.firstname?.toLowerCase())
    );

    setSearchResults(filterData.slice(0, 3));
  }, [searchTerm]);

  const {
    value: name,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput('text');
  const {
    value: lastName,
    valueChangeHandler: lastNameChangeHandler,
    isValid: enteredLastNameIsValid,
    hasError: lastNameInputHasError,
    inputBlurHandler: lastNameBlurHandler,
    reset: resetLastNameInput,
  } = useInput('text');
  const {
    value: phone,
    isValid: enteredPhoneIsValid,
    hasError: phoneInputHasError,
    valueChangeHandler: phoneChangeHandler,
    inputBlurHandler: phoneBlurHandler,
    reset: resetPhoneInput,
  } = useInput('phone');
  const {
    value: email,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput('email');

  const handleChange = (event) => {
    setIsLoading(true);
    let searchInput = { firstname: event.target.value };
    setSearchTerm(searchInput);
    setIsLoading(false);
  };

  const handleSubmit = async () => {
    const data = {
      customer: searchTerm,
      staff: isStaffSelected,
      status: 'pending',
    };
    if (searchTerm.firstname !== 'test' && isStaffSelected) {
      // creating new appt and saving it in db

      const queryAppt = {
        token,
        graphql: {
          query: `mutation createAppointment( $customer:ID!,$staff:ID!,$status: String!,$start: String!,$end: String!) {
            createAppointment( AppointmentInput:{customer: $customer,staff: $staff,status: $status,start: $start,end: $end}) {
        _id
     }
  }`,
          variables: {
            customer: data.customer._id,
            staff: data.staff._id,
            status: data.status,
            start: slotInfo.start.toString(),
            end: slotInfo.end.toString(),
          },
        },
      };

      const newAppointment = await createAppointment(queryAppt);

      // fetch appointments
      const page = 10;
      const queryAppointments = {
        token,
        graphql: {
          query: `query appointments($page: Int!) {
            appointments(page: $page) {
              appointments {
                _id
                status
                start
                end
                completed
                customer{
                    firstname
                    lastname
                }
                staff{
                    firstname
                    lastname
                }
              }
              totalAppointments
                  }
          }`,
          variables: {
            page,
          },
        },
      };

      const appointmentsData = await getAppointments(queryAppointments);
      if (appointmentsData) {
        let appt = appointmentsData.data.appointments.appointments;

        let newData = appt.map((appointment) => {
          let start = new Date(appointment.start);
          let end = new Date(appointment.end);
          return { ...appointment, start, end };
        });
        setAppointmentsData(newData);
        localStorage.setItem('appointments', JSON.stringify(newData));
      }

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
    <Modal
      onClose={() => {
        if (isOpen) {
          toggleModal(false);
        }
      }}
      open={isOpen}
    >
      <Modal.Header>
        Add Appointment{' '}
        <div className="flex flex-row-reverse">
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
        </div>
      </Modal.Header>
      <Modal.Content>
        <div className=" flex justify-center flex-row place-items-center gap-16">
          <AddStaffModal
            isOpen={isAddModal}
            toggleModal={setIsAddModal}
            user={'New Customer'}
          />
          <Label className="py-4">
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
          <Label className="py-1">
            <Staff handleStaffSelected={handleStaffSelected} />
          </Label>

          <Divider hidden />
        </div>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={handleSubmit}>Submit</Button>
      </Modal.Actions>
    </Modal>
  );
};
export default AddingApptModal;
