import { BlueButton } from '../Global/button/Button';
import { formatDate, formatTime } from '../Helpers/FormatDate';

const Rows = ({ name, val }) => {
  return (
    <div>
      <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt className="text-sm font-medium text-gray-500">{name}</dt>
        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
          {val}
        </dd>
      </div>
    </div>
  );
};

const AppointmentDetailsModal = ({ isOpen, toggleModal, appointment }) => {
  return (
    <div
      aria-hidden="true"
      className={
        isOpen
          ? 'fixed bg-slate-900 bg-opacity-75 justify-center left-0 top-0 z-40 w-screen h-screen'
          : 'hidden '
      }
    >
      <div className="relative z-50 p-4 m-auto py-24 align-middle  max-w-2xl justify-center  md:h-auto">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex p-4 rounded-t border-b dark:border-gray-600">
            <h3 className="text-xl m-auto font-semibold text-gray-900 dark:text-white">
              Appointment Details
            </h3>
          </div>

          <div className="py-6 px-4">
            <div className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <Rows name="Customer" val={appointment?.customer?.firstname} />
              <Rows name="Status" val={appointment?.status} />
              <Rows name="Date " val={formatDate(appointment?.start)} />
              <Rows name="Time" val={formatTime(appointment?.start)} />
              <Rows name="Staff" val={appointment?.staff.firstname} />
              <Rows name="Service" val={appointment.service.serviceName} />
              <Rows
                name="Service Cost"
                val={'$' + appointment.service.cost + ' USD'}
              />
            </div>
          </div>

          <div className="flex justify-end p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
            <BlueButton title="Done" onClick={() => toggleModal(false)} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default AppointmentDetailsModal;
