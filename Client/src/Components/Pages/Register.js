import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import {
  Button,
  Container,
  Divider,
  Grid,
  Link,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import { FaApple, FaFacebookSquare, FaLock, FaMale, FaPhoneAlt } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import {
  IoMailSharp,
  IoPerson,
  IoPersonAddOutline,
  IoPersonCircleOutline,
  IoPersonOutline,
} from "react-icons/io5";
import { MdFemale, MdMale, MdPhoneAndroid } from "react-icons/md";
// import loginImage from "../Images/undraw_login_re_4vu2.svg";
import loginImage from "../../Images/register.svg";
import data from "../../data/test.json";
import axios from "axios";
import { ENV } from "../../Env";
import { ValidateBirthday, ValidatePassword } from "../../Middleware/RegisterMiddleware";
import { useHistory } from "react-router-dom/";
import { AuthContext } from "../../Providers/AuthProvider";

const Middle = () => {
  const [state, setstate] = useState({
    email: "",
    password1: "",
    password2: "",
    firstName: "",
    lastName: "",
    phone: "",
    birthday: new Date(),
    sex: "Masculin",
    country: "Sénégal",
  });
  const [dateOpen, setdateOpen] = useState(false);
  const [displayError, setdisplayError] = useState(false);
  const [errors, seterrors] = useState({ mdpError: "", emailError: "", birthdayError: "" });
  const history = useHistory();

  const register = () => {
    axios
      .post(`${ENV.proxy}register`, state)
      .then((res) => {
        if (res.data.token != "") {
          localStorage.setItem("AuthToken", `${res.data.token}`);
          history.push("/");
        }
      })
      .catch((error) => {
        seterrors({ ...errors, emailError: error.response.data });
        setdisplayError(true);
        return Promise.reject(error.response.data);
      });
  };
  const handleRegister = () => {
    seterrors({
      ...errors,
      mdpError: ValidatePassword(state.password1, state.password2),
      birthdayError: ValidateBirthday(state.birthday),
    });
    if (
      ValidatePassword(state.password1, state.password2) === "" &&
      ValidateBirthday(state.birthday) == "" &&
      errors.emailError === ""
    ) {
      setdisplayError(false);
      register();
    } else {
      setdisplayError(true);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("AuthToken") !== null) {
      history.push("/");
    }
  }, []);
  return (
    <Paper>
      <Box px={5} pt={1}>
        <Stack direction="row" justifyContent="center" m={1} alignItems="center">
          <img src={loginImage} alt="login" width="40%" />
        </Stack>
        <Typography gutterBottom variant="h4" fontWeight="bold" color="primary">
          Inscription
        </Typography>
        <Typography gutterBottom variant="caption" color="GrayText">
          Vous avez 2 livraisons gratuites* aprés votre inscription.
        </Typography>
      </Box>
      <Box p={5} pt={2}>
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
          <Button
            fullWidth
            size="medium"
            color="warning"
            variant="contained"
            onClick={handleRegister}
          >
            S'inscrire
          </Button>
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
        <Box mt={1}>
          <Typography variant="caption">
            En vous inscrivant, vous acceptez nos conditions d'utilisation et notre Politique de
            confidentialité.
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};
const Register = () => {
  return (
    <Container>
      <Grid container spacing={2} my={1}>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} p={5}></Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <Middle />
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} p={5}>
          <Paper variant="outlined">
            <Box p={2}>
              <Typography>
                Vous avez déja un compte ? <Link href="/login">Connectez vous </Link>
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Register;
