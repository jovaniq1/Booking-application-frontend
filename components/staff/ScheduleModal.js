import 'fomantic-ui-css/semantic.css';
import NumberFormat from 'react-number-format';
import { useState, useContext } from 'react';
import { Modal, Image, Input, Checkbox, Dropdown } from 'semantic-ui-react';
import { Label, Button, Transition } from '@windmill/react-ui';
import { userContext } from '../../context/userContext';
import { BlueButton } from '../Global/button/Button';
import useScheduleInput from '../CustomHooks/use-schedule-input';
const options = [
  { key: 'PM', text: 'PM', value: 'PM' },
  { key: 'AM', text: 'AM', value: 'AM' },
];
//add custom input
const CustomInput = ({ children }) => {
  return (
    <div>
      <input className="text-red-600">{children}</input>;
    </div>
  );
};
const DaySelection = ({
  day,
  onChangeCheck,
  checked,
  onChangInput1,
  value1,
  value2,
  onChangeInput2,
  timeType1,
  timeType2,
}) => {
  return (
    <tr className="bg-white border-b dark:bg-gray-700 dark:text-slate-200 font-bold text-blue-800 dark:border-gray-700">
      <td className="lg:py-4 px-0 lg:px-6">
        <Checkbox
          label={
            <label>
              <span className="dark:text-slate-200 px-0 lg:text-lg text-xs  mx-0 text-blue-900">
                {day}
              </span>
            </label>
          }
          onChange={onChangeCheck}
          checked={checked}
        />
      </td>
      <td className="lg:py-4 px-0 mx-0  lg:px-0 md:px-8 sm:px-8">
        <NumberFormat
          format="##:##"
          customInput={Input}
          fluid
          disabled={!checked}
          onValueChange={onChangInput1}
          size="large"
          label={
            <Dropdown
              defaultValue="AM"
              options={options}
              onChange={timeType1}
            />
          }
          labelPosition="right"
        />
      </td>
      <td className="lg:py-4  px-0 mx-0 lg:px-0 md:px-6 sm:px-6">
        <NumberFormat
          format="##:##"
          fluid
          mask="_"
          customInput={Input}
          disabled={!checked}
          onChange={onChangeInput2}
          value={value2}
          size="large"
          label={
            <Dropdown
              defaultValue="PM"
              options={options}
              onChange={timeType2}
            />
          }
          labelPosition="right"
        />
      </td>
    </tr>
  );
};

