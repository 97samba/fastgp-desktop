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
import { MdModeEdit } from "react-icons/md";

import { RiMedal2Line } from "react-icons/ri";
import COLORS from "../../colors";
import { ProfileDetailsContext } from "../Pages/ProfileDetails";

const ModifyLocation = ({ setediting }) => {
  const { user } = useContext(ProfileDetailsContext);
  const [state, setstate] = useState({ firstName: "", address: "", lastName: "", phone: "" });

  function handleSave() {
    setediting(false);
    console.log(`state`, state);
  }

  function handleReturn() {
    setediting(false);
  }

  return (
    <Box>
      <Stack direction="row" spacing={2} alignItems="center" mb={2}>
        <FaUserAlt color={COLORS.warning} />
        <Typography fontWeight="bold" variant="h5" color="primary" flexGrow={1}>
          Ajouter une adresse
        </Typography>
        <Button varaint="contained" color="warning" onClick={handleReturn}>
          Retour
        </Button>
      </Stack>
      <Paper elevation={0} sx={{ boxShadow: "0px 1px 3px rgba(3, 0, 71, 0.2)" }}>
        <Box p={2} my={1}>
          <Grid container spacing={3} pb={1}>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <TextField
                fullWidth
                label="Prénom"
                size="small"
                onChange={(e) => setstate({ ...state, firstName: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <TextField
                fullWidth
                label="Nom"
                size="small"
                onChange={(e) => setstate({ ...state, lastName: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <TextField
                fullWidth
                label="Adresse"
                size="small"
                onChange={(e) => setstate({ ...state, address: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <TextField
                fullWidth
                label="Téléphone"
                type="tel"
                size="small"
                onChange={(e) => setstate({ ...state, phone: e.target.value })}
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
const Address = ({ data }) => {
  return (
    <Paper sx={{ flex: 1, boxShadow: "0px 1px 3px rgba(3, 0, 71, 0.2)" }}>
      <Grid container p={2} spacing={1} display="flex" color={COLORS.black}>
        <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
          <Typography variant="body2" fontWeight={500} noWrap>
            {data.firstName + " " + data.lastName}
          </Typography>
        </Grid>
        <Grid item xs={5} sm={5} md={5} lg={5} xl={5}>
          <Typography variant="body2" noWrap>
            {data.address}
          </Typography>
        </Grid>
        <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
          {data.phone}
        </Grid>
        <Grid item xs={2} sm={2} md={2} lg={2} xl={2} textAlign="right">
          <MdModeEdit color="GrayText" size={20} />
        </Grid>
      </Grid>
    </Paper>
  );
};

const Location = () => {
  const { profilState, user, loading } = useContext(ProfileDetailsContext);

  const [editing, setediting] = useState(false);

  const addresses = [
    {
      firstName: "Samba",
      lastName: "Ndiaye",
      address: "123 rue de la Ville, Paris, 75000",
      phone: "0611980799",
    },
    {
      firstName: "Assane",
      lastName: "Diop",
      address: "Sonatel 1 villa 26, Dakar, Sénégal",
      phone: "775893526",
    },
  ];

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
          <Box flex={1}>
            <Paper
              elevation={0}
              sx={{ boxShadow: "0px 1px 3px rgba(3, 0, 71, 0.2)", height: "100%" }}
            >
              <Stack p={3} direction="row" spacing={2} flex={1}>
                <Avatar sx={{ width: 50, height: 50 }}>S</Avatar>
                <Stack direction="row" alignItems="center" justifyContent="space-between" flex={1}>
                  <Box>
                    <Typography variant="h6" color="#2B3445" fontWeight={500}>
                      {loading ? <Skeleton /> : user.firstName + " " + user.lastName}
                    </Typography>
                    <Typography variant="body2" color="primary">
                      {loading ? <Skeleton /> : user.country}
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
          <Stack spacing={2} my={3}>
            {addresses.map((address, index) => (
              <Address data={address} key={index} />
            ))}
          </Stack>
        </Box>
      ) : (
        <ModifyLocation setediting={setediting} />
      )}
    </Box>
  );
};

export default Location;
