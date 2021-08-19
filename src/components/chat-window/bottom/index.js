import React, { useState, useCallback } from 'react';
import firebase from 'firebase/app';
import { Alert, Icon, Input, InputGroup } from 'rsuite';
import { useParams } from 'react-router-dom';
import { useProfile } from '../../../context/profile.context';
import { database } from '../../../misc/firebase';

const ChatBottom = () => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { profile } = useProfile();
  const { chatId } = useParams();

  const onChangeInput = useCallback(value => {
    setInput(value);
  }, []);

  const onSendClick = async () => {
    setIsLoading(true);
    if (input) {
      const chatRef = database.ref('messages');
      const roomsRef = database.ref('rooms');
      const messageId = chatRef.push().key;
      const newChat = {
        roomId: chatId,
        author: {
          ...(profile.avatar ? { avatar: profile.avatar } : {}),
          createdAt: profile.createdAt,
          name: profile.name,
          uid: profile.uid,
        },
        createdAt: firebase.database.ServerValue.TIMESTAMP,
        likeCount: 0,
        text: input,
      };

      try {
        // save for chat
        await chatRef.child(messageId).update(newChat);
        // save for lastMessage
        await roomsRef
          .child(chatId)
          .child('lastMessage')
          .update({ ...newChat, roomId: chatId });
        setInput('');
        setIsLoading(false);
      } catch (error) {
        setInput('');
        setIsLoading(false);
        Alert.error(error.message, 4000);
      }
    }
  };

  const onKeyDownHandler = event => {
    if (event.keyCode === 13) {
      event.preventDefault();
      onSendClick();
    }
  };

  return (
    <div style={{ paddingTop: '7px', paddingBottom: '7px' }}>
      <InputGroup>
        <Input
          placeholder="Write a new message here..."
          value={input}
          onChange={onChangeInput}
          onKeyDown={onKeyDownHandler}
        />
        <InputGroup.Button
          color="blue"
          appearance="primary"
          onClick={onSendClick}
          disabled={isLoading}
        >
          <Icon icon="send" />
        </InputGroup.Button>
      </InputGroup>
    </div>
  );
};

export default ChatBottom;
