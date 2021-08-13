import React, { useState, useCallback } from 'react';
import firebase from 'firebase/app';
import { Icon, Input, InputGroup } from 'rsuite';
import { useProfile } from '../../../context/profile.context';
import { database } from '../../../misc/firebase';
import { useRooms } from '../../../context/rooms.context';
import { useParams } from 'react-router-dom';

const ChatBottom = () => {
  const [input, setInput] = useState('');
  const { profile } = useProfile();
  const { chatId } = useParams();
  const rooms = useRooms();

  const onChangeInput = useCallback(value => {
    setInput(value);
  }, []);

  const onSendClick = () => {
    if (input) {
      const chatRef = database.ref('messages');
      const messageId = chatRef.push().key;
      const newChat = {
        roomId: chatId,
        author: {
          name: profile.name,
          uid: profile.uid,
          createdAt: profile.createdAt,
          ...(profile.avatar ? { avatar: profile.avatar } : {}),
        },
        createdAt: firebase.database.ServerValue.TIMESTAMP,
        text: input,
      };
      chatRef.child(chatKey).update(newChat);
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
