// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { useEffect, useState } from "react";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDOrJ7ssiOeYkYZyfj1sY5dOe9AEveGyzQ",
  authDomain: "fir-c69a6.firebaseapp.com",
  projectId: "fir-c69a6",
  storageBucket: "fir-c69a6.appspot.com",
  messagingSenderId: "884911263833",
  appId: "1:884911263833:web:0b3baa30046139c2b7e148",
  measurementId: "G-E680LX8DWL",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();

export const login = (email, password) => {
  signInWithEmailAndPassword(auth, email, password).catch((error) => console.log(`error`, error));
};

export const register = (email, password) => {
  createUserWithEmailAndPassword(auth, email, password).catch((error) =>
    console.log(`error`, error)
  );
};
export const logout = () => {
  signOut(auth).catch((error) => console.log(`error`, error));
};

export function useAuth() {
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => setCurrentUser(user));
    return unsubscribe;
  }, []);
  return currentUser;
}

export function currentUser() {}
