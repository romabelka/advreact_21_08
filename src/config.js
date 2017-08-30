import firebase from 'firebase'

export const appName = "advreact-c592b"
export const firebaseConfig = {
    apiKey: "AIzaSyBdfru_79JB9-7143I9EJiGPIItSWoWTSw",
    authDomain: `${appName}.firebaseapp.com`,
    databaseURL: `https://${appName}.firebaseio.com`,
    projectId: appName,
    storageBucket: `${appName}.appspot.com`,
    messagingSenderId: "37932327951"
}

firebase.initializeApp(firebaseConfig)