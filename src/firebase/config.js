import firebase from "firebase/app";
import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCBp7JA8FsOQ8R5ZY6C2X0UCv2aP6lcTh0",
    authDomain: "shop-f2772.firebaseapp.com",
    databaseURL: "https://shop-f2772-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "shop-f2772",
    storageBucket: "shop-f2772.appspot.com",
    messagingSenderId: "642548099728",
    appId: "1:642548099728:web:6572af523c6871b3e30615",
    measurementId: "G-X5DV8XRR9Z"
  };

    firebase.initializeApp(firebaseConfig);


  const auth = firebase.auth;
  const db = firebase.firestore();
  var storage = firebase.storage();

  export {auth, db, storage};
  export default firebase