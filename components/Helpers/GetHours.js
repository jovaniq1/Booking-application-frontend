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
 * @param  {array} schedule a string from database containing store hours
 * @param  {Date} dateSelected a string from database containing store hours
 * @returns {String} newResult an array of hours
 */
export const getHours = (schedule, dateSelected) => {
  const daysInWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  let splitSchedule = schedule.split(',');
  let selectedDay = splitSchedule[dateSelected.getDay()];
  let timesInBetween = CreateTimeSlots(selectedDay);

  return timesInBetween;
};
function returnTimesInBetween(start, end) {
  start = convertTime12to24(start);
  end = convertTime12to24(end);
  var timesInBetween = [];
  var startH = parseInt(start.split(':')[0]);
  var startM = parseInt(start.split(':')[1]);
  var endH = parseInt(end.split(':')[0]);
  var endM = parseInt(end.split(':')[1]);
  var tempM = ':00';
  var tempH = startH;
  if (startM >= 30) startH++;
  if (startM < 30 && startM > 0) tempM = ':30';
  let getGenTime = (timeString) => {
    let H = +timeString.substr(0, 2);
    let h = H % 12 || 12;
    let ampm = H < 12 ? ' AM' : ' PM';
    return (timeString = h + timeString.substr(2, 3) + ampm);
  };

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
export const CreateTimeSlots = (daySelected) => {
  let StartEndTimes = daySelected.split('-');

  let times = returnTimesInBetween(StartEndTimes[1], StartEndTimes[2]);

  return times;
};
