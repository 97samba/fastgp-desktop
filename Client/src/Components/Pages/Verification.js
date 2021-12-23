import { Button, Container, Paper, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { MdCheck } from "react-icons/md";
import COLORS from "../../colors";
import emailVerification from "../../Images/emailVerification.svg";
import forgotPassword from "../../Images/forgotPassword.svg";

const Verification = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const mode = queryParams.get("mode");
  const apiKey = queryParams.get("apiKey");
  const oobCode = queryParams.get("oobCode");
  const lang = queryParams.get("lang");

  const [state, setstate] = useState({
    loading: false,
    error: false,
    verified: false,
    password1: "",
    password2: "",
  });

  useEffect(() => {
    console.log(`mode`, mode);
    console.log(`apiKey`, apiKey);
    console.log(`oobCode`, oobCode);
    console.log(`lang`, lang);
  }, []);

  const Email = () => {
    return (
      <Box p={2}>
        <Paper>
          <Stack display="flex" alignItems="center" py={4} px={2}>
            <img alt={emailVerification} src={emailVerification} width="80%" />
            <Typography py={2} variant="h6" fontWeight={600} color={COLORS.black}>
              Cliquer ici pour verifier le compte
            </Typography>
            <Button
              variant="contained"
              color="warning"
              endIcon={state.verified && <MdCheck />}
              sx={{ my: 3 }}
            >
              Vérifier le compte
            </Button>
            <Typography fontWeight="bold" variant="body2" color="primary">
              Renvoyer un code
            </Typography>
          </Stack>
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
        {mode !== "verifyEmail" ? <Email /> : <Password />}
      </Stack>
    </Container>
  );
};

export default Verification;
