import {
  Avatar,
  Button,
  Container,
  Divider,
  Grid,
  LinearProgress,
  Pagination,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  FaCertificate,
  FaFacebook,
  FaInstagram,
  FaRegStar,
  FaStar,
  FaStarHalfAlt,
  FaTwitter,
  FaUserEdit,
  FaUserPlus,
  FaYoutube,
} from "react-icons/fa";
import { IoBusinessSharp, IoLogoFacebook, IoLogoInstagram, IoLogoWhatsapp } from "react-icons/io5";
import { useHistory, useParams } from "react-router";
import COLORS from "../../colors";
import { useAuth } from "../../firebase/auth";
import { FollowGP, getUserFlights, UnFollowGP, userDetails } from "../../firebase/db";
import ProfilPic from "../../Images/profile.svg";
import Flight from "../Flight";
import FlightSkeleton from "../FlightSkeleton";

const Right = ({ userFlights }) => {
  const Location = () => {
    const [destinations, setdestinations] = useState([]);
    var locs = [];
    useEffect(() => {
      userFlights.length > 0 &&
        userFlights.map((flight) => {
          !locs.includes(flight.departure.name + ", " + flight.departure.country) &&
            locs.push(flight.departure.name + ", " + flight.departure.country);
          !locs.includes(flight.destination.name + ", " + flight.destination.country) &&
            locs.push(flight.destination.name + ", " + flight.destination.country);
        });
      setdestinations(locs);
    }, [userFlights]);
    return (
      <Paper variant="outlined">
        <Box p={2}>
          <Typography fontWeight={700} color="primary">
            Localisation (s)
          </Typography>
          {destinations.length > 0 &&
            destinations.map((loc, index) => (
              <Stack
                direction="row"
                key={index}
                spacing={2}
                alignItems="center"
                color="GrayText"
                py={1}
              >
                <IoBusinessSharp color={COLORS.warning} />
                <Typography color="GrayText">{loc}</Typography>
              </Stack>
            ))}
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
            <IoLogoWhatsapp />
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
const Reviews = () => {
  return (
    <Box my={4}>
      <Box>
        <Typography variant="h5" fontWeight={600} color="primary">
          12 Notes
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <Paper variant="outlined" sx={{ m: 2 }}>
              <Box p={3}>
                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="flex-end"
                  justifyContent="center"
                  my={1}
                  color={COLORS.warning}
                >
                  <Typography variant="h4" fontWeight={600}>
                    4.5
                  </Typography>
                  <Typography variant="h6" fontWeight="bold">
                    / 5
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1} my={1} justifyContent="center">
                  <FaStar color={COLORS.yellow} />
                  <FaStar color={COLORS.yellow} />
                  <FaStar color={COLORS.yellow} />
                  <FaStar color={COLORS.yellow} />
                  <FaStarHalfAlt color={COLORS.yellow} />
                </Stack>
                <Typography textAlign="center" variant="body1" color="GrayText">
                  Basée sur 32 avis
                </Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
            <Stack direction="column" spacing={2}>
              <Stack direction="row" alignItems="center">
                <Stack
                  direction="row"
                  witdh="10%"
                  bgcolor="green"
                  color="white"
                  alignItems="center"
                  spacing={1}
                  px={1}
                  py={0.5}
                  borderRadius={1}
                >
                  <Typography>5</Typography>
                  <FaRegStar size={18} />
                </Stack>
                <Box width="90%" px={2}>
                  <LinearProgress variant="determinate" value={80} color="success" />
                </Box>
                <Typography color="primary" variant="body1">
                  15
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center">
                <Stack
                  direction="row"
                  witdh="10%"
                  bgcolor={COLORS.secondary}
                  color="white"
                  alignItems="center"
                  spacing={1}
                  px={1}
                  py={0.5}
                  borderRadius={1}
                >
                  <Typography>4</Typography>
                  <FaRegStar size={18} />
                </Stack>
                <Box width="90%" px={2}>
                  <LinearProgress variant="determinate" value={65} color="secondary" />
                </Box>
                <Typography color="primary" variant="body1">
                  8
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center">
                <Stack
                  direction="row"
                  witdh="10%"
                  bgcolor={COLORS.warning}
                  color="white"
                  alignItems="center"
                  spacing={1}
                  px={1}
                  py={0.5}
                  borderRadius={1}
                >
                  <Typography>3</Typography>
                  <FaRegStar size={18} />
                </Stack>
                <Box width="90%" px={2}>
                  <LinearProgress variant="determinate" value={45} color="warning" />
                </Box>
                <Typography color="primary" variant="body1">
                  5
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center">
                <Stack
                  direction="row"
                  witdh="10%"
                  bgcolor={COLORS.yellow}
                  color="white"
                  alignItems="center"
                  spacing={1}
                  px={1}
                  py={0.5}
                  borderRadius={1}
                >
                  <Typography>2</Typography>
                  <FaRegStar size={18} />
                </Stack>
                <Box width="90%" px={2}>
                  <LinearProgress variant="determinate" value={25} color="yellow" />
                </Box>
                <Typography color="primary" variant="body1">
                  3
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center">
                <Stack
                  direction="row"
                  witdh="10%"
                  bgcolor="red"
                  color="white"
                  alignItems="center"
                  spacing={1}
                  px={1}
                  py={0.5}
                  borderRadius={1}
                >
                  <Typography>1</Typography>
                  <FaRegStar size={18} />
                </Stack>
                <Box width="90%" px={2}>
                  <LinearProgress variant="determinate" value={10} color="error" />
                </Box>
                <Typography color="primary" variant="body1">
                  1
                </Typography>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
const MyFlights = () => {
  const { state, userFlights } = useContext(GPViewerContext);
  return (
    <Paper sx={{ p: 2, mb: 2, background: "#F6F6F9" }} variant="outlined">
      <Box>
        <Typography gutterBottom variant="h5" fontWeight="bold" color="GrayText">
          Vols ({userFlights.length})
        </Typography>

        <Divider />
        <Box>
          {state.loadingFlights ? (
            <Box pt={2}>
              {[1, 2, 3].map((data, index) => (
                <FlightSkeleton index={index} />
              ))}
            </Box>
          ) : (
            <Box pt={2}>
              {userFlights.length > 0 &&
                userFlights.map((data, index) => <Flight data={data} index={index} />)}
            </Box>
          )}
        </Box>
        <Box display="flex" justifyContent="center" textAlign="center" flex={1} my={2}>
          <Pagination count={2} shape="rounded" />
        </Box>
      </Box>
    </Paper>
  );
};
const Presentation = () => {
  const { state, user, currentUser, follow, unFollow } = useContext(GPViewerContext);
  const socials = [
    { icon: <FaFacebook size={17} />, link: "http://www.facebook.fr" },
    { icon: <FaInstagram size={17} />, link: "http://www.instagram.fr" },
    { icon: <FaYoutube size={17} />, link: "http://www.youtube.fr" },
    { icon: <FaTwitter size={17} />, link: "http://www.twitter.fr" },
  ];
  return (
    <Paper sx={{ p: 1, mb: 2 }} variant="outlined">
      <Stack direction="row" alignItems="center">
        <Box width="15%" height="15%" p={2}>
          {state.loading ? (
            <Box borderRadius="100%" width={100} p={0.5}>
              <Skeleton width={100} height={100} variant="circular" />
            </Box>
          ) : (
            <Box bgcolor="lightgray" borderRadius="100%" p={0.5}>
              <Avatar alt="test" src={ProfilPic} sx={{ width: "100%", height: "100%" }} />
            </Box>
          )}
        </Box>
        <Stack direction="column" justifyContent="center" mx={2} flexGrow={1}>
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
            {state.loading ? <Skeleton width="50%" /> : user?.country}
          </Typography>
          <Stack direction="row" spacing={2} my={2} color="GrayText">
            {socials.map((social, index) => (
              <Box minWidth={20} key={index}>
                {state.loading ? <Skeleton variant="circular" /> : social.icon}
              </Box>
            ))}
          </Stack>
        </Stack>
        <Box m={2}>
          <Stack
            direction="row"
            spacing={2}
            divider={<Divider sx={{ py: 1 }} orientation="vertical" />}
            p={2}
          >
            <Stack direction="column" alignItems="center">
              <Typography variant="body1" minWidth={20}>
                {state.loading ? <Skeleton width="100%" /> : user.flights?.length}
              </Typography>
              <Typography>Vols</Typography>
            </Stack>
            <Stack direction="column" alignItems="center">
              <Typography variant="body1" minWidth={20}>
                {state.loading ? <Skeleton width="100%" /> : user.followers.length}
              </Typography>
              <Typography>Abonnés</Typography>
            </Stack>
            <Stack direction="column" alignItems="center">
              <Typography variant="body1" minWidth={20}>
                {state.loading ? <Skeleton width="100%" /> : user?.packages?.length}
              </Typography>
              <Typography>Colis</Typography>
            </Stack>
          </Stack>
          {state.loading ? (
            <Skeleton width="100%" height={40} />
          ) : (
            <Box>
              {user.userId !== currentUser?.uid ? (
                <Box>
                  {user?.followers.length > 0 && user.followers.includes(currentUser?.uid) ? (
                    <Button
                      startIcon={<FaUserPlus />}
                      fullWidth
                      variant="contained"
                      onClick={unFollow}
                    >
                      se désabonner
                    </Button>
                  ) : (
                    <Button
                      startIcon={<FaUserPlus />}
                      fullWidth
                      variant="contained"
                      onClick={follow}
                    >
                      Suivre
                    </Button>
                  )}
                </Box>
              ) : (
                <Button startIcon={<FaUserEdit />} fullWidth variant="contained">
                  Modifier profil
                </Button>
              )}
            </Box>
          )}
        </Box>
      </Stack>
    </Paper>
  );
};
export const GPViewerContext = createContext();

const GPViewer = () => {
  const currentUser = useAuth();
  const history = useHistory();
  const { id } = useParams();
  const [state, setstate] = useState({ loading: true, loadingFlights: true });
  const [user, setuser] = useState();
  const [userFlights, setuserFlights] = useState([]);

  const follow = async () => {
    if (currentUser && (await FollowGP(user.email, currentUser?.uid))) {
      setstate({ ...state, loading: true });
      var newState = user;
      newState.followers.push(currentUser.uid);
      setuser(newState);
      setstate({ ...state, loading: false });
    } else {
      history.push("/register");
    }
  };
  const unFollow = async () => {
    if (currentUser && (await UnFollowGP(user.email, currentUser?.uid))) {
      setstate({ ...state, loading: true });
      var newState = user;
      const index = newState.followers.indexOf(currentUser.uid);
      newState.followers.splice(index, 1);
      setuser(newState);
      setstate({ ...state, loading: false });
    } else {
      history.push("/register");
    }
  };

  useEffect(() => {
    async function fetchDatas() {
      if (id) {
        var result = await userDetails(id);
        var flights = await getUserFlights(id);
        setuser(result);
        setuserFlights(flights);
        setstate({ ...state, loading: false, loadingFlights: false });
      } else history.push("/login");
    }
    fetchDatas();
  }, [id]);

  useEffect(() => {
    console.log(`currentUser`, currentUser?.uid);
  }, [currentUser]);

  return (
    <Container>
      <GPViewerContext.Provider value={{ user, state, userFlights, currentUser, follow, unFollow }}>
        <Grid container spacing={2}>
          <Grid item sm={12} md={9} xl={9} lg={9}>
            <Stack direction="column" spacing={4}>
              <Presentation />
              <MyFlights />
              <Reviews />
            </Stack>
          </Grid>
          <Right userFlights={userFlights} />
        </Grid>
      </GPViewerContext.Provider>
    </Container>
  );
};

export default GPViewer;
