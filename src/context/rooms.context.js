import React, { createContext, useContext, useState } from 'react';
import { database } from '../misc/firebase';

const RoomsContext = createContext();

export const RoomsProvider = ({ children }) => {
  const [rooms, setRooms] = useState(null);

  useState(() => {
    const roomsRef = database.ref('rooms');
    roomsRef.on('value', snap => {
      const data = snap.val();
      console.log(data);
      setRooms(data);
    });

    return () => roomsRef.off();
  }, []);

  return (
    <RoomsContext.Provider value={rooms}>{children}</RoomsContext.Provider>
  );
};

export const useRooms = () => useContext(RoomsContext);
