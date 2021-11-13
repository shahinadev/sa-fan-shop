import React, { useEffect, useState } from "react";
import FirebaseApp from "./../components/firebase/Firebase_init";
import axios from "axios";
import { Swal } from "sweetalert2";
import {
  getAuth,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
FirebaseApp();

const useFirebase = () => {
  //store auth user into user state
  const [user, setUser] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  //handle data fetched or not
  const [isLoading, setIsLoading] = useState(true);
  const [adminLoading, setAdminLoading] = useState(true);

  //firebase auth
  const auth = getAuth();

  //handle google sign in
  const googleProvider = new GoogleAuthProvider();

  const signInWithGoogle = (redirect) => {
    setIsLoading(true);
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        saveUser(res.user.displayName, res.user.email);
        // history.replace(redirect.pathname);
        window.location.replace(redirect.pathname);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  //handle email and password auth
  const createAccountEmailAndPassword = ({
    email,
    password,
    username,
    redirect,
  }) => {
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        saveUser(username, email);
        //update profile for set the username
        updateProfile(auth.currentUser, {
          displayName: username,
        })
          .then((res) => {
            // history.push(redirect_uri);
            window.location.replace(redirect.pathname);
            Swal.fire({
              icon: "success",
              title: "Account Create successfully..",
              showConfirmButton: false,
              timer: 1500,
            });
          })
          .catch((err) => setError(err.message));
        window.location.replace(redirect);
        //send email verification link
        sendEmailVerification(auth.currentUser)
          .then((res) => {
            setMessage("Please verity your email address");
          })
          .catch((err) => setError(err.message));
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const signInWithEmailPassword = ({ email, password, redirect }) => {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        setMessage("Sign In Successfully., redirect in 1 seconds");
        setTimeout(() => {
          // history.push(redirect);
          console.log(redirect.pathname);
          window.location.replace(redirect.pathname);
        }, 1000);
      })
      .catch((err) => {
        if (err.message.includes("user-not-found")) {
          setError("No user found with those info.");
        } else if (err.message.includes("password-not-match")) {
          setError("Password not match..");
        } else {
          setError(err.message);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  //handle LogOut
  const logOut = () => {
    signOut(auth).then((res) => {});
  };
  //save user to database
  const saveUser = (displayName, email) => {
    const data = {
      displayName,
      email,
      added_date: new Date().toLocaleDateString(),
      role: "user",
    };
    axios
      .post("https://blooming-escarpment-34729.herokuapp.com//add-user", data)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err.message));
  };

  //load admin user data
  useEffect(() => {
    setAdminLoading(true);
    axios
      .get(`https://blooming-escarpment-34729.herokuapp.com/user/${user.email}`)
      .then((data) => {
        if (data.data[0].role === "admin") {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      })
      .catch((err) => console.dir)
      .finally(() => {
        setAdminLoading(false);
      });
  }, [user]);
  //handle on auth state changed
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setError("");
      } else {
        setUser({});
        setError("");
        setMessage("");
      }
      setIsLoading(false);
    });
    return () => unsubscribe;
  }, []);

  return {
    signInWithGoogle,
    createAccountEmailAndPassword,
    signInWithEmailPassword,
    user,
    isLoading,
    logOut,
    error,
    saveUser,
    isAdmin,
    message,
    adminLoading,
  };
};

export default useFirebase;
