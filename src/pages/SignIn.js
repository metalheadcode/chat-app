import React from 'react';
import { Container, Grid, Row, Col, Panel, Button, Icon, Alert } from 'rsuite';
import firebase from 'firebase/app';
import { auth, database } from '../misc/firebase';

const SignIn = () => {
  const signInWithProvider = async provider => {
    try {
      const { additionalUserInfo, user } = await auth.signInWithPopup(provider);
      if (additionalUserInfo.isNewUser) {
        await database.ref('profiles').child(user.uid).set({
          name: user.displayName,
          createdAt: firebase.database.ServerValue.TIMESTAMP,
        });
      }
    } catch (error) {
      Alert.error(error.message);
    }
  };

  const onGoogleSignIn = () =>
    signInWithProvider(new firebase.auth.GoogleAuthProvider());

  const onFacebookSignIn = () =>
    signInWithProvider(new firebase.auth.FacebookAuthProvider());

  return (
    <Container>
      <Grid className="mt-page">
        <Row>
          <Col>
            <Panel>
              <div className="text-center">
                <h2>Welcome</h2>
                <p>Progressive chat platform for neophytes</p>
              </div>
              <div className="mt-3">
                <Button block onClick={onGoogleSignIn}>
                  <Icon icon="google" /> Continue with Google
                </Button>
                <Button block color="blue" onClick={onFacebookSignIn}>
                  <Icon icon="facebook" /> Continue with Facebook
                </Button>
              </div>
            </Panel>
          </Col>
        </Row>
      </Grid>
    </Container>
  );
};

export default SignIn;
