// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {addDoc, collection, getFirestore} from 'firebase/firestore/lite'

const firebaseConfig = {
  apiKey: "AIzaSyA6lbFMfySRsga_WZNuYUPTKNqFiN5Hxs8",
  authDomain: "iwantmore-95869.firebaseapp.com",
  databaseURL: "https://iwantmore-95869.firebaseio.com",
  projectId: "iwantmore-95869",
  storageBucket: "iwantmore-95869.appspot.com",
  messagingSenderId: "238883114072",
  appId: "1:238883114072:web:790ed4c670e45a197b0e2d",
  measurementId: "G-WXNZEXJQV3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function createTicket(threadId: string, text: string) {
    try {
        await addDoc(collection(db, 'tickets'), {
            threadId,
            text,
            openedAt: Date()
        })
    } catch(e) {
        console.error("Error adding document", e)
    }
}