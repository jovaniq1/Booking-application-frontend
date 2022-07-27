import React from 'react';
import { Icon } from 'semantic-ui-react';

export const NotFound = ({ msg, setErrors }) => {
  console.log('err', msg);
  return (
    <div
      className="bg-red-100 border border-red-400 text-red-700 px-4 py-1 rounded relative text-center   grid-flow-col gap-0"
      role="alert"
    >
      <button onClick={() => setErrors([])}>
        <Icon name="x" className="flex-shrink-0 rounded-full" />
      </button>
      <strong className="  font-bold text-center">{msg.message}</strong>
    </div>
  );
};
export const InvalidInput = ({ msg, setErrors }) => {
  console.log('err', msg);
  return (
    <div
      className="bg-red-100 border border-red-400 text-red-700 px-4 py-1 rounded relative text-center   grid-flow-col gap-0"
      role="alert"
    >
      <button onClick={() => setErrors([])}>
        <Icon name="x" className="flex-shrink-0 rounded-full" />
      </button>
      <strong className="  font-bold text-center">{msg.message}</strong>
    </div>
  );
};
export const EncounterError = ({ msg, setErrors }) => {
  console.log('err', msg);
  return (
    <div
      className="bg-red-100 border border-red-400 text-red-700 px-4 py-1 rounded relative text-center   grid-flow-col gap-0"
      role="alert"
    >
      <button onClick={() => setErrors([])}>
        <Icon name="x" className="flex-shrink-0 rounded-full" />
      </button>
      <strong className="  font-bold text-center">{msg.message}</strong>
    </div>
  );
};
