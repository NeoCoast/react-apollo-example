import React from 'react';
import "./index.scss";

const Form = ({
  children,
  title = null,
  onSubmit,
}) => (
  <form
    className="form"
    onSubmit={(ev) => {
      ev.preventDefault();
      onSubmit();
    }}
  >
    {
      title && (
        <div className="form__title">
          {title}
        </div>
      )
    }

    {children}
  </form>
);

export default Form;
