import { formatDate, formatTime } from '../../Helpers/FormatDate';
import { BlueButton, GreenButton, WhiteButton } from '../button/Button';
import React, { useState } from 'react';
import ScheduleModal from '../../staff/ScheduleModal';

export const StaffTable = ({ data, onClick }) => {
  const [isStaffEdit, setIsStaffEdit] = useState(false);
  const [errors, setErrors] = useState([]);
  const [isSelected, setIsSelected] = useState([]);
  return (
    <table className="w-full text-sm text-left text-slate-900 dark:text-gray-400 ">
      <thead className=" bg-blue-700 text-xs text-slate-200 uppercase  dark:bg-gray-700 dark:text-gray-400">
        {isStaffEdit && (
          <ScheduleModal
            isOpen={isStaffEdit}
            toggleModal={setIsStaffEdit}
            setErrors={setErrors}
            isSelected={isSelected}
          />
        )}
        <tr>
          <th scope="col" className="lg:py-3 py-2 lg:px-6">
            Staff
          </th>
          <th scope="col" className="lg:py-3 lg:px-6">
            Email
          </th>
          <th scope="col" className="lg:py-3 lg:px-6">
            Phone
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((staff) => (
          <tr
            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            key={staff._id}
          >
            <td scope="row" className="lg:py-4 lg:px-6">
              {staff.firstname} {staff.lastname}
            </td>
            <td className="lg:py-4 lg:px-6 ">{staff.email}</td>

            <td className="  flex  ">
              <div className="m-auto">{staff.phone}</div>
              <div className="m-auto">
                <BlueButton
                  title="Edit"
                  onClick={() => {
                    setIsStaffEdit(true);
                    setIsSelected(staff);
                  }}
                />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export const CustomersTable = ({ data }) => {
  const [isCustomerEdit, setIsCustomerEdit] = useState(false);
  const [errors, setErrors] = useState([]);
  const [isSelected, setIsSelected] = useState([]);
  return (
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
      <thead className=" bg-blue-700 text-xs text-slate-200 uppercase  dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="lg:py-3 py-2 lg:px-6">
            Customer
          </th>
          <th scope="col" className="lg:py-3 lg:px-6">
            Email
          </th>
          <th scope="col" className="lg:py-3 lg:px-6">
            Phone
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((customer) => (
          <tr
            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 "
            key={customer._id}
          >
            <td scope="row" className=" py-2 first-line:lg:py-4 lg:px-6">
              {customer.firstname} {customer.lastname}
            </td>
            <td className="lg:py-4 lg:px-6">{customer.email}</td>
            <td className="  flex  ">
              <div className="m-auto">{customer.phone}</div>
              {/* <div className="m-auto">
                <BlueButton
                  title="Edit"
                  onClick={() => {
                    setIsCustomerEdit(true);
                    setIsSelected(customer);
                  }}
                />
              </div> */}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export const ServicesTable = ({ data }) => {
  const [isServiceEdit, setIsServiceEdit] = useState(true);
  const [errors, setErrors] = useState([]);
  const [isSelected, setIsSelected] = useState([]);
  return (
    <table className="w-full text-sm text-left text-slate-900 dark:text-gray-400">
      <thead className=" bg-blue-700 text-xs text-slate-200 uppercase  dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="lg:py-3  py-2 px-6">
            Name
          </th>
          <th scope="col" className="lg:py-3 px-6">
            Description
          </th>
          <th scope="col" className="lg:py-3 px-6">
            Duration
          </th>
          <th scope="col" className="flex">
            Cost
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((service) => (
          <tr
            key={service._id}
            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
          >
            <td className="lg:py-4 py-2 lg:px-6">{service.serviceName}</td>
            <td className="lg:py-4 lg:px-6">{service.description}</td>
            <td className="lg:py-4 lg:px-6">{service.duration + ' Minutes'}</td>
            <td className="flex">
              <div className="m-auto">{'$' + service.cost + ' USD'}</div>
              <div className="m-auto">
                <BlueButton title="Edit" />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
