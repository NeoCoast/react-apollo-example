import React from 'react';
import cn from 'classnames';
import Topbar from 'Components/Topbar';
import './index.scss';

const Layout = ({ centered = false, children, withTopbar = true }) => (
  <div
    className={
      cn('layout', {
        'layout--centered': centered,
        'layout--topbar': withTopbar,
      })
    }
  >
    <Topbar />
    {children}
  </div>
);

export default Layout;
