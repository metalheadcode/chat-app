import React from 'react';
import { useRouteMatch } from 'react-router';
import { Switch, Route } from 'react-router-dom';
import { Grid, Row, Col } from 'rsuite';
import Sidebar from '../../components/Sidebar';
import { RoomsProvider } from '../../context/rooms.context';
import { useMediaqQueryChrome } from '../../misc/custom-hooks';
import Chat from './Chat';

const Home = () => {
  // return boolean
  const isDesktop = useMediaqQueryChrome('(min-width:992px');
  // return boolean
  const { isExact } = useRouteMatch('/');
  // switch statement
  const switchRenderSidebar = isDesktop || isExact;

  return (
    <RoomsProvider>
      <Grid fluid className="h-100">
        <Row className="h-100">
          {switchRenderSidebar && (
            <Col xs={24} md={8} className="h-100">
              <Sidebar />
            </Col>
          )}
          <Switch>
            <Route exact path="/chat/:chatId">
              <Col xs={24} md={16} className="h-100">
                <Chat />
              </Col>
            </Route>
            <Route>
              {isDesktop && (
                <Col xs={24} md={16} className="h-100">
                  <h6 className="text-center mt-page">Please select chat</h6>
                </Col>
              )}
            </Route>
          </Switch>
        </Row>
      </Grid>
    </RoomsProvider>
  );
};

export default Home;
