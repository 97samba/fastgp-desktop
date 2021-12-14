import {
  Box,
  Typography,
  Grid,
  TextField,
  Stack,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import React, { useContext, useState } from "react";

import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import TimePicker from "@mui/lab/TimePicker";
import moment from "moment";
import { CreationContext } from "../Pages/Creation";

const Dates = () => {
  const {
    departureDate,
    setdepartureDate,
    distributionDate,
    setdistributionDate,
    lastDepot,
    setlastDepot,
    acceptJJ,
    setacceptJJ,
  } = useContext(CreationContext);

  const [dateOpenDeparture, setdateOpenDeparture] = useState(false);
  const [dateOpenDestination, setdateOpenDestination] = useState(false);

  return (
    <Stack
      direction={{ xs: "column", sm: "row", md: "row" }}
      mt={4}
      flex={1}
      sx={{ borderBottom: 1, pb: 2, borderColor: "lightgray" }}
    >
      <Box flex={2}>
        <Typography gutterBottom>3. Dates </Typography>
      </Box>
      <Grid container flex={3} spacing={2}>
        <Grid item md={6} lg={6} xs={12}>
          <DesktopDatePicker
            type="date"
            value={departureDate}
            label="Date de départ"
            renderInput={(params) => (
              <TextField
                {...params}
                size="small"
                fullWidth
                onClick={() => setdateOpenDeparture(true)}
              />
            )}
            onChange={(value) => {
              setdepartureDate(value);
              if (moment(departureDate).isSameOrAfter(distributionDate)) {
                setdistributionDate(value);
              }
            }}
            open={dateOpenDeparture}
            onOpen={() => setdateOpenDeparture(true)}
            onClose={() => setdateOpenDeparture(false)}
            minDate={moment(new Date())}
          />
        </Grid>
        <Grid item md={6} lg={6} xs={12}>
          <DesktopDatePicker
            value={distributionDate}
            type="date"
            label="Date de d'arrivée"
            renderInput={(params) => (
              <TextField
                {...params}
                size="small"
                fullWidth
                onClick={() => setdateOpenDestination(true)}
              />
            )}
            onChange={(value) => setdistributionDate(value)}
            open={dateOpenDestination}
            onOpen={() => setdateOpenDestination(true)}
            onClose={() => setdateOpenDestination(false)}
            minDate={moment(departureDate)}
          />
        </Grid>
        <Grid item md={12} lg={12} xs={12}>
          <FormControl>
            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
              <Typography variant="body2">Acceptez-vous des colis le jour-j ?</Typography>
              <RadioGroup row value={acceptJJ}>
                <FormControlLabel
                  value="oui"
                  label="Oui"
                  control={<Radio size="small" />}
                  onChange={(e) => setacceptJJ(e.target.value)}
                />
                <FormControlLabel
                  value="non"
                  label="Non"
                  control={<Radio size="small" />}
                  onChange={(e) => setacceptJJ(e.target.value)}
                />
              </RadioGroup>
            </Stack>
          </FormControl>
        </Grid>
        <Grid item md={6} lg={6} xs={12}>
          {acceptJJ === "oui" ? (
            <TimePicker
              type="date"
              value={lastDepot}
              label="Dernier délai"
              renderInput={(params) => <TextField {...params} size="small" />}
              onChange={(date) => setlastDepot(date)}
            />
          ) : null}
        </Grid>
      </Grid>
    </Stack>
  );
};

export default Dates;
