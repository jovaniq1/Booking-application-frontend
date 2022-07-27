import 'fomantic-ui-css/semantic.css';
import { useState } from 'react';
import { Image, Modal, Button, Header } from 'semantic-ui-react';

const EditBooking = ({ isOpen, toggleModal, props }) => {
  console.log('-------props', props);
  return (
    <Modal
      onClose={() => {
        if (isOpen) {
          toggleModal(false);
        }
      }}
      open={isOpen}
    >
      <Modal.Header>Edit Appointment</Modal.Header>
      <Modal.Content image>
        <Image size="medium" src="/images/avatar/large/rachel.png" wrapped />
        <Modal.Description>
          <Header>Name: {props.customer}</Header>
          <p>key: {props.key}</p>
          <p>Time: {props.time}</p>
          <p> Date: {props.date}</p>
          <p> Status: {props.status}</p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={() => toggleModal(false)}>
          Nope
        </Button>
        <Button
          content="Yep, that's me"
          labelPosition="right"
          icon="checkmark"
          onClick={() => toggleModal(false)}
          positive
        />
      </Modal.Actions>
    </Modal>
  );
};
export default EditBooking;
