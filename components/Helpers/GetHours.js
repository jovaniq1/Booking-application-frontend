// everything related with time is here
// Need to account for stores that open and close multiple times during the day

/**
 * switches to 24hr, for DB format
 * @param  {string} time12hrs an hour in 12 hrs
 * @returns {string} string converted to 24 hrs
 */
export const convertTime12to24 = (time12hrs) => {
  const [time, modifier] = time12hrs.split(' ');

  let [hours, minutes] = time.split(':');

  if (hours === '12') {
    hours = '00';
  }

  if (modifier === 'PM') {
    hours = parseInt(hours, 10) + 12;
  }

  return `${hours}:${minutes}`;
};
/**
 * Funtion gets hours as an array
 * @param  {string} data a string from database containing store hours
 * @returns {array} newResult an array of hours
 */
export const GetHours = (data) => {
  let newdata = data.replace(/[\[\]"/'/:]+/g, '');

  var result = newdata.split(',');

  let newResult = result.map((hour) => {
    if (hour.length === 3) {
      return '0' + hour;
    }
    return hour;
  });

  if (newResult.includes(undefined)) {
    return undefined;
  }

  return newResult;
};
/**
 * checks if hours are undefined
 *
 * @param  {array} hours - an array of hours
 * @returns {boolean} - returns if true or false if undefined or no hours
 */
const HoursUndefined = (hours) => {
  if (hours.length < 1) {
    return true;
  }
  const schedule = getSchedule(hours);
  var noTime = schedule.includes(undefined);
  return noTime;
};

/**
 * Function gets available reservation hours
 * @param  {string} selectedDate  - time selected by the user
 * @param  {array} hours -  array of all the hours
 * @param  {string} serverTime  - current time of the pi server mysql
 * @returns {array}  - array of available hours by the store to reserve
 */
export const getReservationHours = (selectedDate, hours, serverTime) => {
  const noHours = HoursUndefined(hours);
  if (noHours === true) {
    return undefined;
  }

  if (hours === null || hours === undefined || hours === '') {
    return undefined;
  }
  let getGenTime = (timeString) => {
    let H = +timeString.substr(0, 2);
    let h = H % 12 || 12;
    let ampm = H < 12 ? ' AM' : ' PM';
    return (timeString = h + timeString.substr(2, 3) + ampm);
  };
  /**
   * gets hours 30mins from open and closed of the day for available times of reservation
   * @param  {string} start
   * @param  {string} end
   * @returns {array} array of available times for reservation during the day
   */
  function returnTimesInBetween(start, end) {
    // console.log("start ", start, " end", end);
    var timesInBetween = [];
    var startH = parseInt(start.split(':')[0]);
    var startM = parseInt(start.split(':')[1]);
    var endH = parseInt(end.split(':')[0]);
    var endM = parseInt(end.split(':')[1]);
    var tempM = ':00';
    var tempH = startH;
    if (startM >= 30) startH++;
    if (startM < 30 && startM > 0) tempM = ':30';
    //console.log("startM:", startM);

    for (var i = startH; i < endH; i++) {
      if (tempH === i && startM !== 0) {
        timesInBetween.push(i < 10 ? '0' + i + tempM : i + tempM);
      } else {
        timesInBetween.push(i < 10 ? '0' + i + ':00' : i + ':00');
        timesInBetween.push(i < 10 ? '0' + i + ':30' : i + ':30');
      }
    }
    timesInBetween.push(endH + ':00');
    if (endM === 30) timesInBetween.push(endH + ':30');

    return timesInBetween.map(getGenTime);
  }

  selectedDate = selectedDate + '';
  var day = selectedDate.substring(0, 3);

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const schedule = days.map((item, index) => {
    if (hours[index * 2] === '0' && hours[index * 2 + 1] === '0') {
      return item + '0';
    }

    let num1 = hours[index * 2].substr(0, 2);
    let num2 = hours[index * 2].substr(2, 4);
    let num3 = hours[index * 2 + 1].substr(0, 2);
    let num4 = hours[index * 2 + 1].substr(2, 4);
    index++;

    return item + num1 + ':' + num2 + num3 + ':' + num4;
  });

  var filterData = schedule?.filter((item) => item.includes(day));
  var selectedTime = filterData[0];

  if (selectedTime.length === 4) {
    return ['No Time Available'];
  }
  // need to add
  serverTime = serverTime.replace(/\s/g, 'T');
  var currentTime = new Date(serverTime);
  var UserSelectedTime = new Date(selectedDate);

  var UserSelectedDate = UserSelectedTime.getDate();
  var UserSelectedMonth = UserSelectedTime.getMonth();
  //var UserSelectedHours = UserSelectedTime.getHours();

  var currentDate = currentTime.getDate();
  var currentMonth = currentTime.getMonth();
  var CurrentHours = currentTime.getHours();
  var currentMinutes = currentTime.getMinutes();

  UserSelectedTime = UserSelectedTime + '';
  currentTime = currentTime + '';

  let startTime;
  if (UserSelectedDate === currentDate && UserSelectedMonth === currentMonth) {
    if (CurrentHours > selectedTime.substring(3, 5)) {
      startTime = CurrentHours + ':' + currentMinutes;
      //console.log("---startTime:", startTime);
    } else {
      startTime = selectedTime.substring(3, 7);
    }

    if (CurrentHours > selectedTime.substring(8, 10)) {
      return ['No Time Available'];
    }
  } else {
    startTime = selectedTime.substring(3, 8);
  }
  let endTime = selectedTime.substring(8, 13);

  const checkSchedule = getSchedule(hours);
  let noTime = checkSchedule.includes(undefined);
  if (noTime) {
    return ['No Time Available'];
  }
  // pops last element in the array element
  let timesArray = returnTimesInBetween(startTime, endTime);
  timesArray.pop();
  return timesArray;
};
/**
 * Function converts 24hr to 12hr
 * @param  {string} time - time in 24hr format
 * @returns {string} - 12hr time format
 */
export const ChangeTo12hour = (time) => {
  time = '' + time;
  var hour = time.toString().substring(0, 2);
  let minutes = time.toString().substring(2, 4);
  if (hour.substring(0, 1) === '0') {
    hour = hour.substring(1);
  }
  if (hour === '' || minutes === '') {
    return undefined;
  }

  var dd = 'AM';
  if (hour >= 12) {
    hour = hour - 12;
    dd = 'PM';
  }
  if (hour === 0) {
    hour = 12;
  }

  var replacement = hour + ':' + minutes;
  replacement += ' ' + dd;

  return replacement;
};
/**
 * Function helps format the stores hours
 * @param  {array} hours- hours of store in 24hrs format
 * @returns {array} - array of store hours schedule
 */
const getSchedule = (hours) => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const schedule = days.map((item, index) => {
    // console.log("hours?.hours[index * 2]:",hours?.hours[index * 2]);

    var num1 = hours[index * 2];

    var num2 = hours[index * 2 + 1];

    if (num1 === undefined || num2 === undefined) {
      return undefined;
    } else if (num1 === '0' && num2 === '0') {
      return item + ': Closed';
    } else {
      return item + ': ' + ChangeTo12hour(num1) + ' - ' + ChangeTo12hour(num2);
    }
  });
  // move sunday to the back( push first element to the back)
  schedule.push(schedule.shift());
  return schedule;
};
/**
 * helps display
 * @param  {array} hours - this function helps display the available times for reservations
 * @returns {array} array of times or jsx with no time available
 */
export const DisplayHours = ({ hours }) => {
  const schedule = getSchedule(hours);

  let noTime = schedule.includes(null);

  const Show = () => {
    return schedule.map((time) => <p key={time}>{time}</p>);
  };
  return <div>{noTime ? <h2>No Time Available</h2> : <Show />}</div>;
};
