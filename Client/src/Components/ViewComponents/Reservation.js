import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Divider,
  FormControlLabel,
  FormLabel,
  Grid,
  ListItemIcon,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useState } from "react";
import {
  FaBoxTissue,
  FaLaptop,
  FaPassport,
  FaPhoneAlt,
  FaSprayCan,
  FaUserCircle,
  FaWeightHanging,
} from "react-icons/fa";
import { MdExpandMore } from "react-icons/md";
import { IoFastFoodOutline, IoPhonePortraitOutline } from "react-icons/io5";
import BoardingPass from "../ViewComponents/BoardingPass";
import { ViewContext } from "../Pages/View";

import { GiHeartNecklace } from "react-icons/gi";
import { AuthContext } from "../../Providers/AuthProvider";
import { postUserReservation } from "../../firebase/db";

const Reservation = () => {
  const { sender, setsender, receiver, setreceiver, currentUser, flightState, history } =
    useContext(ViewContext);
  const { handleOpen } = useContext(AuthContext);

  const [isReceiver, setisReceiver] = useState("yes");
  const [state, setstate] = useState({
    itemType: "thing",
    itemDescription: "",
    error: false,
    payer: "Envoyeur",
  });

  function handleBagageTypeChange(e) {
    setstate({ ...state, itemType: e.target.value });
  }

  function handleItemDescriptionChange(e) {
    setstate({ ...state, itemDescription: e.target.value });
  }
  function verifyReservationEntries() {
    if (
      state.itemDescription === "" ||
      sender.firstName === "" ||
      sender.lastName === "" ||
      sender.phoneNumber === ""
    ) {
      setstate({ ...state, error: true });
      return false;
    } else {
      if (
        state.payer === "" ||
        receiver.firstName === "" ||
        receiver.lastName === "" ||
        receiver.phoneNumber === ""
      ) {
        setstate({ ...state, error: true });
        return false;
      } else {
        return true;
      }
    }
  }

  async function handleReservation() {
    if (currentUser?.uid) {
      setstate({ ...state, error: false });
      if (verifyReservationEntries()) {
        var next = await postUserReservation(
          sender,
          receiver,
          flightState,
          state,
          currentUser?.uid
        );
        next
          ? history.push("/profilDetails" + currentUser?.uid + "/myProfile")
          : setstate({ ...state, error: true });
      }
    } else {
      handleOpen();
    }
  }

  const bagageType = [
    { label: "Colis pesé", value: "thing", icon: <FaWeightHanging /> },
    { label: "Téléphone", value: "phone", icon: <IoPhonePortraitOutline /> },
    { label: "Ordinateur", value: "computer", icon: <FaLaptop /> },
    { label: "Parfum", value: "fragrance", icon: <FaSprayCan /> },
    { label: "Documents", value: "paper", icon: <FaPassport /> },
    { label: "Bijoux", value: "jewel", icon: <GiHeartNecklace /> },
    { label: "Alimentaire", value: "food", icon: <IoFastFoodOutline /> },
  ];
  return (
    <Paper sx={{ p: 3, boxShadow: "0px 1px 3px rgba(3, 0, 71, 0.2)" }} elevation={0}>
      <Typography gutterBottom>Votre réservation</Typography>
      <Divider />
      <BoardingPass
        sender={sender}
        state={{
          id: flightState.id,
          publisher: flightState.publisher,
          departure: flightState?.departure,
          destination: flightState?.destination,
          prices: flightState.prices,
        }}
        receiver={receiver}
      />
      <Box>
        <Typography variant="body2" color="GrayText" flexGrow={1}></Typography>
        <Accordion variant="outlined">
          <AccordionSummary
            expandIcon={<MdExpandMore />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography>Remplissez votre ticket</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography gutterBottom mb={2} fontWeight="bold" color="GrayText" variant="body2">
              Envoyeur
            </Typography>
            <Grid container mb={1} rowSpacing={2} columnSpacing={4}>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <TextField
                  label="Prenom"
                  size="small"
                  error={state.error && sender.firstName === ""}
                  helperText={state.error && sender.firstName === "" && "Champs obligatoire"}
                  disabled={currentUser?.uid}
                  value={sender.firstName}
                  fullWidth
                  InputProps={{ endAdornment: <FaUserCircle color="gray" /> }}
                  onChange={(e) => setsender({ ...sender, firstName: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <TextField
                  label="Nom"
                  size="small"
                  error={state.error}
                  helperText={state.error && sender.lastName === "" && "Champs obligatoire"}
                  value={sender.lastName}
                  error={state.error && sender.lastName === ""}
                  disabled={currentUser?.uid}
                  fullWidth
                  InputProps={{ endAdornment: <FaUserCircle color="gray" /> }}
                  onChange={(e) => setsender({ ...sender, lastName: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <TextField
                  label="Télephone"
                  size="small"
                  error={state.error}
                  helperText={state.error && sender.phoneNumber === "" && "Champs obligatoire"}
                  type="tel"
                  value={sender.phoneNumber}
                  error={state.error && sender.phoneNumber === ""}
                  fullWidth
                  InputProps={{ endAdornment: <FaPhoneAlt color="gray" /> }}
                  onChange={(e) => setsender({ ...sender, phoneNumber: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <TextField
                  select
                  label="Type de bagage"
                  fullWidth
                  size="small"
                  value={state.itemType}
                  error={state.error && state.itemType === ""}
                  onChange={handleBagageTypeChange}
                >
                  {bagageType.map((type, index) => (
                    <MenuItem value={type.value} key={index}>
                      <ListItemIcon>{type.icon}</ListItemIcon>
                      {type.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <TextField
                  label="Description du contenu"
                  minRows={3}
                  error={state.error && state.itemDescription === ""}
                  helperText={
                    state.error && state.itemDescription === "" && "Description obligatoire"
                  }
                  placeholder="Ex : description du colis, modéle téléphone, modéle ordinateur, document, nombre d'article ...etc "
                  multiline
                  fullWidth
                  size="small"
                  value={state.itemDescription}
                  onChange={handleItemDescriptionChange}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Stack direction={{ xs: "column", md: "row" }} alignItems="center" spacing={3}>
                  <FormLabel>Etes-vous le receveur ?</FormLabel>

                  <RadioGroup
                    row
                    value={isReceiver}
                    onChange={(e, value) => setisReceiver(e.target.value)}
                  >
                    <FormControlLabel value={"yes"} label="Oui" control={<Radio size="small" />} />
                    <FormControlLabel value="no" label="Non" control={<Radio size="small" />} />
                  </RadioGroup>
                </Stack>
              </Grid>
            </Grid>
            {isReceiver === "no" ? (
              <Grid container mb={2} rowSpacing={2} columnSpacing={4}>
                <Grid item xs={12} sm={12} md={12} xl={12} lg={12}>
                  <Typography fontWeight="bold" color="GrayText" variant="body2">
                    Receveur
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <TextField
                    label="Prenom"
                    size="small"
                    error={state.error && isReceiver === "no" && receiver.firstName === ""}
                    helperText={
                      state.error &&
                      isReceiver === "no" &&
                      receiver.firstName === "" &&
                      "Champs obligatoire"
                    }
                    value={receiver.firstName}
                    fullWidth
                    InputProps={{ endAdornment: <FaUserCircle color="gray" /> }}
                    onChange={(e) => setreceiver({ ...sender, firstName: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <TextField
                    label="Nom"
                    size="small"
                    error={state.error && isReceiver === "no" && receiver.lastName === ""}
                    helperText={
                      state.error &&
                      isReceiver === "no" &&
                      receiver.lastName === "" &&
                      "Champs obligatoire"
                    }
                    value={receiver.lastName}
                    fullWidth
                    InputProps={{ endAdornment: <FaUserCircle color="gray" /> }}
                    onChange={(e) => setreceiver({ ...receiver, lastName: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <TextField
                    label="Télephone"
                    size="small"
                    error={state.error && isReceiver === "no" && receiver.phoneNumber === ""}
                    helperText={
                      state.error &&
                      isReceiver === "no" &&
                      receiver.phoneNumber === "" &&
                      "Champs obligatoire"
                    }
                    type="tel"
                    value={receiver.phoneNumber}
                    helperText="Avec whatsapp de préférence"
                    fullWidth
                    InputProps={{ endAdornment: <FaPhoneAlt color="gray" /> }}
                    onChange={(e) => setreceiver({ ...receiver, phoneNumber: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <TextField
                    select
                    label="Qui paye ?"
                    fullWidth
                    size="small"
                    value={state.payer}
                    onChange={(e) => setstate({ ...state, payer: e.target.value })}
                  >
                    {["Envoyeur", "Receveur"].map((type, index) => (
                      <MenuItem value={type} key={index}>
                        {type}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
            ) : null}

            <Button
              variant="contained"
              size="small"
              onClick={handleReservation}
              fullWidth
              endIcon={<FaBoxTissue />}
            >
              Réserver
            </Button>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Paper>
  );
};

export default Reservation;
