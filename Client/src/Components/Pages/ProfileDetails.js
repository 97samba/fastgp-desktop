import {
  Avatar,
  Button,
  ButtonBase,
  Container,
  Grid,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { createContext, useContext, useState } from "react";
import { FaUserAlt, FaUsers } from "react-icons/fa";
import { GoPackage } from "react-icons/go";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoLocationSharp } from "react-icons/io5";
import { MdPayment } from "react-icons/md";
import { RiMedal2Line } from "react-icons/ri";
import COLORS from "../../colors";
import Profile from "../ProfileDetailsComponents/Profile";

const Left = () => {
  const boardTab = [
    {
      label: "Mon profil",
      icon: <FaUserAlt />,
      key: "myProfile",
    },
    {
      label: "Localisation",
      icon: <IoLocationSharp size={17} />,
      key: "location",
    },
    {
      label: "Méthodes de paiement",
      icon: <MdPayment size={17} />,
      key: "payments",
    },
  ];
  const dashTab = [
    {
      label: "Mes colis",
      icon: <GoPackage />,
      key: "packages",
    },
    {
      label: "Mes GP",
      icon: <FaUsers size={17} />,
      key: "gps",
    },
    {
      label: "Favoris",
      icon: <IoMdHeartEmpty size={17} />,
      key: "favorites",
    },
  ];
  return (
    <Paper elevation={0} sx={{ boxShadow: "0px 1px 3px rgba(3, 0, 71, 0.2)" }}>
      <Box>
        <Typography variant="body2" color="GrayText" px={2} pt={2}>
          Compte
        </Typography>
        <Box>
          <MenuList>
            {boardTab.map((tab) => (
              <MenuItem
                key={tab.key}
                sx={{ "&:hover": { borderLeft: "4px solid " + COLORS.warning } }}
              >
                <ListItemIcon>{tab.icon}</ListItemIcon>
                <ListItemText>{tab.label}</ListItemText>
              </MenuItem>
            ))}
          </MenuList>
        </Box>
        <Typography variant="body2" color="GrayText" px={2} pt={2}>
          Tableau de bord
        </Typography>
        <Box pb={1}>
          <MenuList>
            {dashTab.map((dash) => (
              <MenuItem
                key={dash.key}
                sx={{ "&:hover": { borderLeft: "4px solid " + COLORS.warning } }}
              >
                <ListItemIcon>{dash.icon}</ListItemIcon>
                <ListItemText>{dash.label}</ListItemText>
              </MenuItem>
            ))}
          </MenuList>
        </Box>
      </Box>
    </Paper>
  );
};
const Right = () => {
  return <Profile />;
};

export const ProfileDetailsContext = createContext();

const ProfileDetails = () => {
  const [profilState, setprofilState] = useState({
    icon: <FaUserAlt color={COLORS.warning} />,
    label: "Mon profil",
  });
  return (
    <ProfileDetailsContext.Provider value={{ profilState, setprofilState }}>
      <Container>
        <Grid container spacing={4} py={4}>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
            <Left />
          </Grid>
          <Grid item xs={12} sm={12} md={9} lg={9} xl={9}>
            <Right />
          </Grid>
        </Grid>
      </Container>
    </ProfileDetailsContext.Provider>
  );
};

export default ProfileDetails;
