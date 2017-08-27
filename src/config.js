import firebase from 'firebase'

export const appName = 'adv-react-becce';
export const firebaseConfig = {
    apiKey: "AIzaSyACAdiXccnI3MWYqFQT6aIU0A59plv8upc",
    authDomain: `${appName}.firebaseapp.com`,
    databaseURL: `https://${appName}.firebaseio.com`,
    projectId: appName,
    storageBucket: `${appName}.appspot.com`,
    messagingSenderId: "235849394951"
  };

firebase.initializeApp(firebaseConfig)