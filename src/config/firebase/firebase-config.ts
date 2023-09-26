// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC-mlgyKNW-qLuat6183sKznKGtSnMCb-Q",
  authDomain: "react-12-quiz-fbdb.firebaseapp.com",
  projectId: "react-12-quiz-fbdb",
  storageBucket: "react-12-quiz-fbdb.appspot.com",
  messagingSenderId: "57242953678",
  appId: "1:57242953678:web:d076427a0a843463aced9f",
  measurementId: "G-YKBGYQMQC0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);