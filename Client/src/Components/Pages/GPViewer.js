import {
  Avatar,
  Button,
  Container,
  Divider,
  Grid,
  Pagination,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  FaCertificate,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaUserPlus,
  FaYoutube,
} from "react-icons/fa";
import {
  IoBusinessOutline,
  IoBusinessSharp,
  IoCallOutline,
  IoLogoFacebook,
  IoLogoInstagram,
} from "react-icons/io5";
import { useHistory } from "react-router";
import COLORS from "../../colors";
import { ENV } from "../../Env";
import ProfilPic from "../../Images/profile.svg";
import { AuthContext } from "../../Providers/AuthProvider";

const Right = () => {
  const Location = () => {
    return (
      <Paper variant="outlined">
        <Box p={2}>
          <Typography fontWeight={700}>Localisation (s)</Typography>
          <Stack direction="row" spacing={2} alignItems="center" color="GrayText" py={1}>
            <IoBusinessSharp />
            <Typography>Dakar, Sénégal</Typography>
          </Stack>
          <Stack direction="row" spacing={2} alignItems="center" color="GrayText">
            <IoBusinessOutline />
            <Typography>Paris, France</Typography>
          </Stack>
        </Box>
      </Paper>
    );
  };
  const Network = () => {
    return (
      <Paper variant="outlined">
        <Box p={2}>
          <Typography fontWeight={700}>Réseaux</Typography>
          <Stack direction="row" spacing={2} alignItems="center" color="GrayText">
            <IoCallOutline />
            <Typography>06 ** ** ** **</Typography>
          </Stack>
          <Stack direction="row" spacing={2} alignItems="center" color="GrayText" py={1}>
            <IoLogoFacebook />
            <Typography>Facebook</Typography>
          </Stack>
          <Stack direction="row" spacing={2} alignItems="center" color="GrayText">
            <IoLogoInstagram />
            <Typography>Instragram</Typography>
          </Stack>
        </Box>
      </Paper>
    );
  };
  const Similars = () => {
    return (
      <Paper variant="outlined">
        <Box p={2}>
          <Typography fontWeight={700}>Profils similaires</Typography>
          <Stack direction="column" spacing={2} my={2}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar>IF</Avatar>
              <Box>
                <Typography>Ibrahima Faye</Typography>
                <Typography variant="caption" color="GrayText">
                  Italie - Sénégal
                </Typography>
              </Box>
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar>SN</Avatar>
              <Box>
                <Typography>Sidiya NDOYE</Typography>
                <Typography variant="caption" color="GrayText">
                  Espagne - Mali
                </Typography>
              </Box>
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar>SR</Avatar>
              <Box>
                <Typography>Sarah RODRIGUEZ</Typography>
                <Typography variant="caption" color="GrayText">
                  Dakar - Portugal
                </Typography>
              </Box>
            </Stack>
          </Stack>
        </Box>
      </Paper>
    );
  };
  return (
    <Grid item sm={12} md={3} xl={3} lg={3} sx={{ display: { xs: "none", md: "block" } }}>
      <Stack direction="column" spacing={2}>
        <Location />
        <Network />
        <Similars />
      </Stack>
    </Grid>
  );
};

