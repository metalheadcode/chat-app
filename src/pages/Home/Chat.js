import React from 'react';
import { useParams } from 'react-router';
import { Loader } from 'rsuite';
import ChatBottom from '../../components/chat-window/bottom';
import Messages from '../../components/chat-window/messages';
import ChatTop from '../../components/chat-window/top';
import { useRooms } from '../../context/rooms.context';

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

  return (
    <>
      <div>
        <ChatTop
          className="chat-top"
          name={currentRoom.name}
          description={currentRoom.description}
        />
      </div>
      <div>
        <Messages className="chat-middle" />
      </div>
      <div>
        <ChatBottom className="chat-bottom" />
      </div>
    </>
  );
};

export default Chat;
