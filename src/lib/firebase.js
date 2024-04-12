import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {

  apiKey: "AIzaSyAGN8fmZuj12VXD7yrU2QQArTNyZyFsLDs",
  authDomain: "real-time-chat-8b75b.firebaseapp.com",
  projectId: "real-time-chat-8b75b",
  storageBucket: "real-time-chat-8b75b.appspot.com",
  messagingSenderId: "214176946170",
  appId: "1:214176946170:web:0c2adf3ddf88e9ab463643",
  measurementId: "G-4ZNHYQ7BG3"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth()
export const db = getFirestore()
export const storage = getStorage()