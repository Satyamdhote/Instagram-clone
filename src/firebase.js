import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/storage";
import "firebase/compat/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBR8CT8A4_NjwdeOYxoSKzIpMPoYKgKZ24",
  authDomain: "instagram-bccf8.firebaseapp.com",
  projectId: "instagram-bccf8",
  storageBucket: "instagram-bccf8.appspot.com",
  messagingSenderId: "207711568469",
  appId: "1:207711568469:web:ceefe7f8ef2ce660b60adc",
  measurementId: "G-RXCP0C655J",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

const firestore = firebase.firestore();
export const database = {
  users: firestore.collection("users"),
  posts: firestore.collection("posts"),
  //   comments: firestore.collection("comments"),
  getTimeStamp: firebase.firestore.FieldValue.serverTimestamp,
};

export const storage = firebase.storage();
