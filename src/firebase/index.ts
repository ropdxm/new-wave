// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDjKde0tQlzrt2u8Tp0t4t34BeT8eQ0ltI",
  authDomain: "new-wave-63c62.firebaseapp.com",
  projectId: "new-wave-63c62",
  storageBucket: "new-wave-63c62.appspot.com",
  messagingSenderId: "212005138167",
  appId: "1:212005138167:web:143547315cf203abcbedf2",
  measurementId: "G-N2WGF6FLZL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth();
const db = getFirestore();
const storage = getStorage();

const usersRef = collection(db, 'users')
const eventsRef = collection(db, 'events')
const inventoryRef = collection(db, 'inventory')
const purchasesRef = collection(db, 'purchases')

export { auth, db, usersRef, storage, eventsRef, inventoryRef, purchasesRef };