// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
// import { 
//     getAuth, 
//     createUserWithEmailAndPassword, 
//     signInWithEmailAndPassword,
//     setPersistence,
//     browserLocalPersistence,
//     browserSessionPersistence,
//     sendPasswordResetEmail
// } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

// import { 
//     getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc, getDoc, setDoc, query, where, orderBy, onSnapshot 
// } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

// // ĐÃ THÊM: THƯ VIỆN ĐỂ UPLOAD FILE TRỰC TIẾP LÊN FIREBASE
// import { 
//     getStorage, ref, uploadBytesResumable, getDownloadURL 
// } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-storage.js";

// const firebaseConfig = { 
//   apiKey: "AIzaSyC20Dw4N_QKc7AyFg_LW1lSvPXikIDCZGE", 
//   authDomain: "corevault-db.firebaseapp.com", 
//   projectId: "corevault-db", 
//   storageBucket: "corevault-db.firebasestorage.app", 
//   messagingSenderId: "1072184327432", 
//   appId: "1:1072184327432:web:84248c3f8ee41e3b8ec0bd" 
// };

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const db = getFirestore(app);
// const storage = getStorage(app); // Khởi tạo Storage

// export { 
//     auth, db, storage, getDoc, setDoc, collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, where, orderBy, onSnapshot,
//     createUserWithEmailAndPassword, signInWithEmailAndPassword, setPersistence, browserLocalPersistence, browserSessionPersistence, sendPasswordResetEmail,
//     ref, uploadBytesResumable, getDownloadURL // Xuất thư viện Storage
// };



// const firebaseConfig = { 
//   apiKey : "AIzaSyC20Dw4N_QKc7AyFg_LW1lSvPXikIDCZGE" , 
//   authDomain : "corevault-db.firebaseapp.com" , 
//   projectId : "corevault-db" , 
//   storageBucket : "corevault-db.firebasestorage.app" , 
//   messagingSenderId : "1072184327432" , 
//   appId : "1:1072184327432:web:84248c3f8ee41e3b8ec0bd" 
// };



import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-storage.js";

const firebaseConfig = { 
  apiKey: "AIzaSyC20Dw4N_QKc7AyFg_LW1lSvPXikIDCZGE", 
  authDomain: "corevault-db.firebaseapp.com", 
  projectId: "corevault-db", 
  storageBucket: "corevault-db.firebasestorage.app", 
  messagingSenderId: "1072184327432", 
  appId: "1:1072184327432:web:84248c3f8ee41e3b8ec0bd" 
};

// 1. Khởi tạo App
const app = initializeApp(firebaseConfig);

// 2. Khởi tạo các dịch vụ
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// 3. Export các dịch vụ đã khởi tạo
export { 
    auth, db, storage, app 
};

// Export thêm các hàm từ thư viện để dùng ở file khác
export { createUserWithEmailAndPassword, signInWithEmailAndPassword, setPersistence, browserLocalPersistence, browserSessionPersistence, sendPasswordResetEmail, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
export { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, getDoc, setDoc, query, where, orderBy, onSnapshot } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
export { ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-storage.js";