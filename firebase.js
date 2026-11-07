import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { initializeFirestore } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

// Khóa Web API của Firebase KHÔNG phải là bí mật (nó luôn lộ ở phía trình duyệt).
// Việc bảo vệ dữ liệu được thực hiện bằng Firestore Security Rules (xem firestore.rules).
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
// ignoreUndefinedProperties: không bị lỗi khi một trường có giá trị undefined
const db = initializeFirestore(app, { ignoreUndefinedProperties: true });

export { app, auth, db };

export {
  createUserWithEmailAndPassword, signInWithEmailAndPassword, setPersistence,
  browserLocalPersistence, browserSessionPersistence, sendPasswordResetEmail,
  signOut, onAuthStateChanged, confirmPasswordReset, verifyPasswordResetCode, deleteUser
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

export {
  collection, addDoc, getDocs, doc, updateDoc, deleteDoc, getDoc, setDoc, query, where,
  orderBy, limit, onSnapshot, arrayUnion, arrayRemove, deleteField, writeBatch
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
