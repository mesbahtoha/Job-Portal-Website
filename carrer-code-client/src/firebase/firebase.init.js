import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCQ6fkxJQrHOpLKFFUY8532P9TNmiVKJ6c",
  authDomain: "career-code-8efe9.firebaseapp.com",
  projectId: "career-code-8efe9",
  storageBucket: "career-code-8efe9.firebasestorage.app",
  messagingSenderId: "600977965880",
  appId: "1:600977965880:web:c69ec494e0062ea8f937cd"
};

console.log(firebaseConfig);

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
