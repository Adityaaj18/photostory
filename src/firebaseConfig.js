// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC67G9rrqD9_0owDPnjp_6zAYXfff95g8U",
  authDomain: "photostory-86782.firebaseapp.com",
  projectId: "photostory-86782",
  storageBucket: "photostory-86782.firebasestorage.app",
  messagingSenderId: "311761503749",
  appId: "1:311761503749:web:dc3f6403232d20e9123e6c",
  measurementId: "G-RSCC91WYZH",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };
