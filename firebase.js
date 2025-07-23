// Import he functions you need from the SDKS you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA_0RIih5eQl4fWdQJyV6PlCNJw1VUp2NQ",
  authDomain: "queueless-usiu.firebaseapp.com",
  projectId: "queueless-usiu",
  storageBucket: "queueless-usiu.firebasestorage.app",
  messagingSenderId: "403852484027",
  appId: "1:403852484027:web:d65e85bd415b0d8c8cb89e",
  measurementId: "G-JFTG8XQ659"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
