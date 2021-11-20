import React, { createContext, useState } from "react";
import { useHistory } from "react-router";
import { auth } from "../firebase/db";

export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [user, setuser] = useState({ token: localStorage.getItem("AuthToken") });
  const history = useHistory();
  const logOut = () => {
    localStorage.removeItem("AuthToken");
    history.location.pathname === "/" ? history.go(0) : history.push("/");
  };
  const storeTokenAndRedirect = (token, path, state) => {
    localStorage.setItem("AuthToken", token);
    history.push({ pathname: path, state: state });
    history.go(0);
  };
  const verifyToken = () => {
    console.log(`auth.current`, auth.currentUser);
    // auth.currentUser.getIdToken().then((value) => console.log(`value`, value));
  };
  const checkConnectivity = (connected) => {
    if (localStorage.getItem("AuthToken") === null) {
      history.push("login");
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, setuser, logOut, storeTokenAndRedirect, checkConnectivity, verifyToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
