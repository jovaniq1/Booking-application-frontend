import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import React, { useCallback, useState, useContext, useEffect } from 'react';
import AddingApptModal from './AddingApptModal';
import { appointmentsData } from '../../pages/appointments';
import { createAppointment } from '../fetching/PostsWithAxios';
import { userContext } from '../../context/userContext';
import { useRouter } from 'next/router';

const localizer = momentLocalizer(moment);

const CalendarComponent = () => {
  const [isAddModal, setIsAddModal] = useState(false);
  const [isSlotInfo, setIsSlotInfo] = useState({});
  const userCtx = useContext(userContext);
  const { setAppointmentsData, appointments } = userCtx;
  const router = useRouter();
  const isUpdate = router?.query?.isUpdate ? router?.query?.isUpdate : false;
  const data = router.query;

  // useEffect(() => {
  //   console.log('router?.query?.isUpdate ', router?.query?.isUpdate);
  //   alert(router?.query); // Alerts 'Someone'
  // }, [router?.query]);

  const handleSelectSlot = useCallback(
    async (slotInfo) => {
      setIsSlotInfo(slotInfo);
      toggleAddAppt(true);
    },
    [setAppointmentsData]
  );

  const handleSelectEvent = useCallback(
    (event) => window.alert(event.title),
    []
  );

  const toggleAddAppt = (data) => {
    setIsAddModal(data);
  };

  console.log('Calendar appointments', appointments);
  let formattedAppointment = appointments.map((appointment) => {
    if (appointment.status !== 'cancel') {
      let startTemp = appointment.start.toISOString();
      let endTemp = appointment.end.toISOString();
      let start = new Date(startTemp);
      let end = new Date(endTemp);
      let title =
        appointment?.customer?.firstname +
        ' ' +
        appointment?.customer?.lastname;
      return { ...appointment, start, end, title };
    }
  });

  return (
    <div>
      <AddingApptModal
        isOpen={isAddModal}
        toggleModal={toggleAddAppt}
        slotInfo={isSlotInfo}
        data={data}
      />
      <Calendar
        titleAccessor="title"
        localizer={localizer}
        events={formattedAppointment}
        defaultDate={new Date()}
        defaultView="month"
        style={{ height: '75em', width: '75em' }}
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
        selectable
      />
    </div>
  );
};

export default CalendarComponent;
