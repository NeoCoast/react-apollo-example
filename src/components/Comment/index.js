import React from 'react';
import { ReactComponent as Avatar } from 'Assets/avatar.svg';

import './index.scss';

const Comment = ({
  body,
  id,
  user,
}) => (
  <div className="comment">
    <div className="comment__left">
      <Avatar width={30} height={30}/>
    </div>
    <div className="comment__right">
      <span>
        <b>{user.fullName}</b>
        <span>{user.email}</span>
      </span>
      <div className="comment__body">
        {body}
      </div>
    </div>
  </div>
);

export default Comment;
