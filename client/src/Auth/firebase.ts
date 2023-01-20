
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDyieg1m8YzUefcrvsuPdd8d1qGdwSeifA",
  authDomain: "clone-auth-5e1a1.firebaseapp.com",
  projectId: "clone-auth-5e1a1",
  storageBucket: "clone-auth-5e1a1.appspot.com",
  messagingSenderId: "483543280370",
  appId: "1:483543280370:web:95da112043b6f0155bfe6b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export default app;