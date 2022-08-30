import { useEffect, useContext, useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import { userContext } from '../../context/userContext';
import { useRouter } from 'next/router';
import Loading from '../../components/loading/Loading';
import styles from './website.module.css';
import {
  TableContainer,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  TableFooter,
  Button,
  Badge,
  Avatar,
} from '@windmill/react-ui';
import Selection from '../../components/animation/Selection';
import { GreenButton } from '../../components/Global/button/Button';
import CustomCalendar from '../../components/calendar/CustomCalendar';
import CalendarComponent from '../../components/calendar/Calendar';
const WebsiteInfo = () => {
  const router = useRouter();
  const userCtx = useContext(userContext);
  const { setGetWebsiteData, staff, services } = userCtx;
  const [value, onChange] = useState(new Date());
  const { id } = router.query;
  console.log('value', value);

  useEffect(() => {
    if (id) setGetWebsiteData(id);
  }, [id]);

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-slate-100 to-slate-400 mx-4">
      {!!id ? (
        <div>
          <div className="grid grid-flow-row auto-rows-max py-20 gap-4 ">
            <div className="col-span-4 my-12  flex flex-col md:flex-row sm:flex-col px-2">
              <div className="row-span-3">
                <div
                  className="col-start-1 row-start-1 h-7 text-base font-semibold leading-7 text-sky-500"
                  aria-hidden="true"
                >
                  By Company Name
                </div>
                <h1 className=" text-4xl font-extrabold tracking-tight text-slate-900 sm:text-7xl ">
                  Bookings to Organize and Manage your Business
                </h1>
                <p className=" text-slate-700">
                  Beautifully designed, expertly crafted components and
                  templates, built by the makers of Tailwind CSS. The perfect
                  starting point for your next project.
                </p>
                <div className="col-span-6 my-48 w-10/12 overflow-hidden bg-white shadow sm:rounded-lg ">
                  <Selection staff={staff} services={services} />
                </div>
              </div>

              <div className="col-span-2 mx-auto my-9">
                <CalendarComponent />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};
export default WebsiteInfo;
