import React, { useContext, useState, useEffect } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, onAuthStateChanged } from "firebase/auth";
import {firestore} from "../firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import {globalUser} from "./globals"
const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();

  const authInstance = getAuth();
  const db = firestore;

function signup(email, password,name) {
    // if(!email.endsWith("@edu.p.lodz.pl")){
    //   throw new Error("Adress e-mail musi zawierać domenę @edu.p.lodz.pl");
    // }

    return createUserWithEmailAndPassword(authInstance,email, password)
    .then((userCredential)=>{
      const user = userCredential.user;
      const uid = user.uid;
      globalUser.uid = uid;
      globalUser.name = user.name;
      globalUser.email = user.email;
      return setDoc(doc(collection(db,"users"),uid),{
        uid: uid,
        name: name,
        email: email
      });
    })
    .catch(error => {
      console.error("Error during signup: ", error);
      throw error;
    })
  }

  function login(email,password){
    return signInWithEmailAndPassword(authInstance, email, password)
    .then((userCredential)=>{
      const user = userCredential.user;
      const uid = user.uid;
      globalUser.uid = uid;
      globalUser.name = user.name;
      globalUser.email = user.email;
    })
    .catch(error=>{
      console.error("Error during login: ", error);
      throw error;
    })
  }

  function logout(){
    return authInstance.signOut();
  }

  function resetPassword(email){
    return sendPasswordResetEmail(authInstance,email)
    .catch((error)=>{
      console.error("Error during password reset: ", error);
      throw error;
    });
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authInstance,(user) => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, [authInstance]);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
