// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDdMa6vt8IRjXCBM8stUiwg9sEF8iLkOpc",
  authDomain: "foodpair-38c35.firebaseapp.com",
  projectId: "foodpair-38c35",
  storageBucket: "foodpair-38c35.appspot.com",
  messagingSenderId: "740613941438",
  appId: "1:740613941438:web:e99aee9625c9713a94d6ef"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export default auth