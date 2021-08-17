export function getNameInitials(name) {
  const splitName = name.toUpperCase().split(' ');

  if (splitName.length > 1) {
    return splitName[0][0] + splitName[1][0];
  }

  return splitName[0][0];
}

export function transformToArrayWithId(data) {
  return data
    ? Object.keys(data).map(roomId => {
        return { ...data[roomId] };
      })
    : [];
}
export function transformToArrayWithIdTwo(data) {
  return data
    ? Object.keys(data).map(roomId => {
        return { ...data[roomId], id: roomId };
      })
    : [];
}

export function transformToArray(data) {
  return data ? Object.keys(data) : [];
}

export async function getUserUpdates(profile, newData, database) {
  const changedData = {};

  changedData[`/profiles/${profile.uid}/name`] = newData;

  const getMessages = await database
    .ref('/messages')
    .orderByChild('author/uid')
    .equalTo(profile.uid)
    .once('value');

  const getRooms = await database
    .ref('/rooms')
    .orderByChild('lastMessage/author/uid')
    .equalTo(profile.uid)
    .once('value');

  getMessages.forEach(snap => {
    changedData[`/messages/${snap.key}/author/name`] = newData;
  });

  getRooms.forEach(snap => {
    changedData[`/rooms/${snap.key}/lastMessage/author/name`] = newData;
  });

  return changedData;
}
