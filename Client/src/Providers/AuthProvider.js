import React, { createContext, useState } from "react";

export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [user, setuser] = useState({ token: localStorage.getItem("AuthToken") });

  return <AuthContext.Provider value={{ user, setuser }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
