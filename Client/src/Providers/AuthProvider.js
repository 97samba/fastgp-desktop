import React, { createContext, useEffect, useState } from "react";
import SignUpDialog from "../Components/SignUpDialog";
import { useAuth } from "../firebase/auth";

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
        <AuthContext.Provider
            value={{
                openConnectionDialog,
                handelOpenSignInDialog,
                handleClose,
            }}
        >
            {children}
            <SignUpDialog />
        </AuthContext.Provider>
    );
};

export default AuthProvider;
