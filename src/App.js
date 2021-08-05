import React from 'react';
import { Switch } from 'react-router';
import PrivateRoute from './components/routes/PrivateRoute';
import PublicRoute from './components/routes/PublicRoute';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import 'rsuite/dist/styles/rsuite-default.css';
import './styles/main.scss';
import { ProfileProvider } from './context/profile.context';

const App = () => {
  return (
    <ProfileProvider>
      <Switch>
        <PublicRoute path="/signin">
          <SignIn />
        </PublicRoute>
        <PrivateRoute path="/">
          <Home />
        </PrivateRoute>
      </Switch>
    </ProfileProvider>
  );
};

export default App;
