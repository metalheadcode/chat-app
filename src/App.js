import React from 'react';
import { Switch } from 'react-router';
import PrivateRoute from './components/routes/PrivateRoute';
import PublicRoute from './components/routes/PublicRoute';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import 'rsuite/dist/styles/rsuite-default.css';
import './styles/main.scss';

const App = () => {
  return (
    <Switch>
      <PublicRoute path="/signin">
        <SignIn />
      </PublicRoute>
      <PrivateRoute path="/">
        <Home />
      </PrivateRoute>
    </Switch>
  );
};

export default App;
