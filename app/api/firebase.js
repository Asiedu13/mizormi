// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCi8fSGn3yPZDoh0tAWOrtchu1sH1XLo8E",
  authDomain: "mizormi.firebaseapp.com",
  projectId: "mizormi",
  storageBucket: "mizormi.appspot.com",
  messagingSenderId: "605477104733",
  appId: "1:605477104733:web:ab9b77535ba3282d7071b4",
  measurementId: "G-1FH5X309VL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore( app );