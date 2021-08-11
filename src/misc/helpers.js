export function getNameInitials(name) {
  const splitName = name.toUpperCase().split(' ');

  if (splitName.length > 1) {
    return splitName[0][0] + splitName[1][0];
  }

  return splitName[0][0];
}

// snap.val() id is outside the object.
// with this function we take them as our id
export function transformToArrayWithId(data) {
  return data
    ? Object.keys(data).map(roomId => {
        return { ...data[roomId] };
      })
    : [];
}

// data here mean snap.val()
export function transformToArray(data) {
  return data ? Object.keys(data) : [];
}

// data here mean snap.val()
