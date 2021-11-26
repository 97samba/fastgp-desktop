import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControlLabel,
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
import React, { useContext, useEffect } from "react";
import { FaAngleLeft, FaEdit, FaPlane } from "react-icons/fa";
import { IoCreateOutline, IoFolderOpenOutline } from "react-icons/io5";
import COLORS from "../../colors";
import { CreationContext } from "../Pages/Creation";

const StartingDialog = () => {
  const { state, setstate, currentUser, history, user, setuser, uploadNewConfiguration } =
    useContext(CreationContext);

  function handleNewPublication() {
    setstate({ ...state, openDialog: false });
  }

  function handleCreateFrom() {
    setstate({ ...state, dialogPage: "import" });
  }

  return (
    <Box>
      <Dialog open={state.openDialog}>
        {!state.dialogLoading && (
          <DialogTitle>Créer une nouvelle annonce ou s'inspirer d'une ancienne</DialogTitle>
        )}
        {!state.dialogLoading ? (
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
                        <ListItem key={index} onClick={() => uploadNewConfiguration(index)}>
                          <ListItemButton>
                            <ListItemIcon>
                              <FaEdit />
                            </ListItemIcon>
                            <Box flexGrow={1} mr={4}>
                              <Stack
                                direction="row"
                                alignItems="center"
                                color="GrayText"
                                justifyContent="space-between"
                                spacing={2}
                              >
                                <Typography>{flight.departure.name}</Typography>
                                <FaPlane />
                                <Typography>{flight.destination.name}</Typography>
                              </Stack>
                            </Box>
                            <Typography color="GrayText" variant="body1">
                              {moment(flight.departureDate).calendar()}
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
