import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import COLORS from "../colors";
import NavBar from "./NavBar";

const Layout = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return (
    <div>
      <Box mb={9}>
        <NavBar />
      </Box>
      <Box pb={5} bgcolor={COLORS.background}>
        {children}
      </Box>
    </div>
  );
};

export default Layout;
