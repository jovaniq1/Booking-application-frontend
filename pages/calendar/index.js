import CalendarComponent from '../../components/calendar/Calendar';
import {
  Image,
  Modal,
  Button,
  Header,
  Label,
  Grid,
  Segment,
} from 'semantic-ui-react';
import styles from './calendar.module.css';
import React, { useContext, useState, useEffect } from 'react';
import { userContext } from '../../context/userContext';
import { formatTime, formatDate } from '../../components/Helpers/FormatDate';
import { Calendar } from 'react-calendar';
import CustomCalendar from '../../components/calendar/CustomCalendar';
const CalendarPage = () => {
  const userCtx = useContext(userContext);
  const [TodaysAppt, setTodaysAppt] = useState([]);
  const { setAppointmentsData, appointments } = userCtx;
  useEffect(() => {
    let currentDate = new Date();
    let filterData = appointments?.filter(
      (appt) => formatDate(appt.start) === formatDate(currentDate)
    );
    setTodaysAppt(filterData);
  }, [appointments]);

  function getDaysInCurrentMonth() {
    const date = new Date();
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  }

  const result = getDaysInCurrentMonth();
  console.log('result,', result);
  console.log('Calendar');
  return (
    <div className=" justify-center lg:flex pt-24 mx-8 gap-8">
      <div className=" w-full mx-auto h-fit  text-slate-500 text-center  dark:bg-gray-800 dark:text-gray-400 overflow-hidden bg-white shadow sm:rounded-lg">
        <h4>Today&apos;s Appointments</h4>

        {TodaysAppt.map(
          (appt) =>
            appt.status !== 'cancel' && (
              <li
                key={appt._id}
                className="  dark:bg-blue-700 font-semibold text-center  text-sm  dark:text-gray-200"
              >
                {appt.customer.firstname + ' at ' + formatTime(appt?.start)}
              </li>
            )
        )}
      </div>

      <CalendarComponent />
    </div>
  );
};
export default CalendarPage;
