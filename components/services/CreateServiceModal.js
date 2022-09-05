import 'fomantic-ui-css/semantic.css';
import React, { useState, useContext, useEffect } from 'react';
import { Button } from '@windmill/react-ui';
import { Modal } from 'semantic-ui-react';

import CreateService from './CreateService';
import { BlueButton } from '../Global/button/Button';
//New Service
const CreateServiceModal = ({ isOpen, toggleModal }) => {
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
              New Service
            </h3>
          </div>

          <div className="py-6 px-4">
            <div className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <CreateService />
            </div>
          </div>

          <div className="flex justify-end p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
            <BlueButton title="Cancel" onClick={() => toggleModal(false)} />
            <BlueButton title="Done" onClick={() => toggleModal(false)} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreateServiceModal;
