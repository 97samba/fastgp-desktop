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
import { logout, useAuth } from "../firebase/auth";
import { AiOutlineFieldTime } from "react-icons/ai";

const UserMenu = ({ history, currentUser }) => {
  const [anchorEl, setanchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClose = () => {
    setanchorEl(null);
  };
  const handleOpen = (e) => {
    setanchorEl(e.currentTarget);
  };
  const visitProfil = () => {
    history.push(`/GPprofile/${currentUser?.uid}`);
  };
  function handleLogOut() {
    logout();
    history.replace("/");
    history.push("/");
  }
  function getAvatar() {
    if (currentUser) {
      return currentUser.displayName.charAt(0);
    }
  }

  return (
    <Box>
      <IconButton onClick={handleOpen}>
        <Avatar>{getAvatar()}</Avatar>
      </IconButton>
      <Menu open={open} onClose={handleClose} anchorEl={anchorEl} sx={{ mt: 1 }} elevation={0}>
        <MenuItem onClick={visitProfil}>
          <ListItemIcon>
            <IoPersonSharp />
          </ListItemIcon>
          {currentUser?.displayName}
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
        <MenuItem onClick={handleLogOut}>
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
    history.push("/create");
  };

  return (
    <Box sx={{ flexGrow: 1, width: "100%", mb: 10 }}>
      <AppBar position="fixed" elevation={0}>
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Box flexGrow={1}>
            <Button
              onClick={() => history.location.pathname != "/" && history.push("/")}
              endIcon={<FaShippingFast color="white" size={25} />}
            >
              <Typography variant="h6" color="white">
                Fast GP
              </Typography>
            </Button>
          </Box>

          <Button color="inherit" style={{ textTransform: "none" }}>
            Shop
          </Button>
          <Button
            color="inherit"
            style={{ textTransform: "none" }}
            onClick={() => history.push("/search")}
          >
            Envoyer un colis
          </Button>
          <Button color="inherit" style={{ textTransform: "none" }} onClick={BecomeGp}>
            Transporter des colis
          </Button>
          {currentUser ? (
            <UserMenu history={history} currentUser={currentUser} />
          ) : (
            <Box>
              {currentUser === null ? (
                <Button onClick={() => history.push("/login")} color="inherit">
                  Login
                </Button>
              ) : null}
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