const MyFlights = () => {
  return (
    <Paper sx={{ p: 2, mb: 2 }} variant="outlined">
      <Box>
        <Typography gutterBottom variant="h5" fontWeight="bold" color="GrayText">
          Vols
        </Typography>

        <Divider />
        <Box display="flex" justifyContent="center" textAlign="center" flex={1} my={2}>
          <Pagination count={5} shape="rounded" />
        </Box>
      </Box>
    </Paper>
  );
};
const Presentation = () => {
  const { user, state, verifyToken } = useContext(GPViewerContext);
  const socials = [
    { icon: <FaFacebook size={17} />, link: "http://www.facebook.fr" },
    { icon: <FaInstagram size={17} />, link: "http://www.instagram.fr" },
    { icon: <FaYoutube size={17} />, link: "http://www.youtube.fr" },
    { icon: <FaTwitter size={17} />, link: "http://www.twitter.fr" },
  ];
  return (
    <Paper sx={{ p: 2, mb: 2 }} variant="outlined">
      <Paper variant="outlined" sx={{ background: "lightGray" }}>
        <Box flex={1}>
          <Typography py={10}></Typography>
        </Box>
      </Paper>
      <Stack direction="row" alignItems="flex-start">
        <Box width="20%" height="20%" p={2} mt={-10}>
          {state.loading ? (
            <Box bgcolor="white" borderRadius="100%" width={150} p={0.5}>
              <Skeleton width={150} height={150} variant="circular" />
            </Box>
          ) : (
            <Box bgcolor="white" borderRadius="100%" p={0.5}>
              <Avatar alt="test" src={ProfilPic} sx={{ width: "100%", height: "100%" }} />
            </Box>
          )}
        </Box>
        <Box m={2} flexGrow={1}>
          <Typography variant="h4">
            {state.loading ? <Skeleton width="80%" /> : user.firstName + " " + user.lastName}
          </Typography>
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography color="GrayText" variant="body1" minWidth="50%">
              {state.loading ? <Skeleton width="80%" /> : "Covaliseur (GP)"}
            </Typography>
            {!state.loading && <FaCertificate size={12} color={COLORS.primary} />}
          </Stack>
          <Typography color="GrayText" variant="body1">
            {state.loading ? <Skeleton width="50%" /> : "New York, United States"}
          </Typography>
          <Stack direction="row" spacing={2} my={2} color="GrayText">
            {socials.map((social, index) => (
              <Box minWidth={20} key={index}>
                {state.loading ? <Skeleton variant="circular" /> : social.icon}
              </Box>
            ))}
          </Stack>
        </Box>
        <Box m={2}>
          <Stack
            direction="row"
            spacing={2}
            divider={<Divider sx={{ py: 1 }} orientation="vertical" />}
            p={2}
          >
            <Stack direction="column" alignItems="center">
              <Typography variant="body1" minWidth={20}>
                {state.loading ? <Skeleton width="100%" /> : "33"}
              </Typography>
              <Typography>Vols</Typography>
            </Stack>
            <Stack direction="column" alignItems="center">
              <Typography variant="body1" minWidth={20}>
                {state.loading ? <Skeleton width="100%" /> : "234"}
              </Typography>
              <Typography>Abonnés</Typography>
            </Stack>
            <Stack direction="column" alignItems="center">
              <Typography variant="body1" minWidth={20}>
                {state.loading ? <Skeleton width="100%" /> : "456"}
              </Typography>
              <Typography>Colis</Typography>
            </Stack>
          </Stack>
          {state.loading ? (
            <Skeleton width="100%" height={40} />
          ) : (
            <Button startIcon={<FaUserPlus />} fullWidth variant="contained">
              Suivre
            </Button>
          )}
        </Box>
      </Stack>
    </Paper>
  );
};
export const GPViewerContext = createContext();

const GPViewer = () => {
  const { checkConnectivity, verifyToken } = useContext(AuthContext);
  const [state, setstate] = useState({ loading: true });
  const [user, setuser] = useState({});

  useEffect(() => {
    checkConnectivity(true);
    getProfileDetails();
  }, []);
  const getProfileDetails = () => {
    verifyToken();
    axios.defaults.headers.common = {
      Authorization: `Bearer ${localStorage.getItem("AuthToken")}`,
    };
    axios
      .get(`${ENV.proxy}userDetails`)
      .then((result) => {
        setuser(result.data.user);
        setstate({ ...state, loading: false });
      })
      .catch((error) => console.log(`error.response`, error.response));
  };
  return (
    <Container>
      <GPViewerContext.Provider value={{ user, state }}>
        <Grid container spacing={2}>
          <Grid item sm={12} md={9} xl={9} lg={9}>
            <Presentation />
            <MyFlights />
          </Grid>
          <Right />
        </Grid>
      </GPViewerContext.Provider>
    </Container>
  );
};

export default GPViewer;
