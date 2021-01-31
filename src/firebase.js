import firebase from 'firebase/app'
import 'firebase/firestore'

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAXBGjKT7vGCs2oGpM0sy3L_zZsq6PzNDU",
    authDomain: "fb-crud-reactjs.firebaseapp.com",
    databaseURL: "https://fb-crud-reactjs.firebaseio.com",
    projectId: "fb-crud-reactjs",
    storageBucket: "fb-crud-reactjs.appspot.com",
    messagingSenderId: "696034553952",
    appId: "1:696034553952:web:0dda35708412a0af09d305"
  };
  // Initialize Firebase
  const fb = firebase.initializeApp(firebaseConfig);
  export const db = fb.firestore();