// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyD3V5JywTTpQ04ZOVQviYYjZCx1zzmDVVg",
  authDomain: "quizy-6d66f.firebaseapp.com",
  projectId: "quizy-6d66f",
  storageBucket: "quizy-6d66f.appspot.com",
  messagingSenderId: "645825035677",
  appId: "1:645825035677:web:447050ad8e2fd9e1248374",
  measurementId: "G-QGSJV45HT5"
};


firebase.initializeApp(firebaseConfig);
export default firebase; 