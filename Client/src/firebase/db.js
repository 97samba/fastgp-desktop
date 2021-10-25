// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
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
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
