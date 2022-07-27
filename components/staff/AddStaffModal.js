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

const AddStaffModal = ({ isOpen, toggleModal, user }) => {
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  return (
    <Modal
      onClose={() => {
        if (isOpen) {
          toggleModal(false);
        }
      }}
      open={isOpen}
    >
      <Modal.Header className="text-center">
        {!user ? 'Add New Staff' : user}
      </Modal.Header>
      <Modal.Content>
        <SignUpForm user={user} />
      </Modal.Content>
      <Modal.Actions>
        <div className="gap-12 px-4 space-x-4">
          <Button
            onClick={() => {
              if (isOpen) {
                toggleModal(false);
              }
            }}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              if (isOpen) {
                toggleModal(false);
              }
            }}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </Button>
        </div>
      </Modal.Actions>
    </Modal>
  );
};
export default AddStaffModal;
