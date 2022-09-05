import Bookings from '../../components/appointment/Bookings';
import React, { useContext, useState, useCallback, useEffect } from 'react';
import useInput from '../../components/CustomHooks/use-input';
import { userContext } from '../../context/userContext';
import { formatTime, formatDate } from '../../components/Helpers/FormatDate';
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import Router from 'next/router';
import {
  TableContainer,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  Avatar,
  TableFooter,
  Pagination,
} from '@windmill/react-ui';
import { Icon, Loader, Label } from 'semantic-ui-react';
import ConfirmationModal from '../../components/appointment/ConfirmationModal';
import Link from 'next/link';
import AppointmentLayout from '../../components/appointment/ApptListLayout';
import { NotFound, EncounterError } from '../../components/errors/errors';
import Loading from '../../components/loading/Loading';
import {
  BlueButton,
  WhiteButton,
  RedButton,
  GreenButton,
} from '../../components/Global/button/Button';
import DropDownFilter from '../../components/appointment/DropDownFilter';
import DropDownEdit from '../../components/appointment/DropDownEdit';
import AppointmentDetailsModal from '../../components/appointment/AppointmentDetailsModal';

const BookingsPage = () => {
  const [isAddModal, setIsAddModal] = useState(false);
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isView, setIsView] = useState(false);
  const [isSelected, setIsSelected] = useState({});
  const [filter, setFilter] = useState('approve');
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);
  const userCtx = useContext(userContext);
  const { appointments, toggleApprove, user, fetchAppointments } = userCtx;
  const [filterAppointments, setFilterAppointments] = useState([]);

  const fetchAppointmentsData = async () => {
    await fetchAppointments();
    setIsLoading(false);
  };

  let pendingCount = appointments?.filter((appt) => appt.status === 'pending');

  useEffect(() => {
    setIsLoading(true);
    fetchAppointmentsData();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (appointments) {
      setIsLoading(true);
      let filterData = appointments?.filter((appt) => {
        return appt.status === filter;
      });

      setFilterAppointments(filterData);
      setIsLoading(false);
    }
  }, [filter, appointments]);

  const classNames = (...classes) => {
    return classes.filter(Boolean).join(' ');
  };
  const AppointmentsTable = () => {
    return (
      <table className="table-auto w-full text-sm   text-gray-500 dark:text-gray-400">
        <thead className=" bg-blue-700 text-xs text-slate-200 uppercase  dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="lg:py-3 py-2 px-0 mx-0 lg:px-6">
              Client
            </th>

            <th scope="col" className="lg:py-3 px-0 mx-0 lg:px-6">
              Status
            </th>
            <th scope="col" className="lg:py-3 px-0 mx-0 lg:px-6">
              Date
            </th>
            <th scope="col" className="lg:py-3 px-0 mx-0 lg:px-6">
              Time
            </th>

            <th scope="col" className="lg:py-3 px-0 lg:mx-0 lg:px-6">
              <div className="flex-row focus:outline-none lg:space-x-4 py-0 my-0  text-sm lg:px-5 lg:py-2.5 text-center lg:mr-2 mb-2pointer-events-auto  flex  float-right rounded-md   font-medium leading-5 text-slate-200 shadow-sm ring-1 ring-slate-700/10">
                {pendingCount.length > 0 && (
                  <Label
                    className="px-0 h-fit w-fit flex align-baseline"
                    color="red"
                    circular
                  >
                    {pendingCount.length}
                  </Label>
                )}
                <DropDownFilter setFilter={setFilter} />
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {filterAppointments.map((appointment, index) => (
            <tr
              key={appointment._id}
              className={
                appointment.status === 'cancel'
                  ? '    dark:text-blue-400 text-blue-400 border-2 border-blue-300 backdrop-blur-lg bg-white/60 dark:bg-black/60'
                  : ' bg-white border-b dark:bg-gray-800 dark:border-gray-700  '
              }
            >
              <td className="lg:py-4 lg:px-6">
                {appointment.customer.firstname}
              </td>
              <td className="lg:py-4 lg:px-6">{appointment.status}</td>
              <td className="lg:py-4 lg:px-6">
                {' '}
                {formatDate(appointment?.start)}
              </td>
              <td className="lg:py-4 lg:px-6">
                {' '}
                {formatTime(appointment?.start)}
              </td>

              <td className="lg:py-4 lg:px-6 ">
                {' '}
                <div className="flex lg:space-x-6 gap-2 justify-center">
                  <BlueButton
                    title={isView ? 'Hide' : 'View'}
                    onClick={() => {
                      setIsView(!isView);
                      setIsSelected(appointment);
                    }}
                  />
                  {appointment.status !== 'cancel' && (
                    <Menu as="div" className="relative inline-block text-left">
                      <div>
                        <Menu.Button className=" rounded-md dark:bg-slate-200 dark:text-slate-200  opacity-3 sm:py-1 sm:px-3  shadow-lg hover:shadow-blue-800/50 hover:scale-105 bg-blue-800 before:bg-inherit bg-gradient-to-r from-blue-900 to-blue-800   border-0 text-center transition-all touch-auto text-slate-100 cursor-pointer inline-block font-normal font-sans text-sm px-3 py-2">
                          {user.role !== 'customer' &&
                          appointment.status === 'pending'
                            ? 'Approve'
                            : 'Edit'}
                          <Icon className="flex pl-2" name="arrow down" />
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
                            {user.role !== 'customer' &&
                              appointment.status === 'pending' && (
                                <Menu.Item>
                                  {({ active }) => (
                                    <button
                                      onClick={toggleApprove.bind(
                                        null,
                                        appointment._id
                                      )}
                                      className={classNames(
                                        active
                                          ? 'bg-gray-100 text-gray-900'
                                          : 'text-gray-700',
                                        'block px-4 py-2 text-sm'
                                      )}
                                    >
                                      Approved
                                    </button>
                                  )}
                                </Menu.Item>
                              )}
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  onClick={() => {
                                    Router.push({
                                      pathname: '/calendar',
                                      query: {
                                        isUpdate: true,
                                        _id: appointment._id,
                                      },
                                    });
                                  }}
                                  className={classNames(
                                    active
                                      ? 'bg-gray-100 text-gray-900'
                                      : 'text-gray-700',
                                    'block px-4 py-2 text-sm'
                                  )}
                                >
                                  Modify
                                </button>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  onClick={() => {
                                    setIsAddModal(true);
                                    forceUpdate();
                                    setIsSelected(appointment);
                                  }}
                                  className={classNames(
                                    active
                                      ? 'bg-gray-100 text-gray-900'
                                      : 'text-gray-700',
                                    'block px-4 py-2 text-sm'
                                  )}
                                >
                                  Cancel
                                </button>
                              )}
                            </Menu.Item>
                          </div>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  )}
                </div>
              </td>
            </tr>
          ))}
          {isView && (
            <table>
              <tbody>
                <tr>
                  <td className="lg:py-4 lg:px-6">
                    {isSelected.staff.firstname}
                  </td>
                  <td className="lg:py-4 lg:px-6">
                    {isSelected.service.serviceName}
                  </td>
                  <td className="lg:py-4 lg:px-6">
                    {'$' + isSelected.service.cost + ' USD'}
                  </td>
                </tr>
              </tbody>
            </table>
          )}
        </tbody>
      </table>
    );
  };

  return (
    <div className=" pt-24 px-1 lg:px-32 md:px-32 sm:px-32">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="">
          <div className="">
            {errors
              ? errors.map((err) => (
                  <EncounterError
                    className="pt-6"
                    key={err}
                    msg={err}
                    setErrors={setErrors}
                  />
                ))
              : null}{' '}
          </div>
          <div className=" ">
            <ConfirmationModal
              isOpen={isAddModal}
              isSelected={isSelected}
              toggleModal={setIsAddModal}
              setErrors={setErrors}
            />

            <div className="justify-center">
              <div className="flex justify-end ">
                <BlueButton
                  onClick={() => {
                    Router.push({
                      pathname: '/calendar',
                      query: { isUpdate: false, _id: null },
                    });
                  }}
                  title={'Add Appointment'}
                />
              </div>
              {isView && (
                <AppointmentDetailsModal
                  isOpen={isView}
                  toggleModal={setIsView}
                  appointment={isSelected}
                />
              )}
              <AppointmentsTable />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default BookingsPage;
