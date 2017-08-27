import firebase from 'firebase'

export const appName = "adv-21-08"
export const firebaseConfig = {
    apiKey: "AIzaSyAFf2xnTf-RQAxK0W_QWKbsf8nEW0vJ66Y",
    authDomain: `${appName}.firebaseapp.com`,
    databaseURL: `https://${appName}.firebaseio.com`,
    projectId: appName,
    storageBucket: `${appName}.appspot.com`,
    messagingSenderId: "497019564518"
}

firebase.initializeApp(firebaseConfig)