const ScheduleModal = ({ isOpen, toggleModal, setErrors, isSelected }) => {
  const userCtx = useContext(userContext);
  const [checked, setChecked] = useState(false);
  const { appointments, toggleCancel } = userCtx;
  const {
    isChecked: mondayIsChecked,
    timeType1: mondayTimeType1,
    timeType2: mondayTimeType2,
    firstValue: mondayFirstValue,
    secondValue: mondaySecondValue,
    isValid: mondayIsValid,
    firstInputChangeHandler: mondayFirstInputChangeHandler,
    secondInputChangeHandler: mondaySecondInputChangeHandler,
    checkBoxChangeHandler: mondayCheckBoxChangeHandler,
    setTime1: mondaySetTime1,
    setTime2: mondaySetTime2,
  } = useScheduleInput();
  const {
    isChecked: sundayIsChecked,
    timeType1: sundayTimeType1,
    timeType2: sundayTimeType2,
    firstValue: sundayFirstValue,
    secondValue: sundaySecondValue,
    isValid: sundayIsValid,
    firstInputChangeHandler: sundayFirstInputChangeHandler,
    secondInputChangeHandler: sundaySecondInputChangeHandler,
    checkBoxChangeHandler: sundayCheckBoxChangeHandler,
    setTime1: sundaySetTime1,
    setTime2: sundaySetTime2,
  } = useScheduleInput();
  const {
    isChecked: saturdayIsChecked,
    timeType1: saturdayTimeType1,
    timeType2: saturdayTimeType2,
    firstValue: saturdayFirstValue,
    secondValue: saturdaySecondValue,
    isValid: saturdayIsValid,
    firstInputChangeHandler: saturdayFirstInputChangeHandler,
    secondInputChangeHandler: saturdaySecondInputChangeHandler,
    checkBoxChangeHandler: saturdayCheckBoxChangeHandler,
    setTime1: saturdaySetTime1,
    setTime2: saturdaySetTime2,
  } = useScheduleInput();
  const {
    isChecked: fridayIsChecked,
    timeType1: fridayTimeType1,
    timeType2: fridayTimeType2,
    firstValue: fridayFirstValue,
    secondValue: fridaySecondValue,
    isValid: fridayIsValid,
    firstInputChangeHandler: fridayFirstInputChangeHandler,
    secondInputChangeHandler: fridaySecondInputChangeHandler,
    checkBoxChangeHandler: fridayCheckBoxChangeHandler,
    setTime1: fridaySetTime1,
    setTime2: fridaySetTime2,
  } = useScheduleInput();
  const {
    isChecked: tuesdayIsChecked,
    timeType1: tuesdayTimeType1,
    timeType2: tuesdayTimeType2,
    firstValue: tuesdayFirstValue,
    secondValue: tuesdaySecondValue,
    isValid: tuesdayIsValid,
    firstInputChangeHandler: tuesdayFirstInputChangeHandler,
    secondInputChangeHandler: tuesdaySecondInputChangeHandler,
    checkBoxChangeHandler: tuesdayCheckBoxChangeHandler,
    setTime1: tuesdaySetTime1,
    setTime2: tuesdaySetTime2,
  } = useScheduleInput();
  const {
    isChecked: thursdayIsChecked,
    timeType1: thursdayTimeType1,
    timeType2: thursdayTimeType2,
    firstValue: thursdayFirstValue,
    secondValue: thursdaySecondValue,
    isValid: thursdayIsValid,
    firstInputChangeHandler: thursdayFirstInputChangeHandler,
    secondInputChangeHandler: thursdaySecondInputChangeHandler,
    checkBoxChangeHandler: thursdayCheckBoxChangeHandler,
    setTime1: thursdaySetTime1,
    setTime2: thursdaySetTime2,
  } = useScheduleInput();

  const {
    isChecked: wednesdayIsChecked,
    timeType1: wednesdayTimeType1,
    timeType2: wednesdayTimeType2,
    firstValue: wednesdayFirstValue,
    secondValue: wednesdaySecondValue,
    isValid: wednesdayIsValid,
    firstInputChangeHandler: wednesdayFirstInputChangeHandler,
    secondInputChangeHandler: wednesdaySecondInputChangeHandler,
    checkBoxChangeHandler: wednesdayCheckBoxChangeHandler,
    setTime1: wednesdaySetTime1,
    setTime2: wednesdaySetTime2,
  } = useScheduleInput();

  const updateAppointment = async () => {
    toggleCancel.bind(null, isSelected._id);
    const updated = await toggleCancel(isSelected._id);
    if (updated?.errors) {
      setErrors(updated?.errors);
    }
    toggleModal(false);
  };

  return (
    <div
      aria-hidden="true"
      className={
        isOpen
          ? 'absolute bg-slate-900 bg-opacity-75 justify-center left-0 top-0 z-40 w-screen h-screen'
          : 'hidden '
      }
    >
      <div className="relative z-50 lg:p-4 w-full m-auto py-24 max-w-2xl h-full md:h-auto">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex p-4 rounded-t border-b dark:border-gray-600">
            <h3 className="text-xl m-auto font-semibold text-gray-900 dark:text-white">
              Edit Schedule
            </h3>
          </div>

          <div className="lg:py-6 lg:px-4">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <tbody>
                <DaySelection
                  day={'Monday'}
                  onChangeCheck={mondayCheckBoxChangeHandler}
                  checked={mondayIsChecked}
                  onChangInput1={mondayFirstInputChangeHandler}
                  onChangeInput2={mondaySecondInputChangeHandler}
                  timeType1={mondaySetTime1}
                  timeType2={mondaySetTime2}
                  value1={mondayFirstValue}
                  value2={mondaySecondValue}
                />
                <DaySelection
                  day={'Tuesday'}
                  onChangeCheck={tuesdayCheckBoxChangeHandler}
                  checked={tuesdayIsChecked}
                  onChangInput1={tuesdayFirstInputChangeHandler}
                  onChangeInput2={tuesdaySecondInputChangeHandler}
                  timeType1={tuesdaySetTime1}
                  timeType2={tuesdaySetTime2}
                  value1={tuesdayFirstValue}
                  value2={tuesdaySecondValue}
                />
                <DaySelection
                  day={'Wednesday'}
                  onChangeCheck={wednesdayCheckBoxChangeHandler}
                  checked={wednesdayIsChecked}
                  onChangInput1={wednesdayFirstInputChangeHandler}
                  onChangeInput2={wednesdaySecondInputChangeHandler}
                  timeType1={wednesdaySetTime1}
                  timeType2={wednesdaySetTime2}
                  value1={wednesdayFirstValue}
                  value2={wednesdaySecondValue}
                />
                <DaySelection
                  day={'Thursday'}
                  onChangeCheck={thursdayCheckBoxChangeHandler}
                  checked={thursdayIsChecked}
                  onChangInput1={thursdayFirstInputChangeHandler}
                  onChangeInput2={thursdaySecondInputChangeHandler}
                  timeType1={thursdaySetTime1}
                  timeType2={thursdaySetTime2}
                  value1={thursdayFirstValue}
                  value2={thursdaySecondValue}
                />
                <DaySelection
                  day={'Friday'}
                  onChangeCheck={fridayCheckBoxChangeHandler}
                  checked={fridayIsChecked}
                  onChangInput1={fridayFirstInputChangeHandler}
                  onChangeInput2={fridaySecondInputChangeHandler}
                  timeType1={fridaySetTime1}
                  timeType2={fridaySetTime2}
                  value1={fridayFirstValue}
                  value2={fridaySecondValue}
                />
                <DaySelection
                  day={'Saturday'}
                  onChangeCheck={saturdayCheckBoxChangeHandler}
                  checked={saturdayIsChecked}
                  onChangInput1={saturdayFirstInputChangeHandler}
                  onChangeInput2={saturdaySecondInputChangeHandler}
                  timeType1={saturdaySetTime1}
                  timeType2={saturdaySetTime2}
                  value1={saturdayFirstValue}
                  value2={saturdaySecondValue}
                />
                <DaySelection
                  day={'Sunday'}
                  onChangeCheck={sundayCheckBoxChangeHandler}
                  checked={sundayIsChecked}
                  onChangInput1={sundayFirstInputChangeHandler}
                  onChangeInput2={sundaySecondInputChangeHandler}
                  timeType1={sundaySetTime1}
                  timeType2={sundaySetTime2}
                  value1={sundayFirstValue}
                  value2={sundaySecondValue}
                />
              </tbody>
            </table>
          </div>

          <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
            <BlueButton title="Cancel" onClick={() => toggleModal(false)} />
            <BlueButton title="Done" onClick={() => toggleModal(false)} />
          </div>
        </div>
      </div>
    </div>

    // <div className="flex justify-end  gap-4 ">

    // </div>
  );
};
export default ScheduleModal;
