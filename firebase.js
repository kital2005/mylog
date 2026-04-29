// firebase.js - Bản hoàn chỉnh đã bổ sung Query & Where
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    setPersistence,
    browserLocalPersistence,
    browserSessionPersistence,
    sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

import { 
    getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc, getDoc, setDoc, query, where 
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

const firebaseConfig = { 
  apiKey: "AIzaSyC20Dw4N_QKc7AyFg_LW1lSvPXikIDCZGE", 
  authDomain: "corevault-db.firebaseapp.com", 
  projectId: "corevault-db", 
  storageBucket: "corevault-db.firebasestorage.app", 
  messagingSenderId: "1072184327432", 
  appId: "1:1072184327432:web:84248c3f8ee41e3b8ec0bd" 
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { 
    auth, db, getDoc, setDoc, collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, where,
    createUserWithEmailAndPassword, signInWithEmailAndPassword, setPersistence, browserLocalPersistence, browserSessionPersistence, sendPasswordResetEmail
};



// const firebaseConfig = { 
//   apiKey : "AIzaSyC20Dw4N_QKc7AyFg_LW1lSvPXikIDCZGE" , 
//   authDomain : "corevault-db.firebaseapp.com" , 
//   projectId : "corevault-db" , 
//   storageBucket : "corevault-db.firebasestorage.app" , 
//   messagingSenderId : "1072184327432" , 
//   appId : "1:1072184327432:web:84248c3f8ee41e3b8ec0bd" 
// };
