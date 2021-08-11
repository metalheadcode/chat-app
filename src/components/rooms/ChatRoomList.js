import React from 'react';
import { Loader, Nav } from 'rsuite';
import { Link, useLocation } from 'react-router-dom';
import { useRooms } from '../../context/rooms.context';
import RoomItem from './RoomItem';

const ChatRoomList = ({ aboveElHeight }) => {
  const rooms = useRooms();
  const location = useLocation();
  return (
    <Nav
      appearance="subtle"
      vertical
      reversed
      className="overflow-y-scroll custom-scroll"
      style={{
        height: `calc(100% - ${aboveElHeight}px)`,
      }}
      activeKey={location.pathname}
    >
      {rooms ? (
        rooms.map(room => (
          <Nav.Item
            componentClass={Link}
            to={`/chat/${room.id}`}
            eventKey={`/chat/${room.id}`}
            key={room.id}
          >
            <RoomItem room={room} />
          </Nav.Item>
        ))
      ) : (
        <Loader center vertical content="Loading" speed="slow" size="md" />
      )}
    </Nav>
  );
};

export default ChatRoomList;
