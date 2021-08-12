import React from 'react';

const ChatTop = ({ name, description }) => {
  return (
    <div>
      <h4>{name}</h4>
      <p>{description}</p>
    </div>
  );
};

export default ChatTop;
