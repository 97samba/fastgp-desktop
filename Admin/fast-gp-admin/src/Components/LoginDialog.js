import { Dialog, Paper, Stack, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import React, { useState, useContext } from "react";
import { logAUser } from "../firebase/auth";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Components/AuthProvider";

const LoginDialog = () => {
  const [state, setstate] = useState({ email: "", password: "", loading: false });
  const [error, seterror] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  async function handleRegister() {
    if (state.email != "" && state.password != "") {
      seterror(false);
      setstate({ ...state, loading: true });
      const res = await logAUser(state.email, state.password);
      res ? navigate("/") : seterror(true);
      setstate({ ...state, loading: false });
    } else {
      seterror(true);
    }
  }

  return (
    <Dialog open={!currentUser?.uid} maxWidth="lg">
      <Stack alignItems="center" spacing={1} minWidth={600} minHeight={400}>
        <Paper sx={{ width: 400, mt: 4 }} variant="outlined">
          <Stack p={2} spacing={2} textAlign="center" pb={4}>
            <Typography color="primary" variant="h4" fontWeight={600}>
              Connexion
            </Typography>
            {error && (
              <Typography color="error" gutterBottom>
                Erreur d'authentification
              </Typography>
            )}
            <TextField
              label="Email"
              fullWidth
              value={state.email}
              onChange={(e) => setstate({ ...state, email: e.target.value })}
            />
            <TextField
              label="Mot de passe"
              type="password"
              fullWidth
              value={state.password}
              onChange={(e) => setstate({ ...state, password: e.target.value })}
            />
            <LoadingButton
              loading={state.loading}
              size="medium"
              variant="contained"
              onClick={handleRegister}
            >
              Connexion
            </LoadingButton>
          </Stack>
        </Paper>
        <Typography variant="body2" color="GrayText">
          Logiciel privé, risque de poursuite en cas d'utilisation non authorisée
        </Typography>
      </Stack>
    </Dialog>
  );
};

export default LoginDialog;
