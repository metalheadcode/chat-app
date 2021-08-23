import React from 'react';
import { useParams } from 'react-router';
import { Loader } from 'rsuite';
import ChatBottom from '../../components/chat-window/bottom';
import Messages from '../../components/chat-window/messages';
import ChatTop from '../../components/chat-window/top';
import { CurrentRoomProvider } from '../../context/current-room.context';
import { useRooms } from '../../context/rooms.context';
import { auth } from '../../misc/firebase';
import { transformToArray } from '../../misc/helpers';

const Chat = () => {
  // return id:string
  const { chatId } = useParams();
  // return rooms:array
  const rooms = useRooms();

  if (!rooms) {
    return <Loader center vertical size="md" content="loading" speed="slow" />;
  }

  const currentRoom = rooms.find(room => room.id === chatId);

  if (!currentRoom) {
    return <h6 className="text-center mt-page">Error: 404</h6>;
  }
  const { name, description } = currentRoom;

  const admin = transformToArray(currentRoom.admin);
  const isAdmin = admin.includes(auth.currentUser.uid);

  const currentRoomData = { name, description, admin, isAdmin };

  return (
    <CurrentRoomProvider data={currentRoomData}>
      <div className="d-flex flex-column h-100">
        <ChatTop className="chat-top" />
        <Messages className="chat-middle" />
        <ChatBottom className="chat-bottom" />
      </div>
    </CurrentRoomProvider>
  );
};

export default Chat;
