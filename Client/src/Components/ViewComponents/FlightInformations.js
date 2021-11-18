import { Divider, Grid, Paper, Stack, Typography } from "@mui/material";
import moment from "moment";
import React from "react";
import {
  FaBox,
  FaBoxOpen,
  FaCalendarAlt,
  FaCalendarCheck,
  FaCoins,
  FaSuitcase,
} from "react-icons/fa";

import { IoAirplaneSharp } from "react-icons/io5";

const FlightInformations = ({ state }) => {
  return (
    <Paper sx={{ p: 3 }} variant="outlined">
      <Grid container my={1} rowSpacing={3} columnSpacing={6}>
        <Grid item xs={5} sm={4} md={4} xl={4} mb={4} textAlign="start">
          <Typography variant="h5" color="primary">
            {state.departure.name}
          </Typography>
        </Grid>
        <Grid item xs={2} sm={4} md={4} xl={4} textAlign="center">
          <IoAirplaneSharp size={22} color="goldenrod" />
        </Grid>
        <Grid item xs={5} sm={4} md={4} xl={4} textAlign="end">
          <Typography variant="h5" color="primary">
            {state.destination.name}
          </Typography>
        </Grid>
        <Grid item xs={6} md={6} lg={6} xl={6}>
          <Stack direction="row" spacing={2} alignItems="center">
            <FaCalendarAlt color="#494aa2" />
            <Typography color="primary">Date de départ</Typography>
          </Stack>
          <Divider sx={{ my: 1 }} />
          <Typography variant="body2" color="GrayText">
            {moment(state.departureDate).format("D MMMM YYYY")}
          </Typography>
        </Grid>
        <Grid item md={6} lg={6} xl={6}>
          <Stack direction="row" spacing={2} alignItems="center">
            <FaCalendarCheck color="#494aa2" />
            <Typography color="primary">Date d'arrivée</Typography>
          </Stack>
          <Divider sx={{ my: 1 }} />
          <Typography variant="body2" color="GrayText">
            {moment(state.distributionDate).format("D MMMM YYYY")}
          </Typography>
        </Grid>
        <Grid item md={6} lg={6} xl={6}>
          <Stack direction="row" spacing={2} alignItems="center">
            <FaBox color="#494aa2" />
            <Typography color="primary">Adresse de départ</Typography>
          </Stack>
          <Divider sx={{ my: 1 }} />
          <Typography variant="body2" color="GrayText">
            {state.depotAddress.address +
              ", " +
              state.depotAddress.city +
              ", " +
              state.depotAddress.postalCode}{" "}
          </Typography>
        </Grid>
        <Grid item md={6} lg={6} xl={6}>
          <Stack direction="row" spacing={2} alignItems="center">
            <FaBoxOpen size={20} color="#494aa2" />
            <Typography color="primary">Adresse de destination</Typography>
          </Stack>
          <Divider sx={{ my: 1 }} />
          <Typography variant="body2" color="GrayText">
            {state.retraitAddress.address +
              ", " +
              state.retraitAddress.city +
              ", " +
              state.retraitAddress.postalCode}
          </Typography>
        </Grid>
        <Grid item md={6} lg={6} xl={6}>
          <Stack direction="row" spacing={2} alignItems="center">
            <FaSuitcase color="#494aa2" />
            <Typography color="primary">Poids disponible</Typography>
          </Stack>
          <Divider sx={{ my: 1 }} />
          <Stack direction="row" spacing={1} alignItems="flex-end" color="GrayText">
            <Typography variant="h5" color="goldenrod">
              58
            </Typography>
            <Typography variant="body2">Kg</Typography>
          </Stack>
        </Grid>
        <Grid item md={6} lg={6} xl={6}>
          <Stack direction="row" spacing={2} alignItems="center">
            <FaCoins size={20} color="#494aa2" />
            <Typography color="primary">Prix</Typography>
          </Stack>
          <Divider sx={{ my: 1 }} />
          <Stack direction="row" justifyContent="space-between">
            <Stack direction="row" spacing={1} alignItems="flex-end" color="GrayText">
              <Typography variant="h5" color="goldenrod">
                {state.prices.pricePerKG} $
              </Typography>
              <Typography variant="body2">/Kg</Typography>
            </Stack>
            <Divider />
            <Stack direction="row" spacing={1} alignItems="flex-end" color="GrayText">
              <Typography variant="h5" color="goldenrod">
                {state.prices.pricePerSuitcase} $
              </Typography>
              <Typography variant="body2"> / valise*</Typography>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default FlightInformations;
