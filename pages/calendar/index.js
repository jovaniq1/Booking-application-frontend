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
import React, { useContext, useState, useEffect } from 'react';
import { userContext } from '../../context/userContext';
import { formatTime, formatDate } from '../../components/Helpers/FormatDate';
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

  console.log('Calendar');
  return (
    <div className="flex justify-center px-24 py-24">
      <Grid stackable columns={2}>
        <Grid.Column width={3}>
          <Segment>
            <h4>Today&apos;s Appointments</h4>
          </Segment>
          {TodaysAppt.map((appt) => (
            <div key={appt._id}>
              <li className="py-2">
                <Label as="a">
                  {appt.customer.firstname + ' at ' + formatTime(appt?.start)}
                </Label>
              </li>
            </div>
          ))}
        </Grid.Column>
        <Grid.Column width={13}>
          <CalendarComponent />
        </Grid.Column>
      </Grid>
    </div>
  );
};
export default CalendarPage;
