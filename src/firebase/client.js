import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCMBwErfBjNdMyJ6teckpmxo9XecAwwzUA",
    authDomain: "rocotrainer-5f0e8.firebaseapp.com",
    projectId: "rocotrainer-5f0e8",
    storageBucket: "rocotrainer-5f0e8.firebasestorage.app",
    messagingSenderId: "646601252323",
    appId: "1:646601252323:web:e4afcaa80b4996078994d6"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
