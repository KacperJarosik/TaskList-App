import {initializeApp} from "firebase/app";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";

//konfiguracja kluczy do firebase'a
const firebaseConfig = {
    apiKey: "AIzaSyCUEKsdhhfwm5MN_4tO6yPB1hVJoHBmyZE",
    authDomain: "tasklistapp-deddb.firebaseapp.com",
    projectId: "tasklistapp-deddb",
    storageBucket: "tasklistapp-deddb.appspot.com",
    messagingSenderId: "1012734704162",
    appId: "1:1012734704162:web:3af62a55791eb052f8a87b",
    measurementId: "G-S0L825FK7Z"
  };
  //inicjalizacja firebase'a, bazy firestore, auth
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);
export { auth, firestore, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, collection, doc, setDoc };
export default app;



