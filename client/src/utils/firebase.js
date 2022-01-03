import firebase from 'firebase/app';
import 'firebase/storage'


const firebaseConfig = {
    apiKey: "AIzaSyDjSI3Ko59746vVrQPoNLOy7Gvd8JwOJQo",
    authDomain: "ezwoof.firebaseapp.com",
    projectId: "ezwoof",
    storageBucket: "ezwoof.appspot.com",
    messagingSenderId: "29990441124",
    appId: "1:29990441124:web:704ac00f02c5c99f8f5631",
    measurementId: "G-5D842WFL6V"
  };
  
  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);
  const storage = firebase.storage()

  export  {
    storage, firebase as default
  }