import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import { FaApple, FaFacebookSquare, FaLock, FaPhoneAlt } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { IoMailSharp } from "react-icons/io5";
import { MdCheck } from "react-icons/md";
import { AuthenticateWithGoogle, login, useAuth } from "../firebase/auth";
// import loginImage from "../Images/undraw_login_re_4vu2.svg";
import loginImage from "../Images/undraw_stranded_traveler_pdbw.svg";
import { AuthContext } from "../Providers/AuthProvider";

const SignUpDialog = () => {
  const currentUser = useAuth();
  const { openConnectionDialog, handleClose } = useContext(AuthContext);
  const [state, setstate] = useState({ email: "", password: "" });
  const [error, seterror] = useState(false);

  async function handleLogin() {
    error === true && seterror(false);
    await login(state.email, state.password, seterror);
  }

  async function connectWithGoogle() {
    await AuthenticateWithGoogle(state.email, state.password);
  }

  return (
    <Dialog open={openConnectionDialog} onClose={handleClose}>
      <DialogTitle>Connectez-vous ou créer un compte</DialogTitle>
      <DialogContent sx={{ px: { xs: 2, sm: 2, md: 4 } }}>
        <Stack direction="row" justifyContent="center" width="100%" mb={1}>
          <img src={loginImage} alt="login" width="50%" />
        </Stack>
        {currentUser?.uid ? (
          <>
            <Stack
              py={4}
              px={2}
              direction="row"
              justifyContent="center"
              spacing={2}
              alignItems="center"
            >
              <Typography color="succes">Vous êtes connecté !</Typography>
              <MdCheck size={30} color="#90ee90" />
            </Stack>
            <Button fullWidth color="error" onClick={handleClose}>
              Fermer
            </Button>
          </>
        ) : (
          <>
            <DialogContentText>
              Avec Fast Gp, trouvez les meilleurs covaliseurs du monde entier et profiter
              de la livraison gratuite*.
            </DialogContentText>
            {error && (
              <Box pt={2}>
                <Typography color="error">Email ou mot de passe incorrect</Typography>
              </Box>
            )}
            <Grid container spacing={2} mt={1}>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <TextField
                  label="Email"
                  fullWidth
                  size="small"
                  type="email"
                  error={error}
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
                  error={error}
                  InputProps={{ endAdornment: <FaLock size={16} color="gray" /> }}
                  onChange={(e) => setstate({ ...state, password: e.target.value })}
                />
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} mt={2}>
              <Button
                fullWidth
                size="medium"
                color="warning"
                variant="contained"
                onClick={handleLogin}
              >
                Se connecter
              </Button>
            </Grid>
            <Box width="100%" py={3}>
              <Divider>
                ou
                <Link href="/register/start"> Inscrivez-vous</Link>
              </Divider>{" "}
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
                En vous inscrivant, vous acceptez nos conditions d'utilisation et notre
                Politique de confidentialité.
              </Typography>
            </Box>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SignUpDialog;
