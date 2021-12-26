import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import {
  Avatar,
  Button,
  ButtonBase,
  Grid,
  Input,
  Paper,
  Skeleton,
  Stack,
  TextField,
  Typography,
  FormHelperText,
  Divider,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import { FaPlaneDeparture, FaUserAlt, FaUserEdit, FaUserPlus } from "react-icons/fa";
import { IoMdSave } from "react-icons/io";
import { MdOutlineInsertPhoto } from "react-icons/md";

import { RiMedal2Line } from "react-icons/ri";
import COLORS from "../../colors";
import { ProfileDetailsContext } from "../Pages/ProfileDetails";
import LoadingButton from "@mui/lab/LoadingButton";
import { StoreUserProfilePhoto } from "../../firebase/Storage";
import FlightSkeleton from "../FlightSkeleton";
import { useParams } from "react-router-dom";
import { getUserRecentFlights } from "../../firebase/db";
import Flight from "../Flight";

const StaticAnnounces = () => {
  const { id } = useParams();
  const [flights, setflights] = useState([]);
  const [loading, setloading] = useState(true);

  async function getRecentFlights() {
    const results = await getUserRecentFlights(id);
    setflights(results);
    setloading(false);
  }

  useEffect(() => {
    const subscribe = getRecentFlights();
    return subscribe;
  }, [id]);

  return (
    <Box>
      <Stack direction="row" spacing={2} alignItems="center" my={3}>
        <FaPlaneDeparture color="grayText" />
        <Typography fontWeight="bold" variant="h5" color="primary" flexGrow={1}>
          Dernieres annonces
        </Typography>
      </Stack>
      <Stack spacing={2}>
        {loading ? (
          ["1", "2", "3"].map((flight) => <FlightSkeleton key={flight} />)
        ) : (
          <Box>
            {flights.length > 0 ? (
              flights.map((flight, index) => <Flight data={flight} key={index} />)
            ) : (
              <Paper
                sx={{
                  flex: 1,
                  boxShadow: "0px 1px 3px rgba(3, 0, 71, 0.2)",
                  p: 2,
                  my: 2,
                  textAlign: "center",
                }}
                elevation={0}
              >
                <Typography color="GrayText">Vous n'avez pas d'annonces.</Typography>
              </Paper>
            )}
          </Box>
        )}
      </Stack>
    </Box>
  );
};

const Header = ({ HeaderInformations, loading, currentUser }) => {
  return (
    <Grid container spacing={2} flex={1}>
      {HeaderInformations.map((data) => (
        <Grid item xs={6} sm={6} md={3} lg={3} xl={3} key={data.key}>
          <Paper elevation={0} sx={{ boxShadow: "0px 1px 3px rgba(3, 0, 71, 0.2)" }}>
            <Box p={2} textAlign="center">
              <Typography variant="h6" color={COLORS.warning}>
                {loading ? (
                  <Skeleton width="100%" />
                ) : (
                  <>{data.number >= 10 ? data.number : "0" + data.number}</>
                )}
              </Typography>
              <Typography variant="body2" color="GrayText">
                {data.label}
              </Typography>
            </Box>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};
const TopHeader = ({ user, loading, getAvatar, currentUser }) => {
  return (
    <Box flex={1} mr={{ xs: 0, sm: 0, md: 2 }}>
      <Paper elevation={0} sx={{ boxShadow: "0px 1px 3px rgba(3, 0, 71, 0.2)" }}>
        <Stack p={2} direction="row" spacing={2} flex={1}>
          <Avatar alt={user?.photoUrl} src={user?.photoUrl}>
            {getAvatar()}
          </Avatar>
          <Stack direction="row" alignItems="center" justifyContent="space-between" flex={1}>
            <Box>
              <Typography variant="h6" color="#2B3445" fontWeight={500}>
                {loading ? <Skeleton width={100} /> : user?.firstName + " " + user?.lastName}
              </Typography>
              <Typography variant="body2" color="primary">
                {loading ? <Skeleton width={100} /> : user?.country}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <Typography color="GrayText" letterSpacing={1} fontWeight={300}>
                {user?.role === "GP" ? "GP DEBUTANT" : "CLIENT"}
              </Typography>
              <RiMedal2Line size={18} color="goldenrod" />
            </Box>
          </Stack>
        </Stack>
        {currentUser?.uid !== user?.userId && (
          <Box px={{ xs: 2, sm: 2, md: 10 }} pb={2}>
            <Divider sx={{ px: 1 }} light />

            <Stack
              direction="row"
              my={2}
              flex={1}
              divider={<Divider sx={{ py: 1 }} orientation="vertical" />}
            >
              <Stack direction="column" alignItems="center" flex={1}>
                <Typography variant="h6" minWidth={20} color={COLORS.warning}>
                  {loading ? <Skeleton width="100%" /> : user.flights?.length}
                </Typography>
                <Typography variant="body2" color="GrayText">
                  Vols
                </Typography>
              </Stack>
              <Stack direction="column" alignItems="center" flex={1}>
                <Typography variant="h6" minWidth={20} color={COLORS.warning}>
                  {loading ? <Skeleton width="100%" /> : user.followers.length}
                </Typography>
                <Typography variant="body2" color="GrayText">
                  Abonnés
                </Typography>
              </Stack>
              <Stack direction="column" alignItems="center" flex={1}>
                <Typography variant="h6" minWidth={20} color={COLORS.warning}>
                  {loading ? <Skeleton width="100%" /> : user?.packages?.length}
                </Typography>
                <Typography variant="body2" color="GrayText">
                  Colis
                </Typography>
              </Stack>
            </Stack>
            {loading ? (
              <Skeleton width="100%" height={40} />
            ) : (
              <>
                {!loading && (
                  <Box>
                    {user.userId !== currentUser?.uid ? (
                      <Box>
                        {user?.followers.length > 0 && user.followers.includes(currentUser?.uid) ? (
                          <Button
                            startIcon={<FaUserPlus />}
                            fullWidth
                            variant="contained"
                            // onClick={unFollow}
                          >
                            se désabonner
                          </Button>
                        ) : (
                          <Button
                            startIcon={<FaUserPlus />}
                            fullWidth
                            variant="contained"
                            // onClick={follow}
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
              </>
            )}
          </Box>
        )}
      </Paper>
    </Box>
  );
};

const ModifyProfile = ({ setediting }) => {
  const { user, currentUser, getAvatar } = useContext(ProfileDetailsContext);
  const [state, setstate] = useState({ firstName: "", address: "", lastName: "", phone: "" });
  const [image, setimage] = useState("");

  function handleImage(e) {
    if (e.target.files.length > 0) {
      e.target.files[0].type.startsWith("image") && setimage(e.target.files[0]);
      console.log(`image`, e.target.files[0]);
    } else {
      console.log(`mauvaise image`);
      setimage(null);
    }
  }
  function getImageSize() {
    return image?.size && image?.type.startsWith("image/")
      ? image?.name + " " + Math.ceil(image?.size / 1000) + " ko"
      : "Image uniquement ****";
  }
  async function handleSave() {
    await StoreUserProfilePhoto(currentUser?.uid, currentUser?.displayName, image);
    setediting(false);
    window.location.reload(false);
  }
  function handleReturn() {
    setediting(false);
  }

  useEffect(() => {
    if (user?.userId) {
      setstate({
        firstName: user?.firstName,
        lastName: user?.lastName,
        phone: user?.phone,
        address: user?.address,
        email: user?.email,
        birthday: user?.birthday,
      });
    }
  }, [user]);
  return (
    <Box>
      <Stack direction="row" spacing={2} alignItems="center" mb={2}>
        <FaUserAlt color={COLORS.warning} />
        <Typography fontWeight="bold" variant="h5" color="primary" flexGrow={1}>
          Modifier le profil
        </Typography>
        <Button varaint="contained" color="warning" onClick={handleReturn}>
          Retour
        </Button>
      </Stack>
      <Paper elevation={0} sx={{ boxShadow: "0px 1px 3px rgba(3, 0, 71, 0.2)" }}>
        <Box p={2}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            {currentUser.photoURL ? (
              <Avatar alt={currentUser.photoURL} src={currentUser.photoURL} />
            ) : (
              <Avatar sx={{ width: 60, height: 60 }}>{getAvatar()}</Avatar>
            )}
            <label htmlFor="contained-button-file">
              <Input
                sx={{ display: "none" }}
                accept="image/*"
                id="contained-button-file"
                type="file"
                onChange={handleImage}
              />
              <LoadingButton component="span" endIcon={<MdOutlineInsertPhoto />}>
                ajouter une photo
              </LoadingButton>
              <FormHelperText sx={{ textAlign: "center" }}>{getImageSize()}</FormHelperText>
            </label>
          </Stack>
          <Grid container spacing={3} my={2}>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <TextField value={state.firstName} fullWidth label="Prénom" size="small" />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <TextField value={state.lastName} fullWidth label="Nom" size="small" />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <TextField
                value={state.email}
                disabled
                fullWidth
                label="Email"
                type="email"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <TextField value={state.phone} fullWidth label="Téléphone" type="tel" size="small" />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <DesktopDatePicker
                type="date"
                label="Date de naissance"
                renderInput={(params) => <TextField {...params} fullWidth size="small" />}
                value={state.birthday}
              />
            </Grid>
          </Grid>
          <Button endIcon={<IoMdSave />} variant="contained" onClick={handleSave}>
            Enregister
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};
const Profile = () => {
  const { profilState, user, loading, currentUser, HeaderInformations, id, getAvatar } =
    useContext(ProfileDetailsContext);

  const [editing, setediting] = useState(false);

  useEffect(() => {
    async function fetchDatas() {}
    fetchDatas();
  }, []);

  return (
    <Box>
      {!editing ? (
        <Box py={1}>
          <Stack direction="row" spacing={2} alignItems="center" mb={2}>
            {profilState.icon}
            <Typography fontWeight="bold" variant="h5" color="primary" flexGrow={1}>
              {profilState.label}
            </Typography>
            {currentUser?.uid === id && (
              <Button varaint="contained" color="warning" onClick={() => setediting(true)}>
                Modifier
              </Button>
            )}
          </Stack>
          <Stack
            flex={1}
            direction={{ xs: "column", sm: "column", md: "row", lg: "row", xl: "row" }}
            rowGap={2}
          >
            <TopHeader
              user={user}
              loading={loading}
              getAvatar={getAvatar}
              currentUser={currentUser}
            />

            {currentUser?.uid === id && (
              <Header
                HeaderInformations={HeaderInformations}
                loading={loading}
                currentUser={currentUser}
              />
            )}
          </Stack>
          <Paper elevation={0} sx={{ boxShadow: "0px 1px 3px rgba(3, 0, 71, 0.2)", mt: 4 }}>
            <Box p={2}>
              <Grid container px={2} spacing={2}>
                <Grid item xs={6} sm={6} md={2} lg={2} xl={2}>
                  <Typography variant="caption" color="GrayText">
                    Prénom
                  </Typography>
                  <Typography variant="body2" color={COLORS.black} noWrap>
                    {loading ? <Skeleton /> : user.firstName}
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={6} md={2} lg={2} xl={2}>
                  <Typography variant="caption" color="GrayText">
                    Nom
                  </Typography>
                  <Typography variant="body2" color={COLORS.black} noWrap>
                    {loading ? <Skeleton /> : user.lastName}
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={6} md={3} lg={3} xl={3}>
                  <Typography variant="caption" color="GrayText">
                    Email
                  </Typography>
                  <Typography variant="body2" color={COLORS.black} noWrap>
                    {loading ? <Skeleton /> : user.email}
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={6} md={2} lg={2} xl={2}>
                  <Typography variant="body2" color="GrayText">
                    Téléphone
                  </Typography>
                  {loading ? (
                    <Skeleton width="100%" />
                  ) : (
                    <ButtonBase onClick={() => console.log("object")}>
                      <Typography variant="body2" color={COLORS.black}>
                        {user.phone}
                      </Typography>
                    </ButtonBase>
                  )}
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                  <Typography variant="body2" color="GrayText">
                    Adresse
                  </Typography>
                  <Typography variant="body2" color={COLORS.black} noWrap>
                    171 Rue de la Ville, 75000
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Paper>
          <StaticAnnounces />
        </Box>
      ) : (
        <ModifyProfile setediting={setediting} />
      )}
    </Box>
  );
};

export default Profile;
