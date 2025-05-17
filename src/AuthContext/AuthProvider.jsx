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
import axios from "axios";

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
      setUser(currentUser);
      if (currentUser?.email) {
        // for token generation
        const user = currentUser?.email;
        axios
          .post(
            "http://localhost:5000/jwt",
            { user },
            { withCredentials: true }
          )
          .then((res) => {
            console.log("login token", res.data);
            setLoading(false);
          });
      } else {
        // for token removal
        axios
          .post("http://localhost:5000/logout", {}, { withCredentials: true })
          .then((res) => {
            console.log("logout", res.data);
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
          });
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
