import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Alert } from 'rsuite';
import { auth, database } from '../../../misc/firebase';
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

  const handleAdmin = useCallback(
    async uid => {
      const adminRef = database.ref(`/rooms/${chatId}/admin`);

      let alertMsg;
      // https://firebase.google.com/docs/database/web/read-and-write#save_data_as_transactions
      await adminRef.transaction(admin => {
        if (admin) {
          if (admin[uid]) {
            admin[uid] = null;
            alertMsg = 'Admin Permission Remove';
          } else {
            admin[uid] = true;
            alertMsg = 'Admin Permission Granted';
          }
        }
        return admin;
      });
      Alert.info(alertMsg, 4000);
    },
    [chatId]
  );

  const handleLike = useCallback(async msgId => {
    const { uid } = auth.currentUser;
    const adminsRef = database.ref(`/messages/${msgId}`);
    let alertMsg;

    // https://firebase.google.com/docs/database/web/read-and-write#save_data_as_transactions
    await adminsRef.transaction(msg => {
      if (msg) {
        if (msg.likes && msg.likes[uid]) {
          msg.likeCount -= 1;
          msg.likes[uid] = null;
          alertMsg = 'Like removed';
        } else {
          msg.likeCount += 1;

          if (!msg.likes) {
            msg.likes = {};
          }

          msg.likes[uid] = true;
          alertMsg = 'Like Added';
        }
      }

      return msg;
    });
    // copied from firebase documentation, you can get from the link above.

    Alert.info(alertMsg, 4000);
  }, []);

  return (
    <ul className="msg-list custom-scroll">
      {isChatEmpty && <li>No message</li>}
      {isShowMessage &&
        messages.map(message => (
          <MessageItem
            key={message.id}
            message={message}
            handleLike={handleLike}
            handleAdmin={handleAdmin}
          />
        ))}
    </ul>
  );
};

export default Messages;
