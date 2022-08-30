import { useState } from 'react';

/**
 * This is a custom hook that validates the type of text, if input has been touch and also manages states
 * @param  {string} type - type of text input
 * @returns {object} useInput - custom hook for text inputs that validates, nad manage state
 */

const useScheduleInput = () => {
  const [firstEnteredValue, setFirstEnteredValue] = useState();
  const [secondEnteredValue, setSecondEnteredValue] = useState();
  const [timeType1, setTimeType1] = useState('PM');
  const [timeType2, setTimeType2] = useState('PM');
  const [checked, setChecked] = useState(false);

  // if value is not blank, then test the regex
  const firstInputChangeHandler = (values) => {
    const { formattedValue, value } = values;
    setFirstEnteredValue(value);
  };
  const secondInputChangeHandler = (values) => {
    const { formattedValue, value } = values;
    setFirstEnteredValue(value);
  };
  const setTime1 = (e, data) => {
    e.preventDefault();
    setTimeType1(data.value);
  };
  const setTime2 = (e, data) => {
    e.preventDefault();
    setTimeType2(data.value);
  };
  const checkBoxChangeHandler = (e, data) => {
    e.preventDefault();
    setChecked(data.checked);
  };
  const reset = () => {
    setEnteredValue('');
  };

  return {
    isChecked: checked,
    timeType1: timeType1,
    timeType2: timeType2,
    firstValue: firstEnteredValue,
    secondValue: secondEnteredValue,
    firstInputChangeHandler,
    secondInputChangeHandler,
    checkBoxChangeHandler,
    setTime1,
    setTime2,
    reset,
  };
};

export default useScheduleInput;
