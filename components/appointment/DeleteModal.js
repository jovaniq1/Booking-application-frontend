import 'fomantic-ui-css/semantic.css';
import { useState } from 'react';
import { Image, Modal, Button } from 'semantic-ui-react';

const DeleteModal = ({ isOpen, toggleModal }) => {
  const openModal = () => {
    setOpen(true);
  };

  return (
    <Modal
      basic
      dimmer="blurring"
      onClose={() => {
        if (isOpen) {
          toggleModal(false);
        }
      }}
      open={isOpen}
    >
      <Modal.Header>Use Google's location service?</Modal.Header>
      <Modal.Content>
        Let Google help apps determine location. This means sending anonymous
        location data to Google, even when no apps are running.
      </Modal.Content>
      <Modal.Actions>
        <Button negative onClick={() => dispatch({ type: 'CLOSE_MODAL' })}>
          Disagree
        </Button>
        <Button positive onClick={() => dispatch({ type: 'CLOSE_MODAL' })}>
          Agree
        </Button>
      </Modal.Actions>
    </Modal>
  );
};
export default DeleteModal;
