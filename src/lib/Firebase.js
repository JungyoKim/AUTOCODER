import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBPi1_JCCG0kFY6M7LLH4vzfLbtVpqTUHs",
  authDomain: "autocoder-js.firebaseapp.com",
  projectId: "autocoder-js",
  storageBucket: "autocoder-js.appspot.com",
  messagingSenderId: "896861018272",
  appId: "1:896861018272:web:21879e925e3b28fa6d51c5",
  measurementId: "G-SVSQ4VD6CZ"
};

let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
app = getApp();
}

const db = getFirestore(app);

export { db };