import React from 'react';
import { Redirect, Route } from 'react-router';
import { Container, Loader } from 'rsuite';

const PublicRoute = ({ children, ...routeProps }) => {
  const profile = true;

  if (profile) {
    return (
      <Container>
        <Loader></Loader>
      </Container>
    );
  }

  return <Route {...routeProps}>{children}</Route>;
};

export default PublicRoute;
