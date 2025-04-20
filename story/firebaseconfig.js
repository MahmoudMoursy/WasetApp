
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs } from 'firebase/firestore'; 

const firebaseConfig = {
  apiKey: "AIzaSyCC8MN9pKQoRZPkLkU7ImEkPfkmDy8QkC0",
  authDomain: "waset-ab152.firebaseapp.com",
  projectId: "waset-ab152",
  storageBucket: "waset-ab152.firebasestorage.app",
  messagingSenderId: "819457847772",
  appId: "1:819457847772:web:5cb2ac0b963490804fdf19",
  measurementId: "G-KVX57PDLZ6"
};

const app = initializeApp(firebaseConfig);
 const db = getFirestore(app);
export const auth = getAuth(app);
export default db;


