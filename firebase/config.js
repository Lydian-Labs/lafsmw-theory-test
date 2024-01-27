// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// firebaseConfig is the configuration object, containing the configuration settings for connecting to Firebase services, that is passed to initializeApp()
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCOlNU8S1L-itaJYTgdoV_NSCsi3EcRYbk",
  authDomain: "lafsmw-theory-test.firebaseapp.com",
  projectId: "lafsmw-theory-test",
  storageBucket: "lafsmw-theory-test.appspot.com",
  messagingSenderId: "445856737300",
  appId: "1:445856737300:web:95d83efb3415d5b4cbdf01",
  measurementId: "G-WYES3RTNHV",
};
// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
//   measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
// };

// Initialize Firebase - this is the initialized Firebase application instance which can be used to access various Firebase services, such as Firestore, Authentication, Realtime Database, etc.
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);

// not used yet
const analytics = getAnalytics(app);
