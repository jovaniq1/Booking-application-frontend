import 'fomantic-ui-css/semantic.css';
import useInput from '../CustomHooks/use-input';
import Link from 'next/link';
import { Listbox, Transition } from '@headlessui/react';
import React, { useState, useContext, useEffect } from 'react';
import { Label, Button } from '@windmill/react-ui';
import { userContext } from '../../context/userContext';
import { Divider, Modal, Form, Search, Icon } from 'semantic-ui-react';
import { createAppointment } from '../fetching/PostsWithAxios';
import Staff from '../staff/Staff';
import SignUpForm from '../Auth/SignUp';
import { BlueButton } from '../Global/button/Button';

const AddStaffModal = ({ isOpen, toggleModal, user }) => {
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  return (
    <div
      aria-hidden="true"
      className={
        isOpen
          ? 'absolute bg-slate-900 bg-opacity-75 justify-center left-0 top-0 z-40 w-screen  h-screen'
          : 'hidden '
      }
    >
      <div className="relative z-50 p-4 w-full m-auto py-24 max-w-2xl h-full md:h-auto">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex p-4 rounded-t border-b dark:border-gray-600">
            <h3 className="text-xl m-auto font-semibold text-gray-900 dark:text-white">
              {!user ? 'New Staff' : user}
            </h3>
          </div>

          <div className="py-6 px-4">
            <div className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <SignUpForm user={user} />
            </div>
          </div>

          <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
            <BlueButton title="Cancel" onClick={() => toggleModal(false)} />
            <BlueButton title="Done" onClick={() => toggleModal(false)} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddStaffModal;
