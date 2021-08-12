import React, { useEffect, useRef, useState } from 'react';
import { Divider } from 'rsuite';
import CreateRoomBtnModal from './CreateRoomBtnModal';
import DashboardToggle from './dasboard.js/DashboardToggle';
import ChatRoomList from './rooms/ChatRoomList';

const Sidebar = () => {
  const [height, setHeight] = useState(0);
  const topSideBarRef = useRef();

  useEffect(() => {
    if (topSideBarRef.current) {
      setHeight(topSideBarRef.current.scrollHeight);
    }
  }, [topSideBarRef]);

  return (
    <div className="h-100 pt-2">
      <div ref={topSideBarRef}>
        <DashboardToggle />
        <CreateRoomBtnModal />
        <Divider>Join Conversation</Divider>
      </div>
      <ChatRoomList aboveElHeight={height} />
    </div>
  );
};

export default Sidebar;
