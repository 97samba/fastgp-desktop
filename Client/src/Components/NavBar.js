import React, { useContext, useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { IoLogOut, IoPersonSharp, IoSettings } from "react-icons/io5";
import { useHistory } from "react-router-dom";
import { Avatar, Divider, Link, ListItemIcon, Menu, MenuItem, Stack } from "@mui/material";
import { FaPlaneDeparture, FaShippingFast, FaShoppingBasket } from "react-icons/fa";
import { logout, useAuth } from "../firebase/auth";
import { IoMdHome } from "react-icons/io";
import { GoPackage } from "react-icons/go";
import COLORS from "../colors";
import { MdOutlineInsertPhoto } from "react-icons/md";

const barHeight = "60 px";
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
    handleClose();
  };
  function handleLogOut() {
    logout();
    history.replace("/");
    history.push("/");
    handleClose();
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
      <Menu open={open} onClose={handleClose} anchorEl={anchorEl} sx={{ mt: 1 }} elevation={1}>
        <Stack alignItems="center" py={2} px={4}>
          <Avatar sx={{ width: 50, height: 50 }}>{getAvatar()}</Avatar>
          <IconButton
            color="primary"
            size="small"
            sx={{
              mt: -2,
              ml: 6,
              background: "white",
              textAlign: "center",
            }}
          >
            <MdOutlineInsertPhoto />
          </IconButton>
          <Typography variant="body1" fontWeight="bold" color="primary">
            {currentUser?.displayName}
          </Typography>
          <Typography variant="body2" color="GrayText">
            {currentUser?.email}
          </Typography>
        </Stack>
        <Box px={1}>
          <Divider />
        </Box>
        <MenuItem onClick={visitProfil}>
          <ListItemIcon>
            <IoPersonSharp />
          </ListItemIcon>
          Mon profil
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
  const navLinks = [
    {
      label: "Acceuil",
      path: "/",
      icon: <IoMdHome color={COLORS.warning} size={18} />,
    },
    {
      label: "Shop",
      path: "/shop",
      icon: <FaShoppingBasket color={COLORS.warning} size={18} />,
    },
    {
      label: "Envoyer",
      path: "/search",
      icon: <GoPackage color={COLORS.warning} size={18} />,
    },
    {
      label: "Transporter",
      path: "/create",
      icon: <FaPlaneDeparture color={COLORS.warning} size={18} />,
    },
  ];

  const BecomeGp = () => {
    history.push("/create");
  };

  return (
    <Box sx={{ flexGrow: 1, width: "100%" }} mb={7}>
      <AppBar position="fixed" elevation={0} sx={{ height: barHeight }}>
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Stack direction="row" flexGrow={1}>
            <Button
              onClick={() => history.location.pathname != "/" && history.push("/")}
              endIcon={<FaShippingFast color="white" size={25} />}
            >
              <Typography variant="h6" color="white">
                Fast GP
              </Typography>
            </Button>
            <Stack
              direction="row"
              flex={1}
              justifyContent="center"
              spacing={2}
              display={{ xs: "none", sm: "none", md: "flex" }}
            >
              {navLinks.map((link, index) => (
                <Link href={link.path} key={index} underline="none">
                  <MenuItem sx={{ height: 60 }} href="/create">
                    <Typography mr={1} color="white">
                      {link.label}
                    </Typography>
                    {link.icon}
                  </MenuItem>
                </Link>
              ))}
            </Stack>
          </Stack>
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
