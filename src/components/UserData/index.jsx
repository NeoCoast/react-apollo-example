import React from 'react';
import { ReactComponent as Avatar } from 'Assets/avatar.svg';
import { ReactComponent as SignOut } from 'Assets/signout.svg';

import Button from 'Components/Button';

import './index.scss'

const UserData = ({
  fullName,
  email,
  postsCount = 0,
  openNewPostModal,
  logout,
}) => (
  <div className="user-data">
    <Avatar width={56} height={56} />
    <div className="user-data__name">
      {fullName}
    </div>
    <div className="user-data__email">
      {email}
    </div>

    <div className="user-data__divider-container">
      <Button
        className="user-data__new-post"
        onClick={openNewPostModal}
      >
        New post
      </Button>
      <div className="user-data__divider" />
    </div>

    <div className="user-data__info">
      <div className="user-data__title">
        Posts
      </div>
      <div className="user-data__value">
        {postsCount}
      </div>
    </div>

    <div className="user-data__divider-container">
      <div className="user-data__divider" />
    </div>

    <div className="user-data__sign-out" role="button" tabIndex="0" onClick={logout}>
      <SignOut /> Sign out
    </div>
  </div>
);

export default UserData;
