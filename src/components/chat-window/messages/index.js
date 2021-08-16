import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { database } from '../../../misc/firebase';
import { transformToArrayWithIdTwo } from '../../../misc/helpers';
import MessageItem from './MessageItem';

const Messages = () => {
  const { chatId } = useParams();
  const [messages, setMessages] = useState(null);

  const isChatEmpty = messages && messages.length === 0;
  const isShowMessage = messages && messages.length > 0;

  useEffect(() => {
    const messageRef = database
      .ref('messages')
      .orderByChild('roomId')
      .equalTo(chatId);

    messageRef.on('value', snap => {
      const data = transformToArrayWithIdTwo(snap.val());
      setMessages(data);
    });

    return () => messageRef.off('value');
  }, [chatId]);

  console.log('Message Item', messages);
  return (
    <ul className="msg-list custom-scroll">
      {isChatEmpty && <li>No message</li>}
      {isShowMessage &&
        messages.map(message => (
          <MessageItem key={message.id} message={message} />
        ))}
    </ul>
  );
};

export default Messages;
