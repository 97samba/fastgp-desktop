import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import NavBar from "./NavBar";

const Layout = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return (
    <div>
      <Box m={9}>
        <NavBar />
      </Box>
      <Box my={2}>{children}</Box>
    </div>
  );
};

export default Layout;
