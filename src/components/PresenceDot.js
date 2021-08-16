import React from 'react';
import { Badge, Tooltip, Whisper } from 'rsuite';
import { usePresence } from '../misc/custom-hooks';

const getText = presence => {
  if (presence) {
    return 'Unknown';
  }

  return presence.state === 'online'
    ? 'Online'
    : `Last online ${new Date(presence.last_changed).toDateString()}`;
};

const getColor = presence => {
  if (presence) {
    return 'gray';
  }
  switch (presence.state) {
    case 'online':
      return 'green';
    case 'offline':
      return 'gray';
    default:
      return 'gray';
  }
};

const PresenceDot = ({ uid }) => {
  const presence = usePresence(uid);
  return (
    <div>
      <Whisper
        placement="top"
        trigger="hover"
        speaker={<Tooltip>{getText(presence)}</Tooltip>}
      >
        <Badge
          className="cursor-pointer"
          style={{ backgroundColor: getColor(presence) }}
        />
      </Whisper>
    </div>
  );
};

export default PresenceDot;
