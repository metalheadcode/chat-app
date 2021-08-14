import React, { useState } from 'react';
import { Tag, Icon, Button, Alert } from 'rsuite';
import firebase from 'firebase/app';
import { auth } from '../../misc/firebase';

const ProviderBlock = () => {
  const [isConnected, setIsConnected] = useState({
    'google.com': auth.currentUser.providerData.some(
      data => data.providerId === 'google.com'
    ),
    'facebook.com': auth.currentUser.providerData.some(
      data => data.providerId === 'facebook.com'
    ),
  });

  const unLink = async providerId => {
    try {
      if (auth.currentUser.providerData.length === 1) {
        throw new Error(`You cannot disconnect from ${providerId}`);
      }
      await auth.currentUser.unlink(providerId);
      setIsConnected({ ...isConnected, [providerId]: false });
      Alert.success(`Disconnected from ${providerId} account`, 4000);
    } catch (error) {
      Alert.error(error.message, 4000);
    }
  };

  const linkWithAccount = async providerId => {
    try {
      if (providerId === 'google.com') {
        await auth.currentUser.linkWithPopup(
          new firebase.auth.GoogleAuthProvider()
        );
      } else if (providerId === 'facebook.com') {
        await auth.currentUser.linkWithPopup(
          new firebase.auth.FacebookAuthProvider()
        );
      }
      setIsConnected({ ...isConnected, [providerId]: true });
      Alert.success('Successfully linked!');
    } catch (error) {
      Alert.error(error.message, 4000);
    }
  };

  const linkWithGoogle = () => {
    linkWithAccount('google.com');
  };
  const linkWithFacebook = () => {
    linkWithAccount('facebook.com');
  };

  const unlinkFacebook = () => {
    unLink('facebook.com');
  };
  const unlinkGoogle = () => {
    unLink('google.com');
  };

  return (
    <div>
      {isConnected['google.com'] && (
        <Tag color="red" closable onClose={unlinkGoogle}>
          <Icon icon="google" /> Connected
        </Tag>
      )}

      {isConnected['facebook.com'] && (
        <Tag color="blue" closable onClose={unlinkFacebook}>
          <Icon icon="facebook" /> Connected
        </Tag>
      )}

      <div className="mt-2">
        {!isConnected['google.com'] && (
          <Button color="red" block onClick={linkWithGoogle}>
            <Icon icon="google" /> Link to Facebook
          </Button>
        )}

        {!isConnected['facebook.com'] && (
          <Button color="blue" block onClick={linkWithFacebook}>
            <Icon icon="facebook" /> Link to Facebook
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProviderBlock;
