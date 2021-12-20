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
import { FaPlaneDeparture, FaUserAlt, FaUsers } from "react-icons/fa";
import { GoPackage } from "react-icons/go";
import { IoMdHeartEmpty, IoMdPricetags } from "react-icons/io";
import { IoLocationSharp } from "react-icons/io5";
import { MdPayment } from "react-icons/md";
import COLORS from "../../colors";
import Profile from "../ProfileDetailsComponents/Profile";
import { useHistory, useParams } from "react-router-dom";
import { userDetails } from "../../firebase/db";
import PaymentMethod from "../ProfileDetailsComponents/PaymentMethod";
import Location from "../ProfileDetailsComponents/Location";
import Packages from "../ProfileDetailsComponents/Packages";
import { useAuth } from "../../firebase/auth";
import MyAnnouces from "../ProfileDetailsComponents/MyAnnouces";
import Reservations from "../ProfileDetailsComponents/Reservations";

export const boardTab = [
  {
    label: "Profil",
    icon: <FaUserAlt color="GrayText" />,
    key: "myProfile",
    secured: false,
  },
  {
    label: "Adresses",
    icon: <IoLocationSharp size={17} color="GrayText" />,
    key: "location",
    secured: true,
  },
  {
    label: "Mode de paiement",
    icon: <MdPayment size={17} color="GrayText" />,
    key: "payments",
    secured: true,
  },
];
export const dashTab = [
  {
    label: "Mes colis",
    icon: <GoPackage />,
    key: "packages",
    secured: true,
  },
  {
    label: "Mes GP",
    icon: <FaUsers size={17} />,
    key: "gps",
    secured: true,
  },
  {
    label: "Annonces",
    icon: <FaPlaneDeparture size={15} />,
    key: "flights",
    secured: false,
  },
  {
    label: "Favoris",
    icon: <IoMdHeartEmpty size={17} />,
    key: "favorites",
    secured: true,
  },
  {
    label: "Reservations",
    icon: <IoMdPricetags size={17} />,
    key: "reservations",
    secured: true,
  },
];
const Left = () => {
  const { profilState, goToPage, currentUser, id } = useContext(ProfileDetailsContext);

  return (
    <Paper elevation={0} sx={{ boxShadow: "0px 1px 3px rgba(3, 0, 71, 0.2)" }}>
      <Box>
        <Typography variant="body2" color="GrayText" px={2} pt={2}>
          Compte
        </Typography>
        <Box>
          <MenuList>
            {boardTab.map(
              (tab) =>
                (!tab.secured || currentUser?.uid === id) && (
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
                )
            )}
          </MenuList>
        </Box>
        <Typography variant="body2" color="GrayText" px={2} pt={2}>
          Tableau de bord
        </Typography>
        <Box pb={1}>
          <MenuList>
            {dashTab.map(
              (dash) =>
                (!dash.secured || currentUser?.uid === id) && (
                  <MenuItem
                    key={dash.key}
                    sx={{
                      "&:hover": { borderLeft: "4px solid " + COLORS.warning },
                      borderLeft:
                        profilState.label === dash.label ? "4px solid " + COLORS.warning : "none",
                    }}
                    onClick={() => goToPage(dash.label, dash.key, dash.icon)}
                  >
                    <ListItemIcon>{dash.icon}</ListItemIcon>
                    <ListItemText>{dash.label}</ListItemText>
                  </MenuItem>
                )
            )}
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
    {
      key: "packages",
      item: <Packages />,
    },
    {
      key: "gps",
      item: <Location />,
    },
    {
      key: "flights",
      item: <MyAnnouces />,
    },
    {
      key: "favorites",
      item: <Location />,
    },
    {
      key: "reservations",
      item: <Reservations />,
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
  const currentUser = useAuth();
  const history = useHistory();
  const [profilState, setprofilState] = useState({
    loading: true,
  });

  const [loading, setloading] = useState(true);
  const [user, setuser] = useState();

  async function getPage() {
    var pageInfo = dashTab.filter((tab) => tab.key === subpage);
    if (pageInfo.length === 0) {
      pageInfo = boardTab.filter((tab) => tab.key === subpage);
    }
    if (pageInfo.length === 0) {
      setprofilState({ ...profilState, ...boardTab[0] });
      history.replace("/profilDetails/" + id + "/" + boardTab[0].key);
    } else {
      setprofilState({ ...profilState, ...pageInfo[0] });
    }
  }

  function goToPage(label, key, icon) {
    setprofilState({ ...profilState, label, key, icon });
    history.push("/profilDetails/" + id + "/" + key);
  }

  async function getUser() {
    if (id) {
      await getPage();
      var result = await userDetails(id);
      setuser(result);
      setloading(false);
    } else {
      history.push("/login");
    }
  }
  function getAvatar() {
    if (currentUser) {
      return currentUser?.displayName?.charAt(0);
    }
  }
  useEffect(() => {
    // console.log(`currentUser`, currentUser);
    getUser();
  }, []);

  return (
    <ProfileDetailsContext.Provider
      value={{
        profilState,
        setprofilState,
        user,
        setuser,
        goToPage,
        loading,
        currentUser,
        id,
        getAvatar,
      }}
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
