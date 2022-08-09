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
  Button,
  TableFooter,
  Pagination,
} from '@windmill/react-ui';
import { Icon, Loader } from 'semantic-ui-react';
import ConfirmationModal from '../../components/appointment/ConfirmationModal';
import Link from 'next/link';
import AppointmentLayout from '../../components/appointment/ApptListLayout';
import { NotFound, EncounterError } from '../../components/errors/errors';
import Loading from '../../components/loading/Loading';
const BookingsPage = () => {
  const [isAddModal, setIsAddModal] = useState(false);
  const [errors, setErrors] = useState([]);
  const [isSelected, setIsSelected] = useState({});
  const [filter, setFilter] = useState('pending');
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);
  const userCtx = useContext(userContext);
  const { appointments, toggleApprove, user } = userCtx;
  const [filterAppointments, setFilterAppointments] = useState([]);

  useEffect(() => {
    let filterData = appointments?.filter((appt) => appt.status === filter);
    setFilterAppointments(filterData);
  }, [appointments, filterAppointments, filter]);

  const classNames = (...classes) => {
    return classes.filter(Boolean).join(' ');
  };

  return (
    <div className="justify-space">
      <div>
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
      <div className=" text-xl h-16  place-content-center my-24 px-8 mx-8">
        <div className=" focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2pointer-events-auto  flex divide-x float-right rounded-md bg-white  font-medium leading-5 text-slate-700 shadow-sm ring-1 ring-slate-700/10">
          <button
            onClick={() => setFilter('pending')}
            className=" py-2 px-4 hover:bg-slate-50 hover:text-slate-900 "
          >
            Pending
          </button>
          <button
            onClick={() => setFilter('approve')}
            className="py-2 px-4 hover:bg-slate-50 hover:text-slate-900"
          >
            Approve
          </button>
          <button
            onClick={() => setFilter('cancel')}
            className="py-2 px-4 hover:bg-slate-50 hover:text-slate-900"
          >
            Canceled
          </button>
        </div>
        <TableContainer>
          <Table>
            <TableHeader>
              <TableRow className="text-lg items-center">
                <TableCell>#</TableCell>
                <TableCell>Client</TableCell>
                <TableCell>Status</TableCell>

                <TableCell>Date</TableCell>
                <TableCell>Start</TableCell>

                <TableCell>Staff</TableCell>
                <TableCell>Service</TableCell>
                <TableCell>Cost</TableCell>

                <TableCell></TableCell>

                <TableCell></TableCell>

                <TableCell>
                  <div className="flex justify-end">
                    <Button
                      onClick={() => {
                        Router.push({
                          pathname: '/calendar',
                          query: { isUpdate: false, _id: null },
                        });
                      }}
                      className=" text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2  "
                    >
                      Add Appointment
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            </TableHeader>
            {filterAppointments.map((item, index) => {
              return (
                <TableBody key={item._id} className=" items-center ">
                  <TableRow>
                    <TableCell>
                      <span className="text-lg">{index + 1}</span>
                    </TableCell>
                    <TableCell>
                      <span className="font-semibold text-lg ">
                        {item.customer.firstname}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-lg">{item.status}</span>
                    </TableCell>

                    <TableCell>
                      <span className="text-lg">{formatDate(item?.start)}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-lg">{formatTime(item?.start)}</span>
                    </TableCell>

                    <TableCell>
                      <span className="text-lg">{item.staff.firstname}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-lg">
                        {item.service.serviceName}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-lg">
                        {'$' + item.service.cost + '.00'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <button
                        disabled={item.status === 'cancel'}
                        onClick={() => {
                          Router.push({
                            pathname: '/calendar',
                            query: { isUpdate: true, _id: item._id },
                          });
                        }}
                        className={classNames(
                          item.status === 'cancel'
                            ? 'bg-gray-300 text-gray-500  '
                            : 'text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br  ',
                          ' focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'
                        )}
                      >
                        Edit
                      </button>
                    </TableCell>
                    <TableCell>
                      <button
                        disabled={item.status === 'cancel'}
                        onClick={() => {
                          setIsAddModal(true);
                          forceUpdate();
                          setIsSelected(item);
                        }}
                        className={classNames(
                          item.status === 'cancel'
                            ? 'bg-gray-300 text-gray-500  '
                            : 'focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 shadow-lg shadow-pink-500/50 dark:shadow-lg dark:shadow-pink-800/80 ',
                          'font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br '
                        )}
                      >
                        Cancel
                      </button>
                    </TableCell>
                    {user.role !== 'customer' && item.status === 'pending' && (
                      <TableCell>
                        <button
                          disabled={item.status === 'approve'}
                          onClick={toggleApprove.bind(null, item._id)}
                          className={
                            ' text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'
                          }
                        >
                          Approve
                        </button>
                      </TableCell>
                    )}
                  </TableRow>
                </TableBody>
              );
            })}
          </Table>
        </TableContainer>
        <TableFooter>
          <Pagination
            totalResults={10}
            resultsPerPage={4}
            onChange={() => {}}
            label="Table navigation"
          />
        </TableFooter>
        <ConfirmationModal
          isOpen={isAddModal}
          isSelected={isSelected}
          toggleModal={setIsAddModal}
          setErrors={setErrors}
        />
      </div>
    </div>
  );
};
export default BookingsPage;
