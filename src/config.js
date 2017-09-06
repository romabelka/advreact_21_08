import firebase from 'firebase'

export const appName ="advreact-277e8"// "advreact-21-08"
export const firebaseConfig = {
    //apiKey: "AIzaSyDjA6CeIHuni5lNm4ML1b-TSxJltsYUO8g",
    apiKey: "AIzaSyCw2LF9saF-AiDhbN464gWERWR35m5qm0Q",
    authDomain: `${appName}.firebaseapp.com`,
    databaseURL: `https://${appName}.firebaseio.com`,
    projectId: appName,
    storageBucket: `${appName}.appspot.com`,
    messagingSenderId: "313050002315"//"789814589283"
}

firebase.initializeApp(firebaseConfig)