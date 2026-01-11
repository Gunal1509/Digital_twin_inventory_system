import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAG4naxapAE-7hTEeSfyKWpPzE3hMvgmKY",
  authDomain: "digital-twin-warehouse.firebaseapp.com",
  projectId: "digital-twin-warehouse",

  // 🔴 THIS WAS MISSING — MUST ADD
  databaseURL: "https://digital-twin-warehouse-default-rtdb.asia-southeast1.firebasedatabase.app",

  storageBucket: "digital-twin-warehouse.appspot.com",
  messagingSenderId: "266775005377",
  appId: "1:266775005377:web:d2b39a2d9a809ef000ac40"
};
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const realtime = getDatabase(app);
export const auth = getAuth(app);
