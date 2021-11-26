import { Divider, Grid, IconButton, Paper, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
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
import { GoPackage } from "react-icons/go";

import { IoAirplaneSharp } from "react-icons/io5";
import COLORS from "../../colors";

const FlightInformations = ({ state }) => {
  return (
    <Paper sx={{ p: 3 }} variant="outlined">
      <Grid container my={1} rowSpacing={3} columnSpacing={6}>
        <Grid item xs={5} sm={4} md={4} xl={4} mb={4} textAlign="start">
          <Typography variant="h4" color="primary">
            {state.departure.name}
          </Typography>
        </Grid>
        <Grid item xs={2} sm={4} md={4} xl={4} textAlign="center">
          <IoAirplaneSharp size={22} color={COLORS.warning} />
        </Grid>
        <Grid item xs={5} sm={4} md={4} xl={4} textAlign="end">
          <Typography variant="h4" color="primary">
            {state.destination.name}
          </Typography>
        </Grid>
        <Grid item xs={6} md={6} lg={6} xl={6}>
          <Stack direction="row" spacing={2} alignItems="center">
            <IconButton>
              <FaCalendarAlt color="#494aa2" />
            </IconButton>
            <Box flex={1}>
              <Typography gutterBottom color="primary" fontWeight="bold">
                Date de départ
              </Typography>
              <Divider sx={{ mb: 1 }} />
              <Typography variant="body2" color="GrayText">
                {moment(state.departureDate).format("D MMMM YYYY")}
              </Typography>
            </Box>
          </Stack>
        </Grid>
        <Grid item md={6} lg={6} xl={6}>
          <Stack direction="row" spacing={2} alignItems="center">
            <IconButton>
              <FaCalendarCheck color={COLORS.primary} />
            </IconButton>
            <Box flex={1}>
              <Typography gutterBottom color="primary" fontWeight="bold">
                Date d'arrivée
              </Typography>
              <Divider sx={{ mb: 1 }} />
              <Typography variant="body2" color="GrayText">
                {moment(state.distributionDate).format("D MMMM YYYY")}
              </Typography>
            </Box>
          </Stack>
        </Grid>
        <Grid item md={6} lg={6} xl={6}>
          <Stack direction="row" spacing={2} alignItems="center">
            <IconButton>
              <GoPackage color={COLORS.primary} />
            </IconButton>
            <Box flex={1}>
              <Typography gutterBottom color="primary" fontWeight="bold">
                Adresse de départ
              </Typography>
              <Divider sx={{ mb: 1 }} />
              <Typography variant="body2" color="GrayText">
                {state.depotAddress.address +
                  ", " +
                  state.depotAddress.city +
                  ", " +
                  state.depotAddress.postalCode}{" "}
              </Typography>
            </Box>
          </Stack>
        </Grid>
        <Grid item md={6} lg={6} xl={6}>
          <Stack direction="row" spacing={2} alignItems="center">
            <IconButton>
              <GoPackage color={COLORS.primary} />
            </IconButton>
            <Box flex={1}>
              <Typography gutterBottom color="primary" fontWeight="bold">
                Adresse de destination
              </Typography>
              <Divider sx={{ mb: 1 }} />
              <Typography variant="body2" color="GrayText">
                {state.retraitAddress.address +
                  ", " +
                  state.retraitAddress.city +
                  ", " +
                  state.retraitAddress.postalCode}
              </Typography>
            </Box>
          </Stack>
        </Grid>
        <Grid item md={6} lg={6} xl={6}>
          <Stack direction="row" spacing={2} alignItems="center">
            <IconButton>
              <FaSuitcase color={COLORS.primary} />
            </IconButton>
            <Box flex={1}>
              <Typography gutterBottom color="primary" fontWeight="bold">
                Poids disponible
              </Typography>
              <Divider sx={{ mb: 1 }} />
              <Stack direction="row" spacing={1} alignItems="flex-end" color="GrayText">
                <Typography variant="h5" color={COLORS.warning}>
                  58
                </Typography>
                <Typography variant="body2">Kg</Typography>
              </Stack>
            </Box>
          </Stack>
        </Grid>
        <Grid item md={6} lg={6} xl={6}>
          <Stack direction="row" spacing={2} alignItems="center">
            <IconButton>
              <FaCoins size={20} color={COLORS.primary} />
            </IconButton>
            <Box flex={1}>
              <Typography gutterBottom color="primary" fontWeight="bold">
                Prix
              </Typography>
              <Divider sx={{ mb: 1 }} />
              <Stack direction="row" justifyContent="space-between">
                <Stack direction="row" spacing={1} alignItems="flex-end" color="GrayText">
                  <Typography variant="h5" color={COLORS.warning}>
                    {state.prices.pricePerKG} $
                  </Typography>
                  <Typography variant="body2">/Kg</Typography>
                </Stack>
                <Divider />
                <Stack direction="row" spacing={1} alignItems="flex-end" color="GrayText">
                  <Typography variant="h5" color={COLORS.warning}>
                    {state.prices.pricePerSuitcase} $
                  </Typography>
                  <Typography variant="body2"> / valise*</Typography>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default FlightInformations;
