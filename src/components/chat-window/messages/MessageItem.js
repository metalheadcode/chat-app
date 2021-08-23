import React from 'react';
import TimeAgo from 'timeago-react';
import { useHover, useMediaqQueryChrome } from '../../../misc/custom-hooks';
import ProfileAvatar from '../../dasboard.js/ProfileAvatar';
import PresenceDot from '../../PresenceDot';
import IconBtnControl from './IconBtnControl';
import ProfileInfoBtnModal from './ProfileInfoBtnModal';

const MessageItem = ({ message, handleLike, handleDelete }) => {
  const { author, createdAt, text, likes, likeCount } = message;
  const [selfRef, isHover] = useHover();
  const isAuthor = true;
  const isMobile = useMediaqQueryChrome('(max-width: 992px)');
  const canShowIcon = isMobile || isHover;

  return (
    <li
      className={`padded mb-1 cursor-pointer ${isHover ? 'bg-black-02' : ''}`}
      ref={selfRef}
    >
      <div className="d-flex align-items-center font-bolder mb-1">
        <PresenceDot uid={author.uid} />
        <ProfileAvatar
          src={author.avatar}
          name={author.name}
          className="ml-1"
          size="xs"
        />
        <ProfileInfoBtnModal
          author={author}
          appearance="link"
          className="p-0 ml-1 text-black"
        />
        <TimeAgo
          datetime={createdAt}
          className="font-normal text-black-45 ml-2"
        />
        <IconBtnControl
          {...(likes ? { color: 'red' } : {})}
          isVisible={canShowIcon}
          iconName="heart"
          tooltip="Like this message"
          onClick={() => handleLike(message.id)}
          badgecontent={likeCount}
        />

        {isAuthor && (
          <IconBtnControl
            isVisible={canShowIcon}
            iconName="close"
            tooltip="Delete this message"
            onClick={() => handleDelete(message.id)}
          />
        )}
      </div>
      <div>
        <span className="word-breal-all">{text}</span>
      </div>
    </li>
  );
};

export default MessageItem;
