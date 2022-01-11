import {
  AppBar,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { MdLogout, MdOutlineSpaceDashboard } from "react-icons/md";
import { FaCog, FaFolder, FaPlus, FaShippingFast, FaShoppingBag, FaUsersCog } from "react-icons/fa";
import { GoPackage } from "react-icons/go";
import COLORS from "../colors";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../firebase/auth";

const drawerWidth = 250;
const toolbarWidth = 60;
const Layout = ({ children }) => {
  const navigate = useNavigate();

  const menuItems = [
    {
      text: "DashBoard",
      icon: <MdOutlineSpaceDashboard color="primary" />,
      path: "/",
    },
    {
      text: "Colis",
      icon: <GoPackage color="primary" />,
      path: "/packages",
    },
    {
      text: "Création",
      icon: <FaPlus color="primary" />,
      path: "/create",
    },
    {
      text: "Gestion",
      icon: <FaFolder color="primary" />,
      path: "/manage",
    },
    {
      text: "ecommerce",
      icon: <FaShoppingBag color="primary" />,
      path: "/shop",
    },
    {
      text: "Utilisateurs",
      icon: <FaUsersCog color="primary" />,
      path: "/users",
    },
    {
      text: "Parametres",
      icon: <FaCog color="primary" />,
      path: "/settings",
    },
  ];
  return (
    <Box>
      {/* <AppBar className={classes.appbar} elevation={0}> */}
      <AppBar sx={{ width: `calc(100% - ${drawerWidth}px)`, height: toolbarWidth }}>
        {/* <Toolbar className={classes.toolbar}> */}
        <Toolbar>
          <Typography variant="h6">Admin: v1.0 </Typography>
        </Toolbar>
      </AppBar>

      <Drawer elevation={0} variant="permanent" anchor="left">
        <Box width={drawerWidth}>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            my={3}
            alignItems="center"
            width={drawerWidth}
          >
            <Typography variant="h5" color="primary">
              FAST GP
            </Typography>
            <FaShippingFast color={COLORS.primary} size={20} />
          </Stack>
          <List sx={{ flexGrow: 1 }}>
            <Box display="block" justifyContent="space-around">
              {menuItems.map((item) => (
                <Box
                  px={2}
                  //Affiche une petite bordure sur la page courante
                  // borderRight={location.pathname === item.path ? 2 : 0}
                >
                  <ListItem
                    sx={{ borderRadius: 2 }}
                    key={item.text}
                    button
                    onClick={() => navigate(item.path)}
                    //   className={location.pathname === item.path ? classes.active : classes.nonActive}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItem>
                </Box>
              ))}
              <Box p={2}>
                <ListItem
                  sx={{ borderRadius: 2 }}
                  key="logOut"
                  button
                  onClick={() => logoutUser()}
                  //   className={location.pathname === item.path ? classes.active : classes.nonActive}
                >
                  <ListItemIcon>
                    <MdLogout color="red" />
                  </ListItemIcon>
                  <ListItemText color="red" primary="Déconnexion" />
                </ListItem>
              </Box>
            </Box>
          </List>
        </Box>
      </Drawer>

      {/**future page */}
      <Box width={`calc(100% - ${drawerWidth}px)`} mt={toolbarWidth + "px"} ml={drawerWidth + "px"}>
        <div></div>
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
