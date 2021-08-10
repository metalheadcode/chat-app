export function getNameInitials(name) {
  const splitName = name.toUpperCase().split(' ');

  if (splitName.length > 1) {
    return splitName[0][0] + splitName[1][0];
  }

  return splitName[0][0];
}

// data here mean snap.val()
export function transformToArray(data) {
  return data ? Object.keys(data) : [];
}

// data here mean snap.val()
