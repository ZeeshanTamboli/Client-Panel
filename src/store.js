import { createStore, combineReducers, compose } from 'redux';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';
// Reducers
import notifyReducer from './reducers/notifyReducer';
import settingsReducer from './reducers/settingsReducer';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: 'reactclientpanel-d5099.firebaseapp.com',
  databaseURL: 'https://reactclientpanel-d5099.firebaseio.com',
  projectId: 'reactclientpanel-d5099',
  storageBucket: 'reactclientpanel-d5099.appspot.com',
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
};

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};

// Initialize firebase instance
firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore through Firebase
const firestore = firebase.firestore();

// Settings to add to remove error
firestore.settings({ timestampsInSnapshots: true });

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
  reduxFirestore(firebase) // <- needed if using firestore
)(createStore);

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer, // <- needed if using firestore
  notify: notifyReducer,
  settings: settingsReducer
});

if (!localStorage.getItem('settings')) {
  const defaultSettings = {
    disableBalanceOnAdd: true,
    disableBalanceOnEdit: false,
    allowRegistration: false
  };

  localStorage.setItem('settings', JSON.stringify(defaultSettings));
}

// Initial state
const initialState = {
  settings: JSON.parse(localStorage.getItem('settings'))
};

// Create store
const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
