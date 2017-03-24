import * as firebase from 'firebase';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyAXE_tqKUBrW4_CRggAU35PqN0bJVYDYdU",
    authDomain: "what-to-cook-3f485.firebaseapp.com",
    databaseURL: "https://what-to-cook-3f485.firebaseio.com",
    storageBucket: "what-to-cook-3f485.appspot.com",
    messagingSenderId: "269947495972"
};

const firebaseApp= firebase.initializeApp(config);

export default firebaseApp;



