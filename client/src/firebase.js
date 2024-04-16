// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJBG6tKmmF9ftWQktJSP_O15zRMeGkA_w",
  authDomain: "vehicle-service-manageme-4a48d.firebaseapp.com",
  projectId: "vehicle-service-manageme-4a48d",
  storageBucket: "vehicle-service-manageme-4a48d.appspot.com",
  messagingSenderId: "1038146211943",
  appId: "1:1038146211943:web:98ae1fa96f567f906e44c2",
  measurementId: "G-HJ0TSKDJ7P"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);