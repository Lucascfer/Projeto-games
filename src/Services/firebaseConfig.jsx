import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCqjiTBRcaeyGb2uaAQi54XQYodIal2gp0",
  authDomain: "projeto-games-abdd3.firebaseapp.com",
  projectId: "projeto-games-abdd3",
  storageBucket: "projeto-games-abdd3.appspot.com",
  messagingSenderId: "1091035769386",
  appId: "1:1091035769386:web:4fd860949700dcaad2b153",
  measurementId: "G-ER9LSRRQJW"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);