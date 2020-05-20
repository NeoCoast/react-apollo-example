import React from 'react';

import './index.scss';

const Loader = ({ color = "#0864ff" }) => (
  <div className="loader">
    <div
      className="loader__pulse-dot loader__pulse-dot--side"
      style={{ backgroundColor: color }}
    />
    <div
      className="loader__pulse-dot loader__pulse-dot--middle"
      style={{ backgroundColor: color }}
    />
    <div
      className="loader__pulse-dot loader__pulse-dot--side"
      style={{ backgroundColor: color }}
    />
  </div>
);

export default Loader;
