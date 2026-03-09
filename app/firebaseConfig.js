import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBzs4SORS-THQIqJECH4jDDpX79mBeSQt0",
  authDomain: "auth-7780a.firebaseapp.com",
  projectId: "auth-7780a",
  storageBucket: "auth-7780a.firebasestorage.app",
  messagingSenderId: "647635484751",
  appId: "1:647635484751:web:f0213651b68b92a638aa3a",
  measurementId: "G-ZVWJS1JQJ8"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);