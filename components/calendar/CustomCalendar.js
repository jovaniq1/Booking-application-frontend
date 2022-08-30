import { Icon } from 'semantic-ui-react';
import React, { useState, useEffect } from 'react';
import {
  convertTime12to24,
  CreateTimeSlots,
  getHours,
} from '../Helpers/GetHours';
const fakeSchedule =
  'Sunday-09:00 AM-06:00 PM,Monday-09:00 AM-06:00 PM,Tuesday-09:00 AM-06:00 PM,Wednesday-09:00 AM-06:00 PM,Thursday-09:00 AM-06:00 PM,Friday-09:00 AM-06:00 PM,Saturday-09:00 AM-06:00 PM';

const CustomCalendar = ({ size, handleSelectSlot }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [timesInBetween, setTimesInBetween] = useState(
    getHours(fakeSchedule, currentDate)
  );

  const morningTimeSlots = timesInBetween.filter((time) => time.includes('AM'));
  const afternoonTimeSlots = timesInBetween.filter((time) =>
    time.includes('PM')
  );

  const actualDate = new Date();
  let month = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const daysAbbr = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const daysInWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  //get amount of days
  function getDaysInCurrentMonth(date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  }
  // divide array
  function sliceIntoChunks(arr, chunkSize, s) {
    const res = [];
    let first = [];
    let end = [];
    for (let i = 0; i < s; i++) {
      first.push(-1);
    }
    const newArr = [...first, ...arr];

    for (let i = 0; i < newArr.length; i += chunkSize) {
      const chunk = newArr.slice(i, i + chunkSize);

      if (chunk.length !== 7) {
        let temp = 7 - chunk.length;

        for (let j = 0; j < temp; j++) {
          end.push(-1);
        }
        res.push([...chunk, ...end]);
      } else res.push(chunk);
    }
    return res;
  }
  // get first day info
  function getFirstDayOfMonth(year, month) {
    return new Date(year, month, 1);
  }
  let splitSchedule = fakeSchedule.split(',');
  const currentYear = currentDate.getFullYear();
  const actualDayAsNum = new Date().getDate();
  const actualMonth = month[new Date().getMonth()];
  const actualYear = new Date().getFullYear();
  const currentMonth = month[currentDate.getMonth()];
  const currentMonthNum = currentDate.getMonth();
  const firstDay =
    daysAbbr[getFirstDayOfMonth(currentYear, currentDate.getMonth()).getDay()];
  const firstDayAsNum = getFirstDayOfMonth(
    currentYear,
    currentDate.getMonth()
  ).getDate();

  let selectedDaySchedule = getHours(fakeSchedule, currentDate);
  console.log('--test--  currentDate', currentDate);
  console.log('--test--  currentDate.getDay', currentDate.getDate());
  const amountOfDaysInMonth = getDaysInCurrentMonth(currentDate);
  const amountOfDaysArray = Array.from(
    { length: amountOfDaysInMonth },
    (item, index) => index
  );
  const arraysOfDays = sliceIntoChunks(
    amountOfDaysArray,
    7,
    getFirstDayOfMonth(currentYear, currentDate.getMonth()).getDay()
  );

  const availableTimes = () => {
    actualDate.getTime();
  };

  return (
    <div className="flex justify-center align-middle flex-col">
      <table
        className={`sm:text-sm h-[34vh] ${size} text-left text-gray-500 dark:text-gray-400 overflow-hidden bg-white shadow sm:rounded-lg`}
      >
        <thead className=" bg-blue-700  text-slate-200 uppercase  dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th colSpan="1">
              <button
                onClick={() =>
                  setCurrentDate(
                    (prev) => new Date(currentYear, prev.getMonth() - 1)
                  )
                }
              >
                <Icon name="chevron circle left" size="large" />
              </button>
            </th>
            <th colSpan="5">
              <div className="text-center">
                {currentMonth + ' ' + currentYear}
              </div>
            </th>
            <th colSpan="1" className="flex flex-row-reverse">
              <button
                onClick={() =>
                  setCurrentDate(
                    (prev) => new Date(currentYear, prev.getMonth() + 1)
                  )
                }
              >
                <Icon name="chevron circle right " size="large" />
              </button>
            </th>
          </tr>
          <tr>
            {daysAbbr.map((day, index) => (
              <th key={index} scope="col" className="py-4 px-4 text-center">
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white ">
          {arraysOfDays.map((daysArray, index) => (
            <tr
              key={index}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              {daysArray.map((num, index) => (
                <td key={index} className="text-center">
                  <div>
                    <div
                      className={
                        new Date(
                          currentYear,
                          currentMonthNum,
                          num + 2
                        ).getTime() >= actualDate.getTime() &&
                        num != -1 &&
                        `border-2 border-blue-600 sm:py-2 sm:mx-1 sm:my-1 hover:border-blue-200  lg:py-1 lg:mx-1 lg:my-1  py-2 px-2  mx-2 my-2 rounded-full ${
                          currentDate.getDate() === num + 1 &&
                          'bg-blue-800 text-white '
                        }`
                      }
                    >
                      <button
                        disabled={
                          new Date(
                            currentYear,
                            currentMonthNum,
                            num + 1
                          ).getTime() <= actualDate.getTime()
                        }
                        onClick={() => {
                          setCurrentDate(
                            new Date(currentYear, currentMonthNum, num + 1)
                          );
                          setTimesInBetween(
                            getHours(
                              fakeSchedule,
                              new Date(currentYear, currentMonthNum, num + 1)
                            )
                          );
                        }}
                      >
                        <span
                          className={
                            actualDayAsNum === num &&
                            actualMonth === currentMonth &&
                            actualYear === currentYear &&
                            ' text-blue-900 underline'
                          }
                        >
                          {num !== -1 && num + 1}
                        </span>
                      </button>
                    </div>
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className=" text-center ">
        <h1>Morning</h1>
        <div className="grid grid-rows-max grid-cols-3  gap-2 w-fit m-auto ">
          {morningTimeSlots.map((time) => (
            <button
              onClick={() => {
                handleSelectSlot(
                  new Date(
                    currentYear,
                    currentMonthNum,
                    currentDate.getDay(),
                    parseInt(convertTime12to24(time))
                  )
                );
              }}
              className="group border-2 hover:border-blue-200 relative flex w-full justify-center rounded-md  border-transparent bg-blue-800 py-1 px-4 text-sm font-medium text-slate-200 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              key={time}
            >
              {time}
            </button>
          ))}
        </div>
        <h1>Afternoon</h1>
        <div className="grid grid-rows-max grid-cols-3  gap-2 w-fit m-auto pb-2 ">
          {afternoonTimeSlots.map((time) => (
            <button
              onClick={() => {
                handleSelectSlot(
                  new Date(
                    currentDate.setHours(
                      parseInt(convertTime12to24(time).split(':')[0]),
                      parseInt(convertTime12to24(time).split(':')[1])
                    )
                  )
                );
              }}
              className=" border-2 hover:border-blue-200 group relative flex w-full justify-center rounded-md  border-transparent bg-blue-800 py-1 px-4 text-sm font-medium text-slate-200 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              key={time}
            >
              {time}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
export default CustomCalendar;
