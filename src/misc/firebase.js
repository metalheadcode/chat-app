import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
  apiKey: 'AIzaSyARGooumUaHouxGbhhJAGWbaTUjk5FEqk8',
  authDomain: 'test-c3057.firebaseapp.com',
  databaseURL: 'https://test-c3057.firebaseio.com',
  projectId: 'test-c3057',
  storageBucket: 'test-c3057.appspot.com',
  messagingSenderId: '886868184562',
  appId: '1:886868184562:web:46028a8903732dd8b52f6b',
  measurementId: 'G-CDLCZ0Q3P6',
};

const app = firebase.initializeApp(config);
export const auth = app.auth();
export const database = app.database();
