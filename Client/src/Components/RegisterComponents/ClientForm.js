import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import LoadingButton from "@mui/lab/LoadingButton";
import { Button, Divider, Grid, MenuItem, Stack, TextField, Typography, Zoom } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useState } from "react";
import { FaApple, FaFacebookSquare, FaLock, FaPhoneAlt } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { IoMailSharp, IoPerson, IoPersonOutline } from "react-icons/io5";
import { MdPhoneAndroid } from "react-icons/md";
import data from "../../data/test.json";
import { verifyIfUserExists } from "../../firebase/auth";
import { ValidateBirthday } from "../../Middleware/RegisterMiddleware";

import { RegisterContext } from "../Pages/Register";

export const ClientForm = () => {
  const {
    state,
    setstate,
    dateOpen,
    displayError,
    setdisplayError,
    setdateOpen,
    errors,
    seterrors,
    RegisterClient,
  } = useContext(RegisterContext);
  const [registrating, setregistrating] = useState(false);

  async function handleRegister() {
    setregistrating(true);
    const userExists = await verifyIfUserExists(state.email);

    if (userExists) {
      seterrors({ ...errors, emailError: "Cet utlisateur existe déja" });
      setdisplayError(true);
    } else {
      seterrors({ ...errors, emailError: "" });
      setdisplayError(false);

      await RegisterClient();
    }
    setregistrating(false);
  }

  return (
    <Zoom in={true} timeout={150}>
      <Box px={{ xs: 2, sm: 2, md: 5 }}>
        <Grid container spacing={2}>
          <Grid item xs={6} sm={6} md={6} lg={6}>
            <TextField
              label="Prénom"
              fullWidth
              size="small"
              error={displayError && state.firstName === ""}
              helperText={displayError && state.firstName === "" ? "Prénom manquant" : ""}
              value={state.firstName}
              InputProps={{ endAdornment: <IoPerson size={18} color="gray" /> }}
              onChange={(e) => setstate({ ...state, firstName: e.target.value })}
            />
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6}>
            <TextField
              label="Nom"
              fullWidth
              size="small"
              error={displayError && state.lastName === ""}
              helperText={displayError && state.lastName === "" ? "Nom manquant" : ""}
              value={state.lastName}
              InputProps={{ endAdornment: <IoPersonOutline size={18} color="gray" /> }}
              onChange={(e) => setstate({ ...state, lastName: e.target.value })}
            />
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6}>
            <DesktopDatePicker
              type="date"
              value={state.birthday}
              label="Date de naissance"
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  size="small"
                  onClick={() => setdateOpen(true)}
                  error={displayError && errors.birthdayError !== ""}
                  helperText={displayError && errors.birthdayError}
                />
              )}
              onChange={(value) => {
                setstate({ ...state, birthday: value });
                seterrors({ ...errors, birthdayError: ValidateBirthday(value) });

                setdateOpen(false);
              }}
              onClose={() => {
                setdateOpen(false);
              }}
              onOpen={() => setdateOpen(true)}
              open={dateOpen}
            />
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6}>
            <TextField
              value={state.sex}
              placeholder="sexe"
              label="sexe"
              fullWidth
              select
              size="small"
              onChange={(e) => setstate({ ...state, sex: e.target.value })}
            >
              {["Masculin", "Féminin"].map((sexe, index) => (
                <MenuItem key={index} value={sexe}>
                  {sexe}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <TextField
              label="Email"
              fullWidth
              size="small"
              type="email"
              error={displayError && errors.emailError !== ""}
              helperText={displayError && errors.emailError}
              value={state.email}
              onBlur={() => seterrors({ ...errors, emailError: "" })}
              InputProps={{ endAdornment: <IoMailSharp size={18} color="gray" /> }}
              onChange={(e) => setstate({ ...state, email: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <TextField
              label="Mot de passe"
              fullWidth
              size="small"
              type="password"
              error={displayError && errors.mdpError !== ""}
              helperText={displayError && errors.mdpError}
              value={state.password1}
              InputProps={{ endAdornment: <FaLock size={16} color="gray" /> }}
              onChange={(e) => setstate({ ...state, password1: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <TextField
              label="Confirmer le mot de passe"
              fullWidth
              size="small"
              type="password"
              error={displayError && errors.mdpError !== ""}
              helperText={displayError && errors.mdpError}
              value={state.password2}
              InputProps={{ endAdornment: <FaLock size={16} color="gray" /> }}
              onChange={(e) => setstate({ ...state, password2: e.target.value })}
            />
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6}>
            <TextField
              value={state.country}
              placeholder="Pays"
              label="Pays"
              fullWidth
              select
              size="small"
              onChange={(e) => setstate({ ...state, country: e.target.value })}
            >
              {data.map((country, index) => (
                <MenuItem key={index} value={country.name}>
                  {country.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6}>
            <TextField
              label="Télephone"
              fullWidth
              size="small"
              type="tel"
              value={state.phone}
              error={displayError && state.phone === ""}
              helperText={displayError && "Téléphone manquant"}
              InputProps={{ endAdornment: <MdPhoneAndroid size={18} color="gray" /> }}
              onChange={(e) => setstate({ ...state, phone: e.target.value })}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} mt={2}>
          <LoadingButton
            fullWidth
            loading={registrating}
            size="medium"
            color="warning"
            variant="contained"
            onClick={handleRegister}
          >
            S'inscrire
          </LoadingButton>
        </Grid>
        <Box width="100%" py={3}>
          <Divider>ou</Divider>
        </Box>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Stack
              direction="row"
              border={1}
              justifyContent="center"
              p={0.5}
              borderRadius={1}
              borderColor="#C5C5C5"
              spacing={1}
            >
              <FaFacebookSquare size={20} color="#3b5998" />
              <Typography>Facebook</Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Stack
              direction="row"
              border={1}
              justifyContent="center"
              p={0.5}
              borderRadius={1}
              borderColor="#C5C5C5"
              spacing={1}
            >
              <FcGoogle size={20} />
              <Typography>Google</Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Stack
              direction="row"
              border={1}
              justifyContent="center"
              p={0.5}
              borderRadius={1}
              borderColor="#C5C5C5"
              spacing={1}
            >
              <FaPhoneAlt size={18} color="gray" />
              <Typography>Téléphone</Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Stack
              direction="row"
              border={1}
              justifyContent="center"
              p={0.5}
              borderRadius={1}
              borderColor="#C5C5C5"
              spacing={1}
            >
              <FaApple size={20} />
              <Typography>Apple</Typography>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Zoom>
  );
};
