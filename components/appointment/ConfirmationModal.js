import 'fomantic-ui-css/semantic.css';
import { useState, useContext } from 'react';
import { Modal, Image } from 'semantic-ui-react';
import { Label, Button } from '@windmill/react-ui';
import { userContext } from '../../context/userContext';
import { BlueButton } from '../Global/button/Button';

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
          <BlueButton
            onClick={() => {
              if (isOpen) {
                toggleModal(false);
              }
            }}
            title="Cancel"
          />

          <BlueButton onClick={updateAppointment} title="Submit" />
        </div>
      </Modal.Content>
    </Modal>
  );
};
export default ConfirmationModal;
