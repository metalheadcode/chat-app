import React from 'react';
import { Redirect, Route } from 'react-router';
import { Container } from 'rsuite';

const PublicRoute = ({ children, ...routeProps }) => {
  const profile = true;

  if (profile) {
    return <Container></Container>;
  }

  return <Route {...routeProps}>{children}</Route>;
};

export default PublicRoute;
