import React, { createContext, useContext, useEffect, useState } from 'react';
import firebase from 'firebase/app';
import { auth, database } from '../misc/firebase';

const ProfileContext = createContext();

export const isOfflineForDatabase = {
  state: 'offline',
  last_changed: firebase.database.ServerValue.TIMESTAMP,
};

const isOnlineForDatabase = {
  state: 'online',
  last_changed: firebase.database.ServerValue.TIMESTAMP,
};

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let userRef;
    let userStatusDatabaseRef;

    const authUnsub = auth.onAuthStateChanged(user => {
      if (user) {
        userRef = database.ref('profiles').child(user.uid);
        userStatusDatabaseRef = database.ref(`/status/${user.uid}`);

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

        // user online
        database.ref('.info/connected').on('value', snap => {
          if (!!snap.val() === false) {
            return;
          }
          userStatusDatabaseRef
            .onDisconnect()
            .set(isOfflineForDatabase)
            .then(() => {
              userStatusDatabaseRef.set(isOnlineForDatabase);
            });
        });
      } else {
        if (userRef) {
          userRef.off();
        }
        if (userStatusDatabaseRef) {
          userStatusDatabaseRef.off();
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
      if (userStatusDatabaseRef) {
        userStatusDatabaseRef.off();
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
