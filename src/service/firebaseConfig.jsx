import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBMtrl6pbW9HE7enfQ4KHlPwFST3pvovU4",
  authDomain: "raahsathi-teamspace.firebaseapp.com",
  projectId: "raahsathi-teamspace",
  storageBucket: "raahsathi-teamspace.firebasestorage.app",
  messagingSenderId: "690706201009",
  appId: "1:690706201009:web:230891f5dd47e29bebe590"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);