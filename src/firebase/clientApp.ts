// src/firebase/clientApp.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCKcqCVFC1vmPMa7ZyHaLf8KxX1BdLZxhA",
  authDomain: "ccap-acde0.firebaseapp.com",
  projectId: "ccap-acde0",
  storageBucket: "ccap-acde0.firebasestorage.app",
  messagingSenderId: "833649492750",
  appId: "1:833649492750:web:bc1a395361eb9d1d390d5f"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);
