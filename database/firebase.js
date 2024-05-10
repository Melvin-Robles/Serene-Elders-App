import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"


import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyALITQYjOv_kkuKRsJACX_OShqbZ0xTVHk",
    authDomain: "serene-elders-app.firebaseapp.com",
    projectId: "serene-elders-app",
    storageBucket: "serene-elders-app.appspot.com",
    messagingSenderId: "900743366523",
    appId: "1:900743366523:web:f079657f990f443ae85fde"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  const db = firebase.firestore();

export default {
    firebase,
    db,
}