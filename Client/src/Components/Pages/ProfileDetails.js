import {
  Container,
  Grid,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { createContext, useContext, useEffect, useState } from "react";
import { FaUserAlt, FaUsers } from "react-icons/fa";
import { GoPackage } from "react-icons/go";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoLocationSharp } from "react-icons/io5";
import { MdPayment } from "react-icons/md";
import COLORS from "../../colors";
import Profile from "../ProfileDetailsComponents/Profile";
import { useHistory, useParams } from "react-router-dom";
import { userDetails } from "../../firebase/db";
import PaymentMethod from "../ProfileDetailsComponents/PaymentMethod";
import Location from "../ProfileDetailsComponents/Location";

const Left = () => {
  const { profilState, goToPage } = useContext(ProfileDetailsContext);

  const boardTab = [
    {
      label: "Mon profil",
      icon: <FaUserAlt color={profilState.key === "myProfile" ? COLORS.warning : "GrayText"} />,
      key: "myProfile",
    },
    {
      label: "Adresses",
      icon: (
        <IoLocationSharp
          size={17}
          color={profilState.key === "location" ? COLORS.warning : "GrayText"}
        />
      ),
      key: "location",
    },
    {
      label: "Mode de paiement",
      icon: (
        <MdPayment size={17} color={profilState.key === "payments" ? COLORS.warning : "GrayText"} />
      ),
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
                sx={{
                  "&:hover": { borderLeft: "4px solid " + COLORS.warning },
                  borderLeft:
                    profilState.label === tab.label ? "4px solid " + COLORS.warning : "none",
                }}
                onClick={() => goToPage(tab.label, tab.key, tab.icon)}
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
  const { profilState } = useContext(ProfileDetailsContext);

  const renders = [
    {
      key: "payments",
      item: <PaymentMethod />,
    },
    {
      key: "myProfile",
      item: <Profile />,
    },
    {
      key: "location",
      item: <Location />,
    },
  ];
  function getItem() {
    return renders.map((render) => {
      if (render.key === profilState.key) {
        return render.item;
      }
    });
  }
  return <Box>{getItem()}</Box>;
};

export const ProfileDetailsContext = createContext();

const ProfileDetails = () => {
  const { id, subpage, subID } = useParams();
  const history = useHistory();
  const [profilState, setprofilState] = useState({
    icon: <FaUserAlt color={COLORS.warning} />,
    label: "Mon profil",
    key: "myProfile",
    loading: true,
  });

  const [user, setuser] = useState();
  function goToPage(label, key, icon) {
    setprofilState({ ...profilState, label, key, icon });
    history.push("/profilDetails/" + id + "/" + key);
  }

  async function getUser() {
    if (id) {
      var result = await userDetails(id);
      setuser(result);
      setprofilState({ ...profilState, loading: false });
    } else history.push("/login");
  }
  useEffect(() => {
    getUser();
  }, []);

  return (
    <ProfileDetailsContext.Provider
      value={{ profilState, setprofilState, user, setuser, goToPage }}
    >
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
