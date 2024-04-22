// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCJpawGX-pds6y0tyE6GOBR4YrDvQjFFVY",
    authDomain: "white-marathon.firebaseapp.com",
    projectId: "white-marathon",
    storageBucket: "white-marathon.appspot.com",
    messagingSenderId: "448905514863",
    appId: "1:448905514863:web:56313cb9089164ffa5e29a",
    measurementId: "G-4ZYCRP4F6Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

export const storage = getStorage(app);