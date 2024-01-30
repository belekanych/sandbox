// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, documentId } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQgwxH7p1qBSQ2fW6saS3q61XhOHxHNcQ",
  authDomain: "mealio-510fd.firebaseapp.com",
  projectId: "mealio-510fd",
  storageBucket: "mealio-510fd.appspot.com",
  messagingSenderId: "629864078561",
  appId: "1:629864078561:web:74db6c8804a0dc1d1a2ba0",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Auth module
export const auth = getAuth(app);

// Firestore
export const db = getFirestore(app);
export const id = documentId();
