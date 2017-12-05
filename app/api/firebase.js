import * as firebase from 'firebase'

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyAXE_tqKUBrW4_CRggAU35PqN0bJVYDYdU',
  authDomain: 'what-to-cook-3f485.firebaseapp.com',
  databaseURL: 'https://what-to-cook-3f485.firebaseio.com',
  storageBucket: 'what-to-cook-3f485.appspot.com',
  messagingSenderId: '269947495972'
}

// make sure that Firebase is not initialized more than once
const firebaseApp = !firebase.apps.length ? firebase.initializeApp(config) : firebase.app()

export default firebaseApp
