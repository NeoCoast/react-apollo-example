import React from 'react';
import cn from 'classnames';

import Loader from 'Components/Loader';
import './index.scss';

const Button = ({
  children,
  className = '',
  loading = false,
  ...props
}) => (
  <button
    className={cn('button', className)}
    {...props}
  >
    {
      loading ? (
        <Loader color="white" />
      ) : (
        children
      )
    }
  </button>
);

export default Button;
