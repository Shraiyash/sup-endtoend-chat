// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore, collection } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDWH9M2qeROmH6yTbB_FG-v08ASIpNbbTg",
  authDomain: "sup-realtime-chat.firebaseapp.com",
  projectId: "sup-realtime-chat",
  storageBucket: "sup-realtime-chat.firebasestorage.app",
  messagingSenderId: "473661278016",
  appId: "1:473661278016:web:d47294a62f732a83ff5ca5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);

export const usersRef = collection(db, 'users');
export const roomRef = collection(db, 'rooms');