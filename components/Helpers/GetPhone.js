/**
 * displaying the phone number in store details
 * @param  {string} phoneNum - store phone
 * @returns {string} - phone number format
 */
export const GetPhone = (phoneNum) => {
  if (phoneNum === undefined) {
    return null;
  }
  let result;
  //remove special characters. Phone from kwickpos has no validation and is just get as an input field.
  let phone = phoneNum.replace(/[^0-9 ]/g, '');

  if (phone.length > 9) {
    let first = phone.substring(0, 3);
    let second = phone.substring(3, 6);
    let third = phone.substring(6, 10);
    result = '(' + first + ')-' + second + '-' + third;
  } else {
    let first = phone.substring(0, 3);
    let second = phone.substring(3, 7);
    result = first + '-' + second;
  }

  return result;
};
/**
 * @param  {string} value - contains phone only numbers
 * @returns {string} - phone formatted with dashes for UI
 */
export const AddDashes = (value) => {
  if (value.includes('--')) {
    value = RemoveDashes(value);
  }
  if (value.length >= 10) {
    if (value.substring(3, 4) !== '-' || value.substring(7, 8) !== '-') {
      value = value.replace(/\D[^\.]/g, '');
      return value.slice(0, 3) + '-' + value.slice(3, 6) + '-' + value.slice(6);
    } else if ((value.match(/-/g) || []).length > 2) {
      value = RemoveDashes(value);
      value = value.replace(/\D[^\.]/g, '');
      return value.slice(0, 3) + '-' + value.slice(3, 6) + '-' + value.slice(6);
    } else {
      return value;
    }
  }
  return value;
};
/**
 * Function prepares phone number with no special characters, to be ready to send to the db
 * @param  {string} phoneNum - phone number as a string
 * @returns {string} - phone number with no dashes
 */
export const RemoveDashes = (phoneNum) => {
  let phone = phoneNum.replace(/[^0-9 ]/g, '');
  return phone;
};
