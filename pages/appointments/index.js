import Bookings from '../../components/appointment/Bookings';
import React, { useContext, useState } from 'react';
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
const BookingsPage = () => {
  const [isChecked, setIsChecked] = useState([]);
  const [isCanceled, setIsCanceled] = useState(false);
  const [isAddModal, setIsAddModal] = useState(false);
  const [errors, setErrors] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [statusSelected, SetStatusSelected] = useState('All');
  const status = ['All', 'Done', 'Pending'];
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  const userCtx = useContext(userContext);
  const { appointments, toggleCancel } = userCtx;

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
        <TableContainer>
          <Table>
            <TableHeader>
              <TableRow className="text-lg items-center">
                <TableCell>Client</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Start</TableCell>
                <TableCell>End</TableCell>
                <TableCell>Staff</TableCell>
                <TableCell></TableCell>

                <TableCell>
                  <div className="flex justify-end">
                    <Button
                      onClick={() => {
                        Router.push('/calendar');
                      }}
                      className=" text-white bg-blue-500 hover:bg-blue-500 "
                    >
                      Add Appointment
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            </TableHeader>
            {appointments.map((item) => {
              return (
                <TableBody key={item._id} className=" items-center ">
                  <TableRow>
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
                      <span className="text-lg">{formatTime(item?.end)}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-lg">{item.staff.firstname}</span>
                    </TableCell>
                    <TableCell>
                      <button
                        onClick={toggleCancel.bind(null, item._id)}
                        className=" bg-blue-100 hover:bg-blue-300  text-lg   px-2 rounded focus:outline-none"
                      >
                        Edit
                      </button>
                    </TableCell>
                    <TableCell>
                      <Button
                        disabled={item.status === 'cancel'}
                        onClick={() => {
                          setIsAddModal(true);
                        }}
                        className={classNames(
                          item.status === 'cancel'
                            ? 'bg-gray-300 text-gray-500  '
                            : 'bg-red-100 hover:bg-red-200 text-red-500  ',
                          ' text-lg   px-2 rounded focus:outline-none'
                        )}
                      >
                        Cancel
                      </Button>
                      <ConfirmationModal
                        isOpen={isAddModal}
                        toggleModal={setIsAddModal}
                        action={toggleCancel.bind(null, item._id)}
                        setErrors={setErrors}
                      />
                    </TableCell>
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
      </div>
    </div>
  );
};
export default BookingsPage;
