import React, { useState, useCallback } from 'react';
import firebase from 'firebase/app';
import { Alert, Icon, Input, InputGroup } from 'rsuite';
import { useParams } from 'react-router-dom';
import { useProfile } from '../../../context/profile.context';
import { database } from '../../../misc/firebase';

const ChatBottom = () => {
  const [input, setInput] = useState('');
  const { profile } = useProfile();
  const { chatId } = useParams();

  const onChangeInput = useCallback(value => {
    setInput(value);
  }, []);

  const onSendClick = async () => {
    if (input) {
      const chatRef = database.ref('messages');
      const messageId = chatRef.push().key;
      const newChat = {
        author: {
          ...(profile.avatar ? { avatar: profile.avatar } : {}),
          createdAt: profile.createdAt,
          name: profile.name,
          uid: profile.uid,
        },
        createdAt: firebase.database.ServerValue.TIMESTAMP,
        roomId: chatId,
        text: input,
      };

      try {
        await chatRef.child(messageId).update(newChat);
      } catch (error) {
        Alert.error(error.message, 4000);
      }
    }
  };

  return (
    <div>
      <InputGroup>
        <Input
          placeholder="Write a new message here..."
          value={input}
          onChange={onChangeInput}
        />
        <InputGroup.Button
          color="blue"
          appearance="primary"
          onClick={onSendClick}
        >
          <Icon icon="send" />
        </InputGroup.Button>
      </InputGroup>
    </div>
  );
};

export default ChatBottom;
