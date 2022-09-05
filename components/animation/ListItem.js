import { Icon } from 'semantic-ui-react';

export default function ListItem({
  data,
  type,
  staffSelected,
  serviceSelected,
}) {
  let isServiceSelected = false;
  let isStaffSelected = false;

  return (
    <a
      className="flex bg-white text-blue-900 items-start space-x-6 p-6 dark:bg-gray-700 dark:text-gray-400 hover:bg-blue-800 hover:text-white"
      onClick={
        type === 'Staff'
          ? () => staffSelected(data)
          : () => serviceSelected(data)
      }
    >
      <Icon
        name={type === 'Staff' ? 'user' : 'shop'}
        size="big"
        className="flex-none "
      />
      <div className="min-w-0 relative flex-auto ">
        <h2 className="text-lg flex flex-row font-semibold  hover:text-white">
          {type === 'Staff'
            ? `${data.firstname} ${data.lastname}`
            : data.serviceName}
        </h2>
        <dl className="mt-2 flex flex-wrap text-sm leading-6 font-medium">
          <div className="absolute top-0 right-0 flex items-center space-x-1">
            <dd> {type === 'Service' && '$' + data.cost + ' USD'}</dd>
          </div>
          <div>
            <dt className="sr-only">Type</dt>
            <dd className="px-1.5 ring-1 ring-slate-200 rounded">{type}</dd>
          </div>

          <div>
            <dt className="sr-only">Duration</dt>
            <dd className="flex items-center">
              <svg
                width="2"
                height="2"
                fill="currentColor"
                className="mx-2 text-slate-300"
                aria-hidden="true"
              >
                <circle cx="1" cy="1" r="1" />
              </svg>
              {type === 'Service' ? 'Duration' : 'Phone'}
            </dd>
          </div>
          <div>
            <dt className="sr-only">
              {' '}
              {type === 'Service' ? data.duration : data.phone}
            </dt>
            <dd className="flex items-center">
              <svg
                width="2"
                height="2"
                fill="currentColor"
                className="mx-2 text-slate-300"
                aria-hidden="true"
              >
                <circle cx="1" cy="1" r="1" />
              </svg>
              {type === 'Service' ? data.duration + 'Mins' : '+1 ' + data.phone}
            </dd>
          </div>
        </dl>
        <div className="flex-none w-full mt-2 font-normal">
          <dt className="sr-only">Description</dt>
          <dd className="text-slate-400">
            {type === 'Staff' ? null : data.description}
          </dd>
        </div>
      </div>
    </a>
  );
}
