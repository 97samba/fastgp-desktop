import {
  Divider,
  Grid,
  IconButton,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import moment from "moment";
import React, { useContext } from "react";
import { BsCalendar2X, BsCalendarWeek } from "react-icons/bs";
import { RiSuitcase2Line } from "react-icons/ri";
import { GoPackage } from "react-icons/go";

import { IoAirplaneSharp, IoPricetagsOutline } from "react-icons/io5";
import COLORS from "../../colors";
import { FaInfo } from "react-icons/fa";

const FlightInformations = ({ state, context, label }) => {
  const { loading } = useContext(context);

  return (
    <Box>
      <Paper
        sx={{
          py: 2,
          px: { xs: 2, sm: 2, md: 3 },
          mb: 1,
          boxShadow: "0px 1px 3px rgba(3, 0, 71, 0.2)",
        }}
        elevation={0}
      >
        <Box flex={1} textAlign="center">
          <Typography variant="body2" color="primary">
            {label}
          </Typography>
        </Box>
        <Grid container rowSpacing={3} columnSpacing={6}>
          <Grid item xs={5} sm={4} md={4} xl={4} mb={1} textAlign="start">
            <Typography variant="h4" color="primary">
              {loading ? <Skeleton height={60} /> : state.departure.name}
            </Typography>
            <Typography variant="body2" color="GrayText">
              {loading ? <Skeleton /> : state.departure.country}
            </Typography>
          </Grid>
          <Grid item xs={2} sm={4} md={4} xl={4} pt={3} textAlign="center">
            <Box py={0.5}></Box>
            <IoAirplaneSharp size={22} color={COLORS.warning} />
          </Grid>
          <Grid item xs={5} sm={4} md={4} xl={4} textAlign="end">
            <Typography variant="h4" color="primary">
              {loading ? <Skeleton height={60} /> : state.destination.name}
            </Typography>
            <Typography variant="body2" color="GrayText">
              {loading ? <Skeleton /> : state.destination.country}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            {loading ? (
              <Skeleton height={60} />
            ) : (
              <Stack direction="row" spacing={2} alignItems="center">
                <IconButton>
                  <BsCalendarWeek color="#494aa2" />
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
            )}
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            {loading ? (
              <Skeleton height={60} />
            ) : (
              <Stack direction="row" spacing={2} alignItems="center">
                <IconButton>
                  <BsCalendar2X color={COLORS.primary} />
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
            )}
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            {loading ? (
              <Skeleton height={60} />
            ) : (
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
            )}
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            {loading ? (
              <Skeleton height={60} />
            ) : (
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
            )}
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            {loading ? (
              <Skeleton height={60} />
            ) : (
              <Stack direction="row" spacing={2} alignItems="center">
                <IconButton>
                  <RiSuitcase2Line color={COLORS.primary} />
                </IconButton>
                <Box flex={1}>
                  <Typography gutterBottom color="primary" fontWeight="bold">
                    Poids disponible
                  </Typography>
                  <Divider sx={{ mb: 1 }} />
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="flex-end"
                    color="GrayText"
                  >
                    <Typography
                      variant="body1"
                      color={COLORS.warning}
                      fontWeight={555}
                    >
                      58
                    </Typography>
                    <Typography variant="body2">Kg</Typography>
                  </Stack>
                </Box>
              </Stack>
            )}
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            {loading ? (
              <Skeleton height={60} />
            ) : (
              <Stack direction="row" spacing={2} alignItems="center">
                <IconButton>
                  <IoPricetagsOutline size={20} color={COLORS.primary} />
                </IconButton>
                <Box flex={1}>
                  <Typography gutterBottom color="primary" fontWeight="bold">
                    Prix
                  </Typography>
                  <Divider sx={{ mb: 1 }} />
                  <Stack direction="row" justifyContent="space-between">
                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="flex-end"
                      color="GrayText"
                    >
                      <Typography
                        variant="body1"
                        color={COLORS.warning}
                        fontWeight={555}
                      >
                        {state.prices.pricePerKG + " " + state.currency}
                      </Typography>
                      <Typography variant="body2">/Kg</Typography>
                    </Stack>
                    <Divider />
                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="flex-end"
                      color="GrayText"
                    >
                      <Typography
                        variant="body1"
                        color={COLORS.warning}
                        fontWeight={555}
                      >
                        {state.prices.pricePerSuitcase + " " + state.currency}
                      </Typography>
                      <Typography variant="body2"> / valise*</Typography>
                    </Stack>
                  </Stack>
                </Box>
              </Stack>
            )}
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            {loading ? (
              <Skeleton height={60} />
            ) : (
              <Stack direction="row" spacing={2} alignItems="center">
                <IconButton>
                  <FaInfo color="#494aa2" />
                </IconButton>
                <Box flex={1}>
                  <Typography gutterBottom color="primary" fontWeight="bold">
                    Informations supplémentaires
                  </Typography>
                  <Divider sx={{ mb: 1 }} />
                  <Typography variant="body2" color="GrayText">
                    {state.moreInfo
                      ? state.moreInfo
                      : "Pas d'informations supplémentaires"}
                  </Typography>
                </Box>
              </Stack>
            )}
          </Grid>
        </Grid>
      </Paper>
      <Typography
        color="GrayText"
        gutterBottom
        variant="captions"
        display={{ sx: "block", sm: "block", md: "none" }}
      >
        1 kilo gratuit aprés 3 envois*
      </Typography>{" "}
    </Box>
  );
};

export default FlightInformations;
