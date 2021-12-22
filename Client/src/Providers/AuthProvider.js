import React, { createContext, useState } from "react";
import SignUpDialog from "../Components/SignUpDialog";

export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [openConnectionDialog, setopenConnectionDialog] = useState(false);
  function handelOpenSignInDialog() {
    setopenConnectionDialog(true);
  }
  function handleClose() {
    setopenConnectionDialog(false);
  }
  return (
    <AuthContext.Provider value={{ openConnectionDialog, handelOpenSignInDialog, handleClose }}>
      {children}
      <SignUpDialog open={openConnectionDialog} />
    </AuthContext.Provider>
  );
};

export default AuthProvider;
