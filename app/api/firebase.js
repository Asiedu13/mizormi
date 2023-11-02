// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword,  } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

// import { auth, auth } from "firebase-admin"
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
export const auth = getAuth( app );

export const signUpUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    return userCredential.user;
  } catch (error) {
    console.log(error);
  }
};


export const signInUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    return userCredential.user;
  } catch (error) {
    console.log(error);
  }
};


// const analytics = getAnalytics(app);
export const db = getFirestore(app);


