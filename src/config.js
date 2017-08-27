import firebase from 'firebase';

export const appName = "adv-react";

export const firebaseConfig = {
  apiKey: "AIzaSyBX5UU94QPTl4P3WaKwTYU-RLMqSzuThAI",
  authDomain: `${appName}.firebaseapp.com`,
  databaseURL: `https://${appName}.firebaseio.com`,
  projectId: appName,
  storageBucket: `${appName}.appspot.com`,
  messagingSenderId: "825625171274"
};

firebase.initializeApp(firebaseConfig);
