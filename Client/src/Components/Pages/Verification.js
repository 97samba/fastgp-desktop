import { Button, Container, Paper, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { MdCheck, MdHome } from "react-icons/md";
import { useHistory } from "react-router-dom";
import COLORS from "../../colors";
import { resendEmailVerification, useAuth, verifyEmail } from "../../firebase/auth";
import emailVerification from "../../Images/emailVerification.svg";
import forgotPassword from "../../Images/forgotPassword.svg";

const Verification = () => {
  const history = useHistory();
  const currentUser = useAuth();
  const queryParams = new URLSearchParams(window.location.search);
  const mode = queryParams.get("mode");
  const oobCode = queryParams.get("oobCode");
  //   const lang = queryParams.get("lang");
  const email = queryParams.get("email");

  const [state, setstate] = useState({
    loading: false,
    error: false,
    verified: false,
    password1: "",
    password2: "",
  });

  useEffect(() => {
    console.log(`currentUser`, currentUser);
  }, [currentUser]);

  async function resendVerification() {
    await resendEmailVerification();
  }
  async function verifyUser() {
    await verifyEmail(oobCode);
    console.log("verify email done");
    window.location.reload();
  }

  const Email = () => {
    return (
      <Box p={2}>
        <Paper>
          {currentUser?.emailVerified ? (
            <Box p={2}>
              <Stack direction="row" spacing={2} minHeight={200} p={2} alignItems="center">
                <Typography>Votre email est vérifié, bonne recherche</Typography>
                <MdCheck size={30} color="green" />
              </Stack>
              <Button
                variant="contained"
                fullWidth
                endIcon={<MdHome />}
                onClick={() => history.push("/")}
              >
                Acceuil
              </Button>
            </Box>
          ) : (
            <Stack display="flex" alignItems="center" py={4} px={2}>
              <img alt={emailVerification} src={emailVerification} width="40%" />
              <Typography py={2} variant="h6" fontWeight={600} color={COLORS.black}>
                Cliquer ici pour verifier le compte
              </Typography>
              <Typography variant="body2">Email : {email}</Typography>
              <Button
                variant="contained"
                color="warning"
                endIcon={state.verified && <MdCheck />}
                sx={{ my: 3 }}
                onClick={verifyUser}
              >
                Vérifier le compte
              </Button>
              <Typography fontWeight="bold" variant="body2" color="primary">
                Renvoyer un code
              </Typography>
              <Button onClick={resendVerification}>resend</Button>
            </Stack>
          )}
        </Paper>
      </Box>
    );
  };
  const Password = () => {
    return (
      <Box p={2}>
        <Paper>
          <Stack display="flex" alignItems="center" py={4} px={2}>
            <img alt={forgotPassword} src={forgotPassword} width="40%" />
            <Typography py={2} variant="h6" fontWeight={600} color={COLORS.black}>
              Réinitialiser votre mot de passe
            </Typography>
            <Stack flex={1} spacing={2} minWidth={250}>
              <TextField
                label="Mot de passe"
                error={state.error}
                helperText={
                  state.error
                    ? "Mot de passe different ou inférieur à 8 caractéres"
                    : "8 caractéres au minimum"
                }
                type="password"
                size="small"
                fullWidth
              />
              <TextField
                label="Confirmer Mot de passe"
                error={state.error}
                helperText={state.error && "Mot de passe different ou inférieur à 8 caractéres"}
                type="password"
                size="small"
                fullWidth
              />
            </Stack>
            <Button
              variant="contained"
              color="warning"
              endIcon={state.verified && <MdCheck />}
              sx={{ my: 3, minWidth: 250 }}
            >
              Valider
            </Button>
          </Stack>
        </Paper>
      </Box>
    );
  };

  return (
    <Container>
      <Stack direction="row" justifyContent="center" py={5}>
        {mode === "verifyEmail" ? <Email /> : <Password />}
      </Stack>
    </Container>
  );
};

export default Verification;
