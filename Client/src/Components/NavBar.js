import React, { useContext, useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { IoLogOut, IoPersonSharp, IoSettings } from "react-icons/io5";
import { AuthContext } from "../Providers/AuthProvider";
import { useHistory } from "react-router-dom";
import { Avatar, Divider, ListItemIcon, Menu, MenuItem } from "@mui/material";
import { FaShippingFast } from "react-icons/fa";
import { logout, useAuth } from "../firebase/db";

const UserMenu = ({ history }) => {
  const { logOut, checkConnectivity } = useContext(AuthContext);
  const [anchorEl, setanchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClose = () => {
    setanchorEl(null);
  };
  const handleOpen = (e) => {
    setanchorEl(e.currentTarget);
  };
  const visitProfil = () => {
    checkConnectivity(true);
    history.push("GPprofile");
  };
  return (
    <Box>
      <IconButton onClick={handleOpen}>
        <Avatar>S</Avatar>
      </IconButton>
      <Menu open={open} onClose={handleClose} anchorEl={anchorEl} sx={{ mt: 1 }} elevation={0.5}>
        <MenuItem onClick={visitProfil}>
          <ListItemIcon>
            <IoPersonSharp />
          </ListItemIcon>
          Profil
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <FaShippingFast />
          </ListItemIcon>
          Mes colis
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <IoSettings />
          </ListItemIcon>
          Paramétres
        </MenuItem>
        <Box px={1}>
          <Divider />
        </Box>
        <MenuItem onClick={logout}>
          <ListItemIcon>
            <IoLogOut />
          </ListItemIcon>
          Se déconnecter
        </MenuItem>
      </Menu>
    </Box>
  );
};
export default function NavBar() {
  const currentUser = useAuth();
  const history = useHistory();

  const BecomeGp = () => {
    if (!currentUser.email) {
      history.push("login");
    }
  };

  return (
    <Box sx={{ flexGrow: 1, width: "100%", mb: 10 }}>
      <AppBar position="fixed" elevation={0}>
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Fast GP
          </Typography>

          <Button color="inherit" style={{ textTransform: "none" }}>
            Shop
          </Button>
          <Button color="inherit" style={{ textTransform: "none" }}>
            Envoyer un colis
          </Button>
          <Button color="inherit" style={{ textTransform: "none" }} onClick={BecomeGp}>
            Transporter des colis
          </Button>
          {currentUser ? (
            <UserMenu history={history} />
          ) : (
            <Button onClick={() => history.push("login")} color="inherit">
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
