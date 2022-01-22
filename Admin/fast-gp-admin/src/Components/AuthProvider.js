import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { createContext } from "react";
import { auth } from "../firebase/config";

export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    var subscriber = onAuthStateChanged(auth, (value) => setCurrentUser(value));
    console.log(`currentUser`, currentUser);
    return subscriber;
  }, [currentUser]);
  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
