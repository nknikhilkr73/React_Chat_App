import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyBjN2iZFqjJNvFKj27BtlXW-jSUx8MN8jc",
  authDomain: "chat-8e7f0.firebaseapp.com",
  projectId: "chat-8e7f0",
  storageBucket: "chat-8e7f0.appspot.com",
  messagingSenderId: "950106056961",
  appId: "1:950106056961:web:9e830bb3844c9b35509300"
};



// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage();
export const db =getFirestore()