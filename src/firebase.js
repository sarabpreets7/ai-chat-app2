import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAB4GxKnS5D9jIPQ-x8a064QP9ef18uQ2A",
  authDomain: "ai-chat-app-ab6a3.firebaseapp.com",
  projectId: "ai-chat-app-ab6a3",
  storageBucket: "ai-chat-app-ab6a3.firebasestorage.app",
  messagingSenderId: "298149608756",
  appId: "1:298149608756:web:11348b15bdc0ed2d3df961",
  measurementId: "G-TKGNQ2ZWMT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export default db;