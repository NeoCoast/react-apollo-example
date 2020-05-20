import React from 'react';

import "./index.scss";

const Input = React.forwardRef(({ id, label, ...props }, ref) => (
  <>
    <label className="input__label" htmlFor={id}>
      {label}
    </label>
    <input
      className="input"
      id={id}
      ref={ref}
      {...props}
    />
  </>
));

export default Input;
