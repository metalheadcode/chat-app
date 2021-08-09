import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, database } from '../misc/firebase';

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let userRef;
    const authUnsub = auth.onAuthStateChanged(user => {
      if (user) {
        userRef = database.ref('profiles').child(user.uid);
        userRef.on('value', snap => {
          const { name, createdAt, avatar } = snap.val();
          const userData = {
            name,
            createdAt,
            avatar,
            uid: user.uid,
            email: user.email,
          };
          setProfile(userData);
          setIsLoading(false);
        });
      } else {
        if (userRef) {
          userRef.off();
        }
        setProfile(null);
        setIsLoading(false);
      }
    });

    return () => {
      // unsubscribe the onAuthStateChanged
      authUnsub();
      if (userRef) {
        userRef.off();
      }
    };
  }, []);

  return (
    <ProfileContext.Provider value={{ isLoading, profile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
