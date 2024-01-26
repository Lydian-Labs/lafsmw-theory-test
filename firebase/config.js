// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
