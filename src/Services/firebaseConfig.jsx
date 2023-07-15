import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBcnWBnbjdpEAqy42ksD_yLKNpFwi2Q5dc",
  authDomain: "game-project-f661c.firebaseapp.com",
  projectId: "game-project-f661c",
  storageBucket: "game-project-f661c.appspot.com",
  messagingSenderId: "692798284796",
  appId: "1:692798284796:web:a27308d4fe81af584ec879",
  measurementId: "G-CC6MDECLX2"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);