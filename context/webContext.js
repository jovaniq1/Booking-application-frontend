import { createContext, useState, useMemo } from 'react';

export const webContext = createContext({
  company: {},
  services: [],
  // staff: '',
  // eslint-disable-next-line no-unused-vars
  setWebData: (data) => {},
});

const WebContextProvider = ({ children }) => {
  const [company, setCompany] = useState();
  const [services, setServices] = useState([]);
  const [staff, setStaff] = useState([]);

  const getWebData = (data) => {
    setServices([...data.services]);
    setStaff([...data.staff]);
    setCompany(data);
  };

  // const getWebName = (data) => {
  //   setName(data);
  // };

  const value = useMemo(
    () => ({ company, services, staff, getWebData }),
    [company, services, staff, getWebData]
  );

  return <webContext.Provider value={value}>{children}</webContext.Provider>;
};

export default WebContextProvider;
