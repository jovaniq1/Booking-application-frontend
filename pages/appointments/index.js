import Bookings from '../../components/appointment/Bookings';
import React, { useContext, useState, useCallback, useEffect } from 'react';
import useInput from '../../components/CustomHooks/use-input';
import { userContext } from '../../context/userContext';
import { formatTime, formatDate } from '../../components/Helpers/FormatDate';
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
const BookingsPage = () => {
  const [isAddModal, setIsAddModal] = useState(false);
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
      let filterData = appointments?.filter((appt) => appt.status === filter);

      setFilterAppointments(filterData);
      setIsLoading(false);
    }
  }, [filter, appointments]);

  const classNames = (...classes) => {
    return classes.filter(Boolean).join(' ');
  };
  const AppointmentsTable = () => {
    return (
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className=" bg-blue-700 text-xs text-slate-200 uppercase  dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="lg:py-3 px-0 mx-0 lg:px-6">
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
            <th scope="col" className="lg:py-3 px-0 mx-0 lg:px-6">
              Staff
            </th>
            <th scope="col" className="lg:py-3 px-0 mx-0 lg:px-6">
              Service
            </th>
            <th scope="col" className="lg:py-3 px-0 mx-0 lg:px-6">
              Cost
            </th>
            <th scope="col" className="lg:py-3 px-0 mx-0 lg:px-6">
              <div className=" focus:outline-none space-x-4  text-sm lg:px-5 lg:py-2.5 text-center lg:mr-2 mb-2pointer-events-auto  flex divide-x float-right rounded-md bg-blue-800  font-medium leading-5 text-slate-200 shadow-sm ring-1 ring-slate-700/10">
                {pendingCount.length > 0 && (
                  <Label color="red" circular>
                    {pendingCount.length}
                  </Label>
                )}
                <WhiteButton
                  onClick={() => setFilter('pending')}
                  title={'Pending'}
                />
                <WhiteButton
                  onClick={() => setFilter('approve')}
                  title={'Approve'}
                />
                <WhiteButton
                  onClick={() => setFilter('cancel')}
                  title={'Canceled'}
                />
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
              <td className="lg:py-4 lg:px-6">{appointment.staff.firstname}</td>
              <td className="lg:py-4 lg:px-6">
                {appointment.service.serviceName}
              </td>
              <td className="lg:py-4 lg:px-6">
                {'$' + appointment.service.cost + ' USD'}
              </td>
              <td className="py-4 px-6 ">
                {' '}
                <div className="flex space-x-6 justify-center">
                  <GreenButton
                    disabled={appointment.status === 'cancel'}
                    onClick={() => {
                      Router.push({
                        pathname: '/calendar',
                        query: { isUpdate: true, _id: appointment._id },
                      });
                    }}
                    title={'Modify'}
                  />

                  <GreenButton
                    disabled={appointment.status === 'cancel'}
                    onClick={() => {
                      setIsAddModal(true);
                      forceUpdate();
                      setIsSelected(appointment);
                    }}
                    title={'Cancel'}
                  />
                  {user.role !== 'customer' &&
                    appointment.status === 'pending' && (
                      <GreenButton
                        disabled={appointment.status === 'approve'}
                        onClick={toggleApprove.bind(null, appointment._id)}
                        title={'Approve'}
                      />
                    )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="grid grid-cols-6 gap-2  px-8 mx-8">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="col-span-6 my-12">
          <div className="col-span-6 my-12">
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
          <div className=" col-span-6 ">
            <div className="flex justify-end py-0 my-0">
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
            <ConfirmationModal
              isOpen={isAddModal}
              isSelected={isSelected}
              toggleModal={setIsAddModal}
              setErrors={setErrors}
            />

            <div className="col-span-6 my-0">
              <AppointmentsTable />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default BookingsPage;
