import {
  Button,
  Container,
  Divider,
  Grid,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { FaApple, FaFacebookSquare, FaLock, FaPhoneAlt } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { IoMailSharp } from "react-icons/io5";
// import loginImage from "../Images/undraw_login_re_4vu2.svg";
import loginImage from "../../Images/undraw_stranded_traveler_pdbw.svg";
import LoadingButton from "@mui/lab/LoadingButton";
import { useHistory } from "react-router";
import { AuthenticateWithGoogle, login, useAuth } from "../../firebase/auth";

const Middle = ({ currentUser }) => {
  const [state, setstate] = useState({
    email: "",
    password: "",
    loading: false,
  });
  const [displayErrors, setdisplayErrors] = useState(false);
  const logIn = async () => {
    setdisplayErrors(false);
    setstate({ ...state, loading: true });
    await login(state.email, state.password, setdisplayErrors);
    setstate({ ...state, loading: false });
  };

  async function connectWithGoogle() {
    const result = await AuthenticateWithGoogle(state.email, state.password);
  }

  return (
    <Paper elevation={0} sx={{ boxShadow: "0px 1px 3px rgba(3, 0, 71, 0.2)" }}>
      <Box px={5} pt={1}>
        <Stack
          direction="row"
          justifyContent="center"
          m={1}
          alignItems="center"
        >
          <img src={loginImage} alt="login" width="70%" />
        </Stack>
        <Typography gutterBottom variant="h4" fontWeight="bold" color="primary">
          Connexion
        </Typography>
        {displayErrors && (
          <Typography gutterBottom variant="body2" color="error">
            Email ou mot de passe incorrect
          </Typography>
        )}
        <Typography gutterBottom variant="body2" color="error">
          {currentUser?.email}
        </Typography>
      </Box>
      <Box p={5} pt={2}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <TextField
              label="Email"
              fullWidth
              size="small"
              type="email"
              error={displayErrors}
              value={state.email}
              InputProps={{
                endAdornment: <IoMailSharp size={18} color="gray" />,
              }}
              onChange={(e) => setstate({ ...state, email: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <TextField
              label="Mot de passe"
              fullWidth
              size="small"
              type="password"
              error={displayErrors}
              value={state.password}
              InputProps={{
                endAdornment: <FaLock size={16} color="gray" />,
              }}
              onChange={(e) => setstate({ ...state, password: e.target.value })}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} mt={2}>
          <LoadingButton
            fullWidth
            size="medium"
            color="warning"
            variant="contained"
            onClick={logIn}
            loading={state.loading}
            loadingPosition="end"
          >
            {state.loading ? "Connexion..." : "Se connecter"}
          </LoadingButton>
        </Grid>
        <Box width="100%" py={3}>
          <Divider>ou</Divider>
        </Box>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Button
              startIcon={<FaFacebookSquare size={20} color="#3b5998" />}
              disabled
              fullWidth
              variant="outlined"
            >
              <Typography>Facebook</Typography>
            </Button>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Button
              startIcon={<FcGoogle size={20} />}
              fullWidth
              variant="outlined"
              onClick={connectWithGoogle}
            >
              <Typography>Google</Typography>
            </Button>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Button
              startIcon={<FaPhoneAlt size={18} color="gray" />}
              fullWidth
              variant="outlined"
              disabled
            >
              <Typography>Téléphone</Typography>
            </Button>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Button
              startIcon={<FaApple size={20} />}
              fullWidth
              variant="outlined"
              disabled
            >
              <Typography>Apple</Typography>
            </Button>
          </Grid>
        </Grid>
        <Box mt={1}>
          <Typography variant="caption">
            En vous inscrivant, vous acceptez nos conditions d'utilisation et
            notre Politique de confidentialité.
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

const Login = () => {
  const currentUser = useAuth();

  const history = useHistory();

  useEffect(() => {
    if (currentUser?.email) {
      history.push("/");
    }
  }, [currentUser]);
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          sm={12}
          md={3}
          lg={3}
          xl={3}
          p={5}
          display={{ xs: "none", sm: "none", md: "block" }}
        ></Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <Middle currentUser={currentUser} />
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
          <Paper
            elevation={0}
            sx={{ boxShadow: "0px 1px 3px rgba(3, 0, 71, 0.2)" }}
          >
            <Box p={2}>
              <Typography>
                Pas de compte ?{" "}
                <Button onClick={() => history.push("/register/start")}>
                  Rejoigner-nous{" "}
                </Button>
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
