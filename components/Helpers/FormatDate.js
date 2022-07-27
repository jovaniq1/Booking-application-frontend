/**
 * This function helps format the store hours to 12 hours
 * @param  {string} date string of the date
 * @returns {string} string with 12hr date
 */
export const formatDate = (date) => {
  let result;
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  let month = months[date.getMonth()];
  let day = date.getDate();
  result = month + ', ' + day;

  return result;
};
export const formatTime = (date) => {
  let result;

  let hour = date.getHours() % 12 || 12;
  let ampm = date.getHours() >= 12 ? 'pm' : 'am';
  let minutes = date.getMinutes() === 0 ? '00' : date.getMinutes();

  result = hour + ':' + minutes + ampm;

  return result;
};
