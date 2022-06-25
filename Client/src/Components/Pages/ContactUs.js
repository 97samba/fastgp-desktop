import {
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { FaCheck, FaPhone, FaUser } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { MdMail, MdSubject } from "react-icons/md";
import { useHistory } from "react-router";
import COLORS from "../../colors";

const Left = () => {
  return (
    <Paper
      sx={{ m: 1, p: 5, background: COLORS.secondary, color: "white" }}
      elevation={0}
    >
      <Box>
        <Typography gutterBottom variant="h6" fontWeight="bold">
          Informations de contact
        </Typography>
        <Typography variant="body2">
          Vous pouvez nous contacter par mail ou par téléphone directement via whatsapp ou
          par appel.
        </Typography>
      </Box>
      <Stack spacing={4} mt={2} py={2}>
        <Stack direction="row" spacing={2} alignItems="center">
          <FaPhone color={COLORS.warning} size={20} />
          <Box>
            <Typography>+33 06 22 09 67 88</Typography>
            <Typography>+221 77 580 67 45</Typography>
          </Box>
        </Stack>
        <Stack direction="row" spacing={2} alignItems="center">
          <MdMail color={COLORS.warning} size={28} />
          <Typography>sangomar.fast-gp@gmail.com</Typography>
        </Stack>
        <Stack direction="row" spacing={2} alignItems="center">
          <IoLocationSharp color={COLORS.warning} size={28} />
          <Box>
            <Typography>Sonatel 1, Dakar, Sénégal</Typography>
            <Typography>Paris, France</Typography>
          </Box>{" "}
        </Stack>
      </Stack>
    </Paper>
  );
};
const Right = ({ state, setstate, handleSubmit }) => {
  return (
    <Box p={2}>
      {state.error && (
        <Typography gutterBottom color="error">
          Veuillez remplir tous les champs SVP
        </Typography>
      )}
      <Grid container columnSpacing={2} rowSpacing={3}>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <TextField
            value={state.name}
            label="Nom complet"
            fullWidth
            error={state.error && state.name === ""}
            InputProps={{ endAdornment: <FaUser color="gray" /> }}
            onChange={(e) => setstate({ ...state, name: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <TextField
            value={state.email}
            label="Email"
            fullWidth
            error={state.error && state.email === ""}
            InputProps={{ endAdornment: <MdMail color="gray" size={18} /> }}
            onChange={(e) => setstate({ ...state, email: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <TextField
            value={state.object}
            label="Objet"
            fullWidth
            error={state.error && state.object === ""}
            InputProps={{ endAdornment: <MdSubject color="gray" /> }}
            onChange={(e) => setstate({ ...state, object: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <TextField
            value={state.message}
            label="Message"
            multiline
            minRows={6}
            fullWidth
            error={state.error && state.message === ""}
            onChange={(e) => setstate({ ...state, message: e.target.value })}
          />
        </Grid>
      </Grid>
      <Box mt={2}>
        <Button fullWidth onClick={handleSubmit}>
          Envoyer
        </Button>
      </Box>
    </Box>
  );
};
const SuccesDialog = ({ dialogOpen, loading, handleClose, handleBackToHome }) => {
  return (
    <Box>
      <Dialog open={dialogOpen}>
        <DialogTitle>Merci pour votre message</DialogTitle>
        <DialogContent>
          {loading ? (
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              spacing={2}
              mx={5}
            >
              <Typography>Envoi en cours !</Typography>

              <CircularProgress />
            </Stack>
          ) : (
            <Stack direction="row" spacing={2}>
              <Typography>
                Message envoyé, un agent vous répondra dans les plus bref délais.
              </Typography>
              <FaCheck color="green" size={20} />
            </Stack>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Fermer</Button>
          <Button onClick={handleBackToHome}>Retour acceuil</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
const ContactUs = () => {
  const history = useHistory();
  const [state, setstate] = useState({
    name: "",
    email: "",
    message: "",
    object: "",
    error: false,
    dialogOpen: false,
    loading: false,
  });
  function handleSubmit() {
    setstate({ ...state, error: false });
    if (
      state.name === "" ||
      state.email === "" ||
      state.message === "" ||
      state.object === ""
    ) {
      setstate({ ...state, error: true });
      return;
    }
    setstate({ ...state, dialogOpen: true, loading: false });
    console.log("envoi du message");
  }
  function handleClose() {
    setstate({ ...state, dialogOpen: false });
  }
  function handleGoBackToHome() {
    history.push("/");
  }
  return (
    <Box>
      <Box minHeight={300} mt={-2} bgcolor="#F2F2F2"></Box>
      <Box marginTop={-40}>
        <Container>
          <Stack direction="column" py={5} px={2}>
            <Box flex={1} textAlign="center" my={2} color={COLORS.black}>
              <Typography variant="h5" gutterBottom fontWeight="bold">
                Gardons contact !
              </Typography>
              <Typography variant="body1">
                Posez-nous n'importe quelle question ou envoyez nous vos suggestions pour
                améliorer le site.
              </Typography>
            </Box>
            <Box flex={1} m={2}>
              <Paper>
                <Grid container p={1}>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={4}
                    lg={4}
                    xl={4}
                    order={{ xs: 1, sm: 1, md: 0 }}
                  >
                    <Left />
                  </Grid>
                  <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
                    <Right
                      state={state}
                      setstate={setstate}
                      handleSubmit={handleSubmit}
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Box>
          </Stack>
          <SuccesDialog
            loading={state.loading}
            handleBackToHome={handleGoBackToHome}
            handleClose={handleClose}
            dialogOpen={state.dialogOpen}
          />
        </Container>
      </Box>
    </Box>
  );
};

export default ContactUs;
