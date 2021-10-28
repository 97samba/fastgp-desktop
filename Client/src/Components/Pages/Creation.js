import {
  Step,
  Box,
  StepLabel,
  Stepper,
  Typography,
  Grid,
  Container,
  TextField,
  Paper,
  Button,
  Stack,
} from "@mui/material";
import React, { createContext, useState } from "react";
import { FaPlaneArrival, FaPlaneDeparture } from "react-icons/fa";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import moment from "moment";

const CreationContext = createContext();

const DestinationAndDates = () => {
  return (
    <Paper sx={{ p: 4 }}>
      <Typography textAlign="center">Destination et dates</Typography>
      <Box my={3}>
        <Grid container spacing={4}>
          <Grid item md={6} lg={6}>
            <TextField
              fullWidth
              label="Départ"
              variant="standard"
              //   helperText="Ville de Départ"
              InputProps={{ endAdornment: <FaPlaneDeparture color="#B5B5B5" size={15} /> }}
            />
          </Grid>
          <Grid item md={6} lg={6}>
            <TextField
              fullWidth
              label="Destination"
              variant="standard"
              InputProps={{ endAdornment: <FaPlaneArrival color="#B5B5B5" size={15} /> }}
            />
          </Grid>
          <Grid item md={6} lg={6}>
            <Typography>Adresse de départ</Typography>
            <TextField fullWidth label="Batiment" color="primary" type="" variant="standard" />
            <TextField fullWidth label="Ville" color="primary" variant="standard" />
            <TextField fullWidth label="Code postal" color="primary" variant="standard" />
          </Grid>
          <Grid item md={6} lg={6}>
            <Typography>Adresse de destination</Typography>
            <TextField fullWidth label="Batiment" type="" variant="standard" />
            <TextField fullWidth label="Ville" variant="standard" />
            <TextField fullWidth label="Code postal" variant="standard" />
          </Grid>
        </Grid>

        <Box mt={3}>
          <Typography gutterBottom>Dates</Typography>

          <Grid container spacing={4} mt={1}>
            <Grid item md={4} lg={4}>
              <DesktopDatePicker
                type="date"
                label="Date de départ"
                renderInput={(params) => <TextField {...params} size="small" />}
              />
            </Grid>
            <Grid item md={4} lg={4}>
              <DesktopDatePicker
                type="date"
                value={moment().add(1, "day")}
                label="Date de distribution"
                renderInput={(params) => <TextField {...params} size="small" />}
              />
            </Grid>
            <Grid item md={4} lg={4}>
              <DesktopDatePicker
                type="date"
                label="Dernier dépot"
                value={moment().add(-1, "day")}
                renderInput={(params) => <TextField {...params} size="small" />}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Paper>
  );
};

const SuitcaseAndCOntacts = () => {};

const Creation = () => {
  const [departure, setdeparture] = useState({
    country: "Sénégal",
    currency: "XOF",
    name: "Dakar",
    phoneCode: "+221",
    isoCode: "DKR",
  });
  const [destination, setdestination] = useState({
    country: "France",
    currency: "€",
    name: "Paris",
    phoneCode: "+33",
    isoCode: "PAR",
  });
  const [depotAddress, setdepotAddress] = useState({ address: "", postalCode: "" });
  const [retraitAddress, setRetraitAddress] = useState({ address: "", postalCode: "" });

  const steps = ["Destination et dates", "Valises et adresses", "Prix"];
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    if (activeStep < steps.length) {
      setActiveStep(activeStep + 1);
    } else {
      setActiveStep(0);
    }
  };
  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };
  return (
    <Container>
      <Grid container>
        <Grid item md={2}></Grid>
        <Grid item md={7}>
          <Box sx={{ width: "100%" }}>
            <Stepper sx={{ py: 2 }} activeStep={activeStep} alternativeLabel>
              {steps.map((step, index) => (
                <Step key={index}>
                  <StepLabel>{step}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <Box pt={2}>
              {activeStep == 0 ? (
                <DestinationAndDates />
              ) : activeStep == 1 ? (
                <Box>
                  <Typography>Valises</Typography>
                </Box>
              ) : (
                <Box>
                  <Typography>Prix</Typography>
                </Box>
              )}
            </Box>
            <Stack direction="row" py={2} justifyContent="space-between">
              <Button color="inherit" variant="outlined" onClick={handleBack}>
                Retour
              </Button>
              <Button onClick={handleNext} color="primary" variant="outlined">
                Suivant
              </Button>
            </Stack>
          </Box>
        </Grid>
        <Grid item md={3}></Grid>
      </Grid>
    </Container>
  );
};

export default Creation;
