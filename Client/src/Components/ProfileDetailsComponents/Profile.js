import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import {
  Avatar,
  Button,
  ButtonBase,
  Grid,
  Paper,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { IoMdSave } from "react-icons/io";

import { RiMedal2Line } from "react-icons/ri";
import COLORS from "../../colors";
import { ProfileDetailsContext } from "../Pages/ProfileDetails";

const ModifyProfile = ({ setediting }) => {
  const { user } = useContext(ProfileDetailsContext);
  const [state, setstate] = useState({ firstName: "", address: "", lastName: "", phone: "" });
  function handleSave() {
    setediting(false);
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
          <Avatar sx={{ width: 60, height: 60 }}>S</Avatar>
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
  const { profilState, user } = useContext(ProfileDetailsContext);

  const [HeaderInformations, setHeaderInformations] = useState([
    {
      label: "Mes Colis",
      number: 1,
      key: "packages",
    },
    {
      label: "En attente",
      number: 0,
      key: "pending",
    },
    {
      label: "Livraison en cours",
      number: 1,
      key: "shipping",
    },
    {
      label: "Achats Boutique",
      number: 0,
      key: "shop",
    },
  ]);
  const [editing, setediting] = useState(false);

  return (
    <Box>
      {!editing ? (
        <Box py={1}>
          <Stack direction="row" spacing={2} alignItems="center" mb={2}>
            {profilState.icon}
            <Typography fontWeight="bold" variant="h5" color="primary" flexGrow={1}>
              {profilState.label}
            </Typography>
            <Button varaint="contained" color="warning" onClick={() => setediting(true)}>
              Modifier
            </Button>
          </Stack>
          <Stack flex={1} direction="row" alignItems="flex-start">
            <Box flex={1} mr={2}>
              <Paper
                elevation={0}
                sx={{ boxShadow: "0px 1px 3px rgba(3, 0, 71, 0.2)", height: "100%" }}
              >
                <Stack p={3} direction="row" spacing={2} flex={1}>
                  <Avatar sx={{ width: 50, height: 50 }}>S</Avatar>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    flex={1}
                  >
                    <Box>
                      <Typography variant="h6" color="#2B3445" fontWeight={500}>
                        {profilState.loading ? <Skeleton /> : user.firstName + " " + user.lastName}
                      </Typography>
                      <Typography variant="body2" color="primary">
                        {profilState.loading ? <Skeleton /> : user.country}
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center">
                      <Typography color="GrayText" letterSpacing={1} fontWeight={300}>
                        GP DEBUTANT
                      </Typography>
                      <RiMedal2Line size={18} color="goldenrod" />
                    </Box>
                  </Stack>
                </Stack>
              </Paper>
            </Box>

            <Grid container spacing={2} flex={1}>
              {HeaderInformations.map((data) => (
                <Grid item xs={12} sm={6} md={3} lg={3} xl={3} key={data.key}>
                  <Paper elevation={0} sx={{ boxShadow: "0px 1px 3px rgba(3, 0, 71, 0.2)" }}>
                    <Box p={2} textAlign="center">
                      <Typography variant="h6" color={COLORS.warning}>
                        {data.number >= 10 ? data.number : "0" + data.number}
                      </Typography>
                      <Typography variant="body2" color="GrayText">
                        {data.label}
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Stack>
          <Paper elevation={0} sx={{ boxShadow: "0px 1px 3px rgba(3, 0, 71, 0.2)", mt: 4 }}>
            <Box p={2}>
              <Grid container px={2} spacing={2}>
                <Grid item xs={6} sm={6} md={2} lg={2} xl={2}>
                  <Typography variant="caption" color="GrayText">
                    Prénom
                  </Typography>
                  <Typography variant="body2" color={COLORS.black}>
                    {profilState.loading ? <Skeleton /> : user.firstName}
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={6} md={2} lg={2} xl={2}>
                  <Typography variant="caption" color="GrayText">
                    Nom
                  </Typography>
                  <Typography variant="body2" color={COLORS.black}>
                    {profilState.loading ? <Skeleton /> : user.lastName}
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={6} md={3} lg={3} xl={3}>
                  <Typography variant="caption" color="GrayText">
                    Email
                  </Typography>
                  <Typography variant="body2" color={COLORS.black}>
                    {profilState.loading ? <Skeleton /> : user.email}
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={6} md={2} lg={2} xl={2}>
                  <Typography variant="caption" color="GrayText">
                    Téléphone
                  </Typography>
                  <Typography variant="body2" color={COLORS.black}>
                    <ButtonBase onClick={() => console.log("object")}>
                      {profilState.loading ? <Skeleton /> : user.phone}
                    </ButtonBase>
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={6} md={3} lg={3} xl={3}>
                  <Typography variant="caption" color="GrayText">
                    Adresse
                  </Typography>
                  <Typography variant="body2" color={COLORS.black}>
                    <ButtonBase onClick={() => console.log("object")}>
                      171 Rue de la Ville, 75000
                    </ButtonBase>
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Box>
      ) : (
        <ModifyProfile setediting={setediting} />
      )}
    </Box>
  );
};

export default Profile;
