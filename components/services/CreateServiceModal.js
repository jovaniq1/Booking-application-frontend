import 'fomantic-ui-css/semantic.css';
import React, { useState, useContext, useEffect } from 'react';
import { Button } from '@windmill/react-ui';
import { Modal } from 'semantic-ui-react';

import CreateService from './CreateService';

const CreateServiceModal = ({ isOpen, toggleModal }) => {
  return (
    <Modal
      onClose={() => {
        if (isOpen) {
          toggleModal(false);
        }
      }}
      open={isOpen}
    >
      <Modal.Header className="text-center">Add New Service</Modal.Header>
      <Modal.Content>
        <CreateService />
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
export default CreateServiceModal;
