import React, { createContext, useContext, useState } from 'react';
import { database } from '../misc/firebase';
import { transformToArrayWithId } from '../misc/helpers';

const RoomsContext = createContext();

export const RoomsProvider = ({ children }) => {
  const [rooms, setRooms] = useState(null);

  useState(() => {
    const roomsRef = database.ref('rooms');
    roomsRef.on('value', snap => {
      const data = transformToArrayWithId(snap.val());
      setRooms(data);
    });

    return () => roomsRef.off();
  }, []);

  return (
    <RoomsContext.Provider value={rooms}>{children}</RoomsContext.Provider>
  );
};

export const useRooms = () => useContext(RoomsContext);
