import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBlP-CuFqMW5A8t2CtrpQhyeerstpm91S4",
    authDomain: "shopbridge-inventory.firebaseapp.com",
    projectId: "shopbridge-inventory",
    storageBucket: "shopbridge-inventory.appspot.com",
    messagingSenderId: "701686523254",
    appId: "1:701686523254:web:f7c4da7544c76b306ec657"
  };

  firebase.initializeApp(firebaseConfig);

export default firebase.firestore();