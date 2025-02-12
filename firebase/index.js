// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc   } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-GKYVJ9LvTWO39ubv_AdlHI8w_YCs3QI",
  authDomain: "shopping-app-7df11.firebaseapp.com",
  projectId: "shopping-app-7df11",
  storageBucket: "shopping-app-7df11.firebasestorage.app",
  messagingSenderId: "349325953625",
  appId: "1:349325953625:web:24d773b9290da063817f48"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db, getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc   };