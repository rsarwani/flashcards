// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDsR1Md3M4U5EzxLYM1eMlmy90K_GqxZtw",
  authDomain: "flashcardsaas-f52f1.firebaseapp.com",
  projectId: "flashcardsaas-f52f1",
  storageBucket: "flashcardsaas-f52f1.appspot.com",
  messagingSenderId: "627837733461",
  appId: "1:627837733461:web:baf7b90d7e540939a462dc",
  measurementId: "G-SFS4KWSESQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export {db}