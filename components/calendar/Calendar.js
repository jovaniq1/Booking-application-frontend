import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import React, { useCallback, useState, useContext, useEffect } from 'react';
import AddingApptModal from './AddingApptModal';
import { appointmentsData } from '../../pages/appointments';
import { createAppointment } from '../fetching/PostsWithAxios';
import { userContext } from '../../context/userContext';

const localizer = momentLocalizer(moment);

const CalendarComponent = () => {
  const [isAddModal, setIsAddModal] = useState(false);

  const [isSlotInfo, setIsSlotInfo] = useState({});

  const userCtx = useContext(userContext);
  const { setAppointmentsData, appointments } = userCtx;

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

  console.log('Calendar');

  return (
    <div>
      <AddingApptModal
        isOpen={isAddModal}
        toggleModal={toggleAddAppt}
        slotInfo={isSlotInfo}
      />
      <Calendar
        titleAccessor="status"
        localizer={localizer}
        events={appointments}
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
