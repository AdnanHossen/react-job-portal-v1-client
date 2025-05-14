import React, { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import auth from "./../firebase/_firebase_init_";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  // state for users, loading
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // sign up new users
  const signUpAuth = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password).catch(
      (error) => {
        setLoading(false); // reset loading state
        throw error; //re-throw to let the caller handle it
      }
    );
  };

  // sign in existing users
  const signInAuth = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password).catch((error) => {
      setLoading(false); //reset loading state
      throw error; // re-throw to let the caller handle it
    });
  };

  // sign in with google
  const signInGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider).catch((error) => {
      setLoading(false); //reset loading state
      throw error;
    });
  };

  // sign out users
  const signOutAuth = () => {
    setLoading(true);
    return signOut(auth).finally(() => setLoading(false));
  };

  // authentication state
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setLoading(false);
      } else {
        setUser(null);
        setLoading(false);
      }
    });
    return () => unSubscribe();
  }, []);

  // authValue
  const value = {
    user,
    loading,
    signUpAuth,
    signInAuth,
    signInGoogle,
    signOutAuth,
  };

  // return
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
