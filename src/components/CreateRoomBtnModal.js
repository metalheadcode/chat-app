import React, { useCallback, useRef, useState } from 'react';
import firebase from 'firebase';
import {
  Alert,
  Button,
  ControlLabel,
  Form,
  FormControl,
  FormGroup,
  Icon,
  Modal,
  Schema,
} from 'rsuite';
import { useModalState } from '../misc/custom-hooks';
import { database } from '../misc/firebase';

const { StringType } = Schema.Types;
const model = Schema.Model({
  name: StringType().isRequired('Chat name is required'),
  description: StringType().isRequired('Description name is required'),
});

const initialForm = {
  name: '',
  description: '',
};

const CreateRoomBtnModal = () => {
  const { isOpen, open, close } = useModalState();
  const [formValue, setFormValue] = useState(initialForm);
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef();

  const onFormChange = useCallback(value => {
    setFormValue(value);
  }, []);

  // console.log(formRef.current.check());

  const onSubmit = async () => {
    if (formRef.current.check()) {
      setIsLoading(true);

      const newRoomData = {
        ...formValue,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
      };

      try {
        await database.ref('rooms').push(newRoomData);
        Alert.info(`${formValue.name} was created`, 4000);
        setFormValue(initialForm);
        setIsLoading(false);
        close();
      } catch (error) {
        setIsLoading(false);
        Alert.error(error.message, 4000);
      }
    }
  };

  return (
    <div className="mt-1">
      <Button block color="green" onClick={open} disabled={isLoading}>
        <Icon icon="creative" /> Create New Chat Room
      </Button>

      <Modal show={isOpen} onHide={close}>
        <Modal.Header>
          <Modal.Title>New Chat Room</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            fluid
            onChange={onFormChange}
            formValue={formValue}
            model={model}
            ref={formRef}
          >
            <FormGroup>
              <ControlLabel>Room Name</ControlLabel>
              <FormControl name="name" placeholder="Enter chat room name ..." />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Description</ControlLabel>
              <FormControl
                name="description"
                componentClass="textarea"
                rows={5}
                placeholder="Enter description about this chat room ..."
              />
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            block
            appearance="primary"
            onClick={onSubmit}
            disabled={isLoading}
          >
            Create New Chat Room
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CreateRoomBtnModal;
