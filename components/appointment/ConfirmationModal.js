import 'fomantic-ui-css/semantic.css';
import { useState } from 'react';
import { Modal, Image } from 'semantic-ui-react';
import { Label, Button } from '@windmill/react-ui';

const ConfirmationModal = ({ isOpen, toggleModal, action, setErrors }) => {
  const updateAppointment = async () => {
    const updated = await action();
    console.log('===========was updated', updated);
    if (updated?.errors) {
      setErrors(updated?.errors);
    }
  };
  return (
    <Modal
      size="small"
      onClose={() => {
        if (isOpen) {
          toggleModal(false);
        }
      }}
      open={isOpen}
    >
      <Modal.Header className="text-center">Confirmation</Modal.Header>
      <Modal.Content>
        <div className="flex justify-center gap-24 ">
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
                updateAppointment();
                toggleModal(false);
              }
            }}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </Button>
        </div>
      </Modal.Content>
    </Modal>
  );
};
export default ConfirmationModal;
