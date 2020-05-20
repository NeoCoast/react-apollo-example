import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

import { isAuthenticated } from 'Helpers/auth';
import { ROUTES } from 'Data/constants';

const PublicRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={() => !isAuthenticated() ? <Component /> : <Redirect to={ROUTES.home} />}
  />
);

PublicRoute.propTypes = {
  component: PropTypes.func.isRequired,
};

export default PublicRoute;
