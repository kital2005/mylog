// Nhúng thư viện Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    setPersistence,
    browserLocalPersistence,
    browserSessionPersistence
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

// ĐÃ THÊM: Nhúng thư viện Firestore Database
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

// Thông tin định danh của bạn
const firebaseConfig = { 
  apiKey : "AIzaSyC20Dw4N_QKc7AyFg_LW1lSvPXikIDCZGE" , 
  authDomain : "corevault-db.firebaseapp.com" , 
  projectId : "corevault-db" , 
  storageBucket : "corevault-db.firebasestorage.app" , 
  messagingSenderId : "1072184327432" , 
  appId : "1:1072184327432:web:84248c3f8ee41e3b8ec0bd" 
};

// Khởi tạo
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // Khởi tạo Database

// Xuất đồ nghề ra để dùng
export { 
    auth, 
    db, // Xuất biến db ra
    collection, addDoc, getDocs, // Các lệnh thao tác với Database
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    setPersistence,
    browserLocalPersistence,
    browserSessionPersistence
};