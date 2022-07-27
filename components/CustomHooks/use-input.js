import { useState } from 'react';
import { Dropdown } from 'semantic-ui-react';
import { AddDashes } from '../Helpers/GetPhone';
/**
 * This is a custom hook that validates the type of text, if input has been touch and also manages states
 * @param  {string} type - type of text input
 * @returns {object} useInput - custom hook for text inputs that validates, nad manage state
 */

const useInput = (type) => {
  const [enteredValue, setEnteredValue] = useState('');
  const [isTouched, setIsTouched] = useState(false);
  // validation for inputs
  const validateValue = (enteredValue) => {
    if (type === 'email') {
      let isEmail = enteredValue.includes('@') && enteredValue.includes('.com');
      return isEmail;
    } else if (type === 'dropdown') {
      return enteredValue;
    } else if (type === 'phone') {
      return enteredValue.length === 12;
    } else return enteredValue.trim() !== '';
  };
  const valueIsValid = validateValue(enteredValue);
  const hasError = !valueIsValid && isTouched;
  const numRegex = /^[0-9.-]*$/;
  const textRegex = /^[a-zA-Z]+$/;
  // if value is not blank, then test the regex
  const valueChangeHandler = (event) => {
    if (type === 'number') {
      if (event.target.value === '' || numRegex.test(event.target.value)) {
        setEnteredValue(event.target.value);
      }
    } else if (type === 'phone') {
      if (
        event.target.value === '' ||
        (numRegex.test(event.target.value) && event.target.value.length <= 12)
      ) {
        setEnteredValue(AddDashes(event.target.value));
      }
    } else if (type === 'text') {
      if (event.target.value === '' || textRegex.test(event.target.value)) {
        setEnteredValue(event.target.value);
      }
    } else setEnteredValue(value);
  };

  const inputBlurHandler = () => {
    setIsTouched(true);
  };
  const reset = () => {
    setEnteredValue('');
    setIsTouched(false);
  };

  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
