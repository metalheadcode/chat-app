import React, { useState } from 'react';
import {
  Button,
  ControlLabel,
  Form,
  FormControl,
  FormGroup,
  Icon,
  Modal,
} from 'rsuite';
import { useModalState } from '../misc/custom-hooks';

//sambung esok kat sini buat schema model

const initialForm = {
  name: null,
  description: null,
};

const CreateRoomBtnModal = () => {
  const { isOpen, open, close } = useModalState();

  const [formValue, setFormValue] = useState(initialState);

  const [isLoading, setIsLoading] = useState(false);

  const onFormChange = value => {
    setFormValue(value);
  };

  return (
    <div className="mt-1">
      <Button block color="green" onClick={open}>
        <Icon icon="creative" /> Create New Chat Room
      </Button>

      <Modal show={isOpen} onHide={close}>
        <Modal.Header>
          <Modal.Title>New Chat Room</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form fluid onChange={onFormChange} formValue={formValue}>
            <FormGroup>
              <ControlLabel>Room Name</ControlLabel>
              <FormControl name="name" placeholder="Enter chat room name ..." />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Description</ControlLabel>
              <FormControl
                componentClass="textarea"
                rows={5}
                name="name"
                placeholder="Enter description about this chat room ..."
              />
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button block appearance="primary">
            Create New Chat Room
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CreateRoomBtnModal;
