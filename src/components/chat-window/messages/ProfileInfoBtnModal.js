import React from 'react';
import { Button, Modal } from 'rsuite';
import { useModalState } from '../../../misc/custom-hooks';
import ProfileAvatar from '../../dasboard.js/ProfileAvatar';

const ProfileInfoBtnModal = ({ author, ...btnProps }) => {
  const { name, avatar, createdAt } = author;
  const { isOpen, open, close } = useModalState();
  const shortName = name.split(' ')[0];
  const memberSince = new Date(createdAt).toDateString();

  return (
    <>
      <Button {...btnProps} onClick={open}>
        {shortName}
      </Button>

      <Modal show={isOpen} onHide={close}>
        <Modal.Header>
          <Modal.Title>{shortName}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <ProfileAvatar
            name={name}
            src={avatar}
            className="width-200 height-200 img-fullsize font-huge "
          />
          <h4 className="mt-2">{name}</h4>
          <p>Member since: {memberSince}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button block onClick={close}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProfileInfoBtnModal;
