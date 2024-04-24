import {initializeApp} from "firebase/app"
import {getFirestore} from "@firebase/firestore"

//configuracja kluczy do firebase'a
const firebaseConfig = {
    apiKey: "AIzaSyCUEKsdhhfwm5MN_4tO6yPB1hVJoHBmyZE",
    authDomain: "tasklistapp-deddb.firebaseapp.com",
    projectId: "tasklistapp-deddb",
    storageBucket: "tasklistapp-deddb.appspot.com",
    messagingSenderId: "1012734704162",
    appId: "1:1012734704162:web:3af62a55791eb052f8a87b",
    measurementId: "G-S0L825FK7Z"
  };
  //inicjalizacja firebase'a i bazy firestore
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);

