import React from 'react';
import { Alert, Button, Divider, Drawer } from 'rsuite';
import { useProfile } from '../../context/profile.context';
import { database } from '../../misc/firebase';
import EditableInput from '../EditableInput';
import AvatarUploadBtn from './AvatarUploadBtn';
import ProviderBlock from './ProviderBlock';

const Dashboard = ({ signOutHandler }) => {
  const { profile } = useProfile();

  const onSave = async newData => {
    const userNicknameRef = database
      .ref('profiles')
      .child(profile.uid)
      .child('name');
    try {
      await userNicknameRef.set(newData);

      // ni return Promise
      const getMessage = await database
        .ref('/messages')
        .orderByChild('/author/uid')
        .equalTo(profile.uid)
        .once('value');

      const getRooms = await database
        .ref('/rooms')
        .orderByChild('/lastMessage/author/uid')
        .equalTo(profile.uid)
        .once('value');

      console.log('Message Snap 2', getMessage);
      console.log('Room Snap 2', getRooms);
      console.log('test token');

      Alert.info('Nickname Has Been Updated', 4000);
    } catch (error) {
      Alert.error(error.message, 4000);
    }
  };

  return (
    <>
      <Drawer.Header>
        <Drawer.Title>This is title</Drawer.Title>
      </Drawer.Header>
      <Drawer.Body>
        <h3>Hey, {profile.name}</h3>
        <ProviderBlock />
        <Divider />
        <EditableInput
          name="nickname"
          initialValue={profile.name}
          onSave={onSave}
          label={<h6 className="mb-2">Nickname</h6>}
        />
        <AvatarUploadBtn />
      </Drawer.Body>
      <Drawer.Footer>
        <Button block color="red" onClick={signOutHandler}>
          Sign Out
        </Button>
      </Drawer.Footer>
    </>
  );
};

export default Dashboard;
