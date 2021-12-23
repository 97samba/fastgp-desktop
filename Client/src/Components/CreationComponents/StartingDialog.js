import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import moment from "moment";
import React, { useContext } from "react";
import { FaAngleLeft, FaEdit, FaPlane, FaSuitcase } from "react-icons/fa";
import { IoCreateOutline, IoFolderOpenOutline } from "react-icons/io5";
import { MdCancel, MdCheck } from "react-icons/md";
import COLORS from "../../colors";
import { CreationContext } from "../Pages/Creation";

const StartingDialog = () => {
  const { state, setstate, uploadNewConfiguration, history } = useContext(CreationContext);

  function handleNewPublication() {
    setstate({ ...state, openDialog: false });
  }

  function handleCreateFrom() {
    setstate({ ...state, dialogPage: "import" });
  }

  const MainDialog = () => {
    return (
      <Box>
        <DialogTitle>Créer une nouvelle annonce ou s'inspirer d'une ancienne</DialogTitle>

        <DialogContent>
          <DialogContentText>
            En créant un allez-retour vous économiser du temps ;)
          </DialogContentText>
          <Box mt={2}>
            <Stack direction="row" justifyContent="space-between" my={2}>
              <Typography>Allez-retour ?</Typography>
              <Switch color="success" value={state.roundTrip} />
            </Stack>
            <Divider />
            {state.dialogPage === "start" ? (
              <Stack direction="row" spacing={2} p={2} my={2}>
                <Paper sx={{ flex: 1 }}>
                  <Button color="warning" onClick={handleNewPublication}>
                    <Box p={2} textAlign="center">
                      <IoCreateOutline size="40%" color={COLORS.warning} />
                      <Typography>Une nouvelle annonce</Typography>
                    </Box>
                  </Button>
                </Paper>
                <Paper sx={{ flex: 1 }}>
                  <Button
                    color="primary"
                    disabled={state.dialogLoading === false && state?.flights?.length < 1}
                    onClick={handleCreateFrom}
                  >
                    <Box p={2} textAlign="center">
                      <IoFolderOpenOutline size="40%" color={COLORS.primary} />
                      <Typography>S'inspirer d'une ancienne</Typography>
                    </Box>
                  </Button>
                </Paper>
              </Stack>
            ) : (
              <Box>
                <List>
                  {state.flights &&
                    state.flights.map((flight, index) => (
                      <ListItem
                        key={index}
                        onClick={() => uploadNewConfiguration(index)}
                        disableGutters
                      >
                        <ListItemButton disableGutters>
                          <ListItemIcon>
                            <FaEdit />
                          </ListItemIcon>
                          <Box flexGrow={1} mr={{ xs: 1, sm: 1, md: 4, lg: 4 }}>
                            <Stack
                              direction="row"
                              alignItems="center"
                              color="GrayText"
                              justifyContent="space-between"
                              spacing={{ xs: 1, sm: 1, md: 2 }}
                              width={{ md: "80%" }}
                            >
                              <Typography variant="body2">{flight.departure.name}</Typography>
                              <FaPlane color={COLORS.warning} />
                              <Typography variant="body2">{flight.destination.name}</Typography>
                            </Stack>
                          </Box>
                          <Typography color="GrayText" variant="body2">
                            {moment(flight.departureDate).format("D/MMM/Y")}
                          </Typography>
                        </ListItemButton>
                      </ListItem>
                    ))}
                </List>
                <Button
                  startIcon={<FaAngleLeft />}
                  onClick={() => setstate({ ...state, dialogPage: "start" })}
                >
                  Retour
                </Button>
              </Box>
            )}
          </Box>
        </DialogContent>
      </Box>
    );
  };

  const VerificationGPDialog = () => {
    function getVerificationLabel(key) {
      if (key === "cni") return "Carte d'identité";
      if (key === "passport") return "Passeport";
      if (key === "kbis") return "Kbis entreprise";
      if (key === "sejour") return "Carte de séjour";
    }
    return (
      <>
        <DialogTitle>Verifier vos informations</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Certaines de vos informations ne sont validées, veuillez les verifier avant de créer une
            annonce
          </DialogContentText>
          <Box py={2} px={2}>
            <List>
              <ListItem disableGutters>
                <ListItemText>{getVerificationLabel(state?.user?.documentIdentity)}</ListItemText>
                <ListItemIcon>
                  {state?.user?.documentVerified ? (
                    <MdCheck color="green" size={20} />
                  ) : (
                    <MdCancel color="red" size={20} />
                  )}
                </ListItemIcon>
              </ListItem>
              <Divider />
              <ListItem disableGutters>
                <ListItemText>Email</ListItemText>
                <ListItemIcon>
                  {state?.user?.emailVerified ? (
                    <MdCheck color="green" size={20} />
                  ) : (
                    <MdCancel color="red" size={20} />
                  )}
                </ListItemIcon>
              </ListItem>
              <Divider />

              <ListItem disableGutters>
                <ListItemText>Téléphone</ListItemText>
                <ListItemIcon>
                  {state?.user?.phoneNumberVerified ? (
                    <MdCheck color="green" size={20} />
                  ) : (
                    <MdCancel color="red" size={20} />
                  )}
                </ListItemIcon>
              </ListItem>
              <Divider />
            </List>
          </Box>
          <Typography variant="caption">
            La vérification du numéro est facultative pour créer une annonce, mais obligatoire pour
            la suite.
          </Typography>
        </DialogContent>
      </>
    );
  };

  const BecomeGpDialog = () => {
    return (
      <>
        <DialogTitle>Devenir un Covaliseur (GP)</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Vous avez un compte client, veuillez devenir un covaliseur en quelques clics.
          </DialogContentText>
          <Stack direction="row" p={4} flex={1} spacing={2} justifyContent="center">
            <Button variant="contained" endIcon={<MdCancel />} onClick={() => history.push("/")}>
              Quitter
            </Button>
            <Button
              variant="contained"
              color="warning"
              endIcon={<FaSuitcase />}
              onClick={() => history.push("/register/becomeGP")}
            >
              Devenir Covaliseur
            </Button>
          </Stack>
        </DialogContent>
      </>
    );
  };

  return (
    <Box>
      <Dialog open={state.openDialog}>
        {!state.dialogLoading ? (
          <>
            {state?.user?.role === "GP" ? (
              <>
                {state?.user?.documentVerified && state?.user?.emailVerified ? (
                  <MainDialog />
                ) : (
                  <VerificationGPDialog />
                )}
              </>
            ) : (
              <BecomeGpDialog />
            )}
          </>
        ) : (
          <Box p={3} flex={1} textAlign="center">
            <Typography gutterBottom>Chargement de vos informations</Typography>
            <Box m={3}>
              <CircularProgress />
            </Box>
          </Box>
        )}
      </Dialog>
    </Box>
  );
};

export default StartingDialog;
