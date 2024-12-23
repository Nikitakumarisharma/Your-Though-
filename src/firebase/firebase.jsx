import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';



const firebaseConfig = {
  apiKey: "AIzaSyCuPQm1ZM5pWLRwNKQwRMb2rkyiSoKgH2g",
  authDomain: "user-thought.firebaseapp.com",
  projectId: "user-thought",
  storageBucket: "user-thought.firebasestorage.app",
  messagingSenderId: "944193447941",
  appId: "1:944193447941:web:62266f0850157edb8c546c",
  measurementId: "G-HY45JFZSJG"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };