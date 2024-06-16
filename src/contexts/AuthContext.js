import React, { useContext, useState, useEffect } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, onAuthStateChanged } from "firebase/auth";
import { firestore } from "../firebase";
import { collection, doc, setDoc } from "firebase/firestore";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();

  const authInstance = getAuth();
  const db = firestore;

  function signup(email, password, name) {
    return createUserWithEmailAndPassword(authInstance, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const uid = user.uid;
        localStorage.setItem("uid",user.uid);
        localStorage.setItem("name",user.name);
        localStorage.setItem("email",user.email);
        setCurrentUser(user);
        console.log(user);
        return setDoc(doc(collection(db, "users"), uid), {
          uid: uid,
          name: name,
          email: email
        });
      })
      .catch(error => {
        console.error("Error during signup: ", error);
        throw error;
      });

  }

  function login(email, password) {
    return signInWithEmailAndPassword(authInstance, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const uid = user.uid;
        localStorage.setItem("uid",user.uid);
        localStorage.setItem("name",user.name);
        localStorage.setItem("email",user.email);
        setCurrentUser(user);
      })
      .catch(error => {
        console.error("Error during login: ", error);
        throw error;
      });
  }

  function loggingout() {
    localStorage.setItem("uid","");
        localStorage.setItem("name","");
        localStorage.setItem("email","");
    localStorage.clear();

    return authInstance.signOut();
  }

  async function resetPassword(email) {
    return sendPasswordResetEmail(authInstance, email)
      .catch(error => {
        console.error("Error during password reset: ", error);
        throw error;
      });
  }
  const value = {
    currentUser,
    signup,
    login,
    loggingout,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
