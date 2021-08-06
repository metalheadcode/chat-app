import React from 'react';
import { Redirect, Route } from 'react-router';
import { Container, Loader } from 'rsuite';
import { useProfile } from '../../context/profile.context';

const PrivateRoute = ({ children, ...routeProps }) => {
  const { profile, isLoading } = useProfile();

  // loading true, profile null
  if (isLoading && !profile) {
    return (
      <Container>
        <Loader center vertical size="md" content="Loading" speed="slow" />
      </Container>
    );
  }

  // profile null and loading false
  if (!profile && !isLoading) {
    return <Redirect to="/signin" />;
  }

  return <Route {...routeProps}>{children}</Route>;
};

export default PrivateRoute;
