import {
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Fade,
  FormControl,
  FormControlLabel,
  FormLabel,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { BiSend } from "react-icons/bi";
import { IoStar, IoStarOutline } from "react-icons/io5";
import { useHistory, useParams } from "react-router-dom";
import COLORS from "../../colors";
import { useAuth } from "../../firebase/auth";
import { GetAReservation, GetFeedbackFromReservation, PostAFeedback } from "../../firebase/db";
import { UnauthorizedComponent } from "../Pages/ReservationDetails";
import LoadingSkeleton from "./LoadingSkeleton";
import feedbackImage from "../../Images/feedback.svg";
import { MdHome } from "react-icons/md";

const RatingDialog = ({ open, dialogState }) => {
  return (
    <Dialog open={open}>
      <DialogTitle color={dialogState.error ? "error" : COLORS.black}>
        {dialogState.title}
      </DialogTitle>
      {!dialogState.error && (
        <DialogContent>
          <DialogContentText>
            N'oublier pas de demander votre Kilo gratuit après 5 envois
          </DialogContentText>
          {!dialogState.done ? (
            <Stack
              alignItems="center"
              spacing={2}
              minWidth={300}
              minHeight={200}
              justifyContent="center"
            >
              <CircularProgress size={100} />
              <DialogContentText>Soumission de la note...</DialogContentText>
            </Stack>
          ) : (
            <Stack alignItems="center" py={2} spacing={2}>
              <img alt="fast-gp-feedback" src={feedbackImage} width={300} />
              <Button variant="contained" fullWidth endIcon={<MdHome />} href="/">
                Acceuil
              </Button>
            </Stack>
          )}
        </DialogContent>
      )}
    </Dialog>
  );
};

const Ratings = () => {
  const results = ["Mauvais", "Médiocre", "Moyen", "Bien", "Excellent"];
  const { id } = useParams();
  const history = useHistory();
  const currentUser = useAuth();
  const [reservation, setreservation] = useState();
  const [loading, setloading] = useState(true);
  const queryParams = new URLSearchParams(window.location.search);
  const [unauthorized, setunauthorized] = useState(false);
  const [AlreadyFeedback, setAlreadyFeedback] = useState(false);

  const [state, setstate] = useState({
    communication: 4,
    price: 4,
    communicationDescription: "Bien",
    priceDescription: "Bien",
    feedback: "",
    arrivedAtTime: "yes",
  });

  const [error, seterror] = useState(false);
  const [open, setopen] = useState(false);
  const [dialogState, setdialogState] = useState({
    open: false,
    loading: false,
    error: false,
    done: false,
    title: "Encore un instant",
  });

  async function fetchDatas() {
    let feedback = await GetFeedbackFromReservation(id);
    feedback?.owner ? setAlreadyFeedback(true) : setAlreadyFeedback(false);
    let result = await GetAReservation(id);
    setreservation(result);
    result = undefined;
    setloading(false);
  }

  function showUnauthorized() {
    setunauthorized(true);
    setloading(false);
  }

  useEffect(() => {
    if (currentUser === null) {
      history.push("/login");
    }
    if (currentUser?.uid) {
      if (id) {
        if (queryParams.get("c") === currentUser?.uid || queryParams.get("g") === currentUser?.uid)
          fetchDatas();
        else showUnauthorized();
      } else {
        history.push("/profilDetails/" + currentUser.uid + "/reservations");
      }
    }
  }, [currentUser]);

  async function SubmitFeedback() {
    if (state.feedback === "") {
      seterror(true);
      return;
    } else {
      error && seterror(false);
      setopen(true);
    }
    let mark = (state.communication * 2) / 5 + state.price / 5;
    state.arrivedAtTime === "yes" ? (mark += 2) : (mark += 0);
    const res = await PostAFeedback({
      ...state,
      mark: mark,
      gpId: reservation.gpId,
      owner: reservation.owner,
      reservationId: id,
    });
    res
      ? setdialogState({ ...dialogState, title: "Merci à bientôt", done: true })
      : setdialogState({ ...dialogState, error: true, title: "Erreur inconnue" });
  }

  return (
    <Container sx={{ mt: -2, py: 1, px: { xs: 2, md: 4 } }}>
      {AlreadyFeedback ? (
        <Stack alignItems="center" py={4} spacing={3}>
          <img alt="fast-gp-feedback" src={feedbackImage} width={300} />
          <Typography>Merci, pour votre note</Typography>
          <Button variant="contained" fullWidth endIcon={<MdHome />} href="/">
            Acceuil
          </Button>
        </Stack>
      ) : (
        <>
          {unauthorized ? (
            <UnauthorizedComponent />
          ) : (
            <Box sx={{ py: 2, px: { xs: 0, md: 4 } }}>
              {loading ? (
                <LoadingSkeleton />
              ) : (
                <Paper
                  sx={{
                    flex: 1,
                    boxShadow: "0px 1px 3px rgba(3, 0, 71, 0.2)",
                    borderRadius: 3,
                  }}
                  elevation={0}
                >
                  <Stack spacing={2} color={COLORS.black} py={2} px={3}>
                    <Typography variant="h5" fontWeight={555} textAlign="center">
                      Noter le transporteur
                    </Typography>
                    <DialogContentText>
                      N'hésiter pas à dire toutes les difficultés rencontrées ou choses à améliorer.
                    </DialogContentText>
                    <Stack py={{ xs: 1, md: 2 }}>
                      <Typography color="primary" variant="h6">
                        Communication :
                      </Typography>
                      <Typography variant="body2" color={COLORS.black}>
                        Notez la qualité et le temps de réponse du transporteur
                      </Typography>
                      <Stack direction="row" py={1} spacing={3}>
                        <Stack direction="row" spacing={2}>
                          {[1, 2, 3, 4, 5].map((value) => (
                            <>
                              {value <= state.communication ? (
                                <IoStar
                                  size={25}
                                  color="goldenrod"
                                  onClick={() =>
                                    setstate({
                                      ...state,
                                      communication: value,
                                      communicationDescription: results[value - 1],
                                    })
                                  }
                                />
                              ) : (
                                <IoStarOutline
                                  size={25}
                                  color="goldenrod"
                                  onClick={() =>
                                    setstate({
                                      ...state,
                                      communication: value,
                                      communicationDescription: results[value - 1],
                                    })
                                  }
                                />
                              )}
                            </>
                          ))}
                        </Stack>
                        <Typography variant="body1" color={COLORS.black}>
                          {state.communicationDescription}
                        </Typography>
                      </Stack>
                    </Stack>
                    <Divider />
                    <Stack py={2}>
                      <Typography color="primary" variant="h6">
                        Prix :
                      </Typography>
                      <Typography variant="body2" color={COLORS.black}>
                        Les prix proposés par le GP sont-ils raisonnables ?
                      </Typography>
                      <Stack direction="row" py={1} spacing={3}>
                        <Stack direction="row" spacing={2}>
                          {[1, 2, 3, 4, 5].map((value) => (
                            <>
                              {value <= state.price ? (
                                <IoStar
                                  size={25}
                                  color="goldenrod"
                                  onClick={() => {
                                    setstate({
                                      ...state,
                                      price: value,
                                      priceDescription: results[value - 1],
                                    });
                                  }}
                                />
                              ) : (
                                <IoStarOutline
                                  size={25}
                                  color="goldenrod"
                                  onClick={() => {
                                    setstate({
                                      ...state,
                                      price: value,
                                      priceDescription: results[value - 1],
                                    });
                                  }}
                                />
                              )}
                            </>
                          ))}
                        </Stack>
                        <Typography variant="body1" color={COLORS.black}>
                          {state.priceDescription}
                        </Typography>
                      </Stack>
                    </Stack>
                    <Divider />
                    <Stack py={2}>
                      <Typography color="primary" variant="h6">
                        Respect des dates :
                      </Typography>
                      <Typography variant="body2" color={COLORS.black}>
                        Est-ce que les dates de départ et de distribution ont été respectées.
                      </Typography>
                      <Stack py={1} spacing={3}>
                        <FormControl sx={{ flex: 1 }}>
                          {/* <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel> */}
                          <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="female"
                            name="radio-buttons-group"
                            row
                            value={state.arrivedAtTime}
                            onChange={(e, value) => setstate({ ...state, arrivedAtTime: value })}
                          >
                            <FormControlLabel value="yes" control={<Radio />} label="Oui" />
                            <FormControlLabel value="no" control={<Radio />} label="Non" />
                          </RadioGroup>
                        </FormControl>
                        <TextField
                          size="small"
                          label="Laissez votre appréciation*"
                          sx={{ flex: 1 }}
                          multiline
                          error={error && state.feedback === ""}
                          helperText={error && "Champs obligatoire"}
                          minRows={2}
                          value={state?.feedback}
                          onChange={(e) => setstate({ ...state, feedback: e.target.value })}
                        />
                      </Stack>
                    </Stack>
                    <Button
                      variant="outlined"
                      endIcon={<BiSend />}
                      onClick={() => SubmitFeedback()}
                    >
                      Envoyer
                    </Button>
                  </Stack>
                </Paper>
              )}
            </Box>
          )}
          <RatingDialog open={open} dialogState={dialogState} />
        </>
      )}
    </Container>
  );
};

export default Ratings;
