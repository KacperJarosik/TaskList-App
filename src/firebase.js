import firebase from "firebase/app"
import firebase from "firebase/auth"
import {getFirestore} from "@firebase/firestore"
import { getAnalytics } from "firebase/analytics"

//configuracja kluczy do firebase'a
const firebaseApp = firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE__STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
})

//inicjalizacja firebase'a i bazy firestore
export const auth = firebaseApp.auth();
const firestore = getFirestore(firebaseApp);
const analytics = getAnalytics(firebaseApp);
export default firebaseApp