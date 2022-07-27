import {
  createContext,
  useState,
  useMemo,
  useEffect,
  useCallback,
} from 'react';
import { updateAppointment } from '../components/fetching/PostsWithAxios';
export const userContext = createContext({
  company: {},
  appointmentsData: [],
  isSignIn: false,
  appointments: [],
  customers: [],
  staff: [],
  token: '',
  toggleCancel: (id) => {},
  setAppointmentsData: (data) => {},
  setStaffData: (data) => {},
  setCustomerData: (data) => {},
  setUserIsSignIn: (data) => {},
});

const UserContextProvider = ({ children }) => {
  const [isSignIn, setIsSignIn] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [staff, setStaff] = useState([]);
  const [token, setToken] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const appointments = localStorage.getItem('appointments');
    const customers = localStorage.getItem('customers');
    const staff = localStorage.getItem('staff');

    let isToken, isAppointments, isCustomers, isStaff;

    if (!token !== 'undefined') {
      isToken = JSON.parse(token);
      setToken(isToken);
    }
    if (!staff !== 'undefined') {
      isStaff = JSON.parse(staff);
      setStaff(isStaff);
    }
    if (!customers) {
      isCustomers = JSON.parse(customers);
      setCustomers(isCustomers);
    }
    if (!appointments) {
      console.log('test');
      isAppointments = JSON.parse(appointments);
      let newData = isAppointments.map((appointment) => {
        let start = new Date(appointment.start);
        let end = new Date(appointment.end);
        return { ...appointment, start, end };
      });
      setAppointments(newData);
    }

    if (isToken) {
      setIsSignIn(true);
    }
  }, []);
  const forceUpdate = useCallback(() => updateState({}), []);

  const setUserIsSignIn = (data) => {
    setIsSignIn(data);
  };
  const setAppointmentsData = (data) => {
    setAppointments(data);
  };
  const setCustomerData = (data) => {
    setCustomers(data);
  };
  const setStaffData = (data) => {
    setStaff(data);
  };
  const toggleCancel = useCallback(
    async (id) => {
      let appointment = appointments.find((appt) => appt._id === id);
      let index = appointments.findIndex((appt) => appt._id === id);
      appointments[index] = {
        ...appointment,
        status: 'cancel',
        completed: true,
      };

      let status = 'cancel';
      const queryAppt = {
        token,
        graphql: {
          query: `mutation updateAppointment($appointmentId: ID!, $status: String!) {
            updateAppointment(id: $appointmentId, AppointmentInput:{status: $status}) {
              status
           }
        }`,
          variables: {
            appointmentId: id,
            status,
          },
        },
      };
      const isUpdated = await updateAppointment(queryAppt);
      if (isUpdated?.errors) {
        return isUpdated;
      }
      localStorage.setItem('appointments', JSON.stringify(appointments));
      return isUpdated;
    },
    [appointments]
  );

  const value = useMemo(
    () => ({
      setUserIsSignIn,
      setAppointmentsData,
      toggleCancel,
      setCustomerData,
      setStaffData,
      appointments,
      customers,
      staff,
      isSignIn,
      token,
    }),
    [isSignIn, token, appointments, customers, staff]
  );

  return <userContext.Provider value={value}>{children}</userContext.Provider>;
};

export default UserContextProvider;
