import React from 'react';
import { Link } from 'react-router-dom';
import { ButtonToolbar, Icon } from 'rsuite';
import { useCurrentRoom } from '../../../context/current-room.context';
import { useMediaqQueryChrome } from '../../../misc/custom-hooks';
import RoomInfoBtnModal from './RoomInfoBtnModal';

const ChatTop = () => {
  const name = useCurrentRoom(value => value.name);
  const isMobile = useMediaqQueryChrome('(max-width: 992px)');

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h4>
          <Icon
            componentClass={Link}
            to="/"
            icon="arrow-circle-left"
            size="2x"
            className={
              isMobile
                ? 'd-inline-block p-0 mr-2 text-blue link-unstyled'
                : 'd-none'
            }
          />
          <span className="text-disappear">{name}</span>
        </h4>
        <ButtonToolbar className="ws-nowrap">todo</ButtonToolbar>
      </div>

      <div className="d-flex justify-content-between align-items-center">
        <span>todo</span>
        <RoomInfoBtnModal />
      </div>
    </div>
  );
};

export default React.memo(ChatTop);
