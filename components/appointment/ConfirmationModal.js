import 'fomantic-ui-css/semantic.css';
import { useState, useContext } from 'react';
import { Modal, Image } from 'semantic-ui-react';
import { Label, Button } from '@windmill/react-ui';
import { userContext } from '../../context/userContext';

const ConfirmationModal = ({ isOpen, toggleModal, setErrors, isSelected }) => {
  const userCtx = useContext(userContext);
  const { appointments, toggleCancel } = userCtx;

  const updateAppointment = async () => {
    toggleCancel.bind(null, isSelected._id);
    const updated = await toggleCancel(isSelected._id);
    console.log('=========== updated', updated);
    if (updated?.errors) {
      setErrors(updated?.errors);
    }
    toggleModal(false);
  };
  console.log('isselected ', isSelected);

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
            onClick={updateAppointment}
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
