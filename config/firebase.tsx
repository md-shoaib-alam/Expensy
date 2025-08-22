// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCbtPHQrdi0nNXzPvYHkHaI79uvEyajluE",
  authDomain: "expensy-c55ba.firebaseapp.com",
  projectId: "expensy-c55ba",
  storageBucket: "expensy-c55ba.firebasestorage.app",
  messagingSenderId: "562696732180",
  appId: "1:562696732180:web:36015525c85649caf87101",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// auth
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// db
export const firestore = getFirestore(app)