import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, database } from '../misc/firebase';

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('Start component mount');
    auth.onAuthStateChanged(user => {
      if (user) {
        database
          .ref('profiles')
          .child(user.uid)
          .on('value', snap => {
            const { name, createdAt } = snap.val();
            const userData = {
              name,
              createdAt,
              uid: user.uid,
              email: user.email,
            };
            setProfile(userData);
            setIsLoading(false);
          });
      } else {
        setProfile(null);
        setIsLoading(false);
      }
    });
  }, []);

  return (
    <ProfileContext.Provider value={{ isLoading, profile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
