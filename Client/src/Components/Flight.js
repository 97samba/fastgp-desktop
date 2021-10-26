import { Avatar, Button, Chip, Divider, Grid, Paper, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import {
  FaCoins,
  FaCreditCard,
  FaDotCircle,
  FaGlobeAfrica,
  FaRegDotCircle,
  FaShippingFast,
  FaSuitcase,
  FaSuitcaseRolling,
} from "react-icons/fa";
import { IoIosAirplane } from "react-icons/io";
import moment from "moment";
moment.locale("fr", {
  months:
    "janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre".split(
      "_"
    ),
  monthsShort: "janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.".split("_"),
  monthsParseExact: true,
  weekdays: "dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),
  weekdaysShort: "dim._lun._mar._mer._jeu._ven._sam.".split("_"),
  weekdaysMin: "Di_Lu_Ma_Me_Je_Ve_Sa".split("_"),
  weekdaysParseExact: true,
  longDateFormat: {
    LT: "HH:mm",
    LTS: "HH:mm:ss",
    L: "DD/MM/YYYY",
    LL: "D MMMM YYYY",
    LLL: "D MMMM YYYY HH:mm",
    LLLL: "dddd D MMMM YYYY HH:mm",
  },
  calendar: {
    sameDay: "[Aujourd’hui à] LT",
    nextDay: "[Demain à] LT",
    nextWeek: "dddd [à] LT",
    lastDay: "[Hier à] LT",
    lastWeek: "dddd [dernier à] LT",
    sameElse: "L",
  },
  relativeTime: {
    future: "dans %s",
    past: "il y a %s",
    s: "quelques secondes",
    m: "une minute",
    mm: "%d minutes",
    h: "une heure",
    hh: "%d heures",
    d: "un jour",
    dd: "%d jours",
    M: "un mois",
    MM: "%d mois",
    y: "un an",
    yy: "%d ans",
  },
  dayOfMonthOrdinalParse: /\d{1,2}(er|e)/,
  ordinal: function (number) {
    return number + (number === 1 ? "er" : "e");
  },
  meridiemParse: /PD|MD/,
  isPM: function (input) {
    return input.charAt(0) === "M";
  },
  // In case the meridiem units are not separated around 12, then implement
  // this function (look at locale/id.js for an example).
  // meridiemHour : function (hour, meridiem) {
  //     return /* 0-23 hour, given meridiem token and hour 1-12 */ ;
  // },
  meridiem: function (hours, minutes, isLower) {
    return hours < 12 ? "PD" : "MD";
  },
  week: {
    dow: 1, // Monday is the first day of the week.
    doy: 4, // Used to determine first week of the year.
  },
});
const Flight = ({ data }) => {
  const Middle = () => {
    return (
      <Stack justifyContent="space-between">
        <Box>
          <Stack direction="row" alignItems="center" justifyContent="center" spacing={1} my={1}>
            <Typography fontSize={12} color="#494aa2">
              {/* 54 kg */}
            </Typography>
            {/* <FaSuitcase color="#494aa2" size={12} /> */}
          </Stack>
        </Box>
        <Stack
          direction="row"
          justifyContent="space-between"
          flex={1}
          alignItems="center"
          spacing={1}
        >
          <FaDotCircle size={13} color="#494aa2" />
          <Box flex={1}>
            <Divider orientation="horizontal" />
          </Box>
          <IoIosAirplane size={20} color="#494aa2" />
          <Box flex={1}>
            <Divider orientation="horizontal" />
          </Box>
          <FaRegDotCircle size={13} color="#494aa2" />
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="center" spacing={1} my={1}>
          <Typography fontSize={12} color="#494aa2">
            54 kg
          </Typography>
          <FaSuitcase color="#494aa2" size={12} />
        </Stack>
      </Stack>
    );
  };
  const Left = () => {
    return (
      <Stack direction="column" spacing={1}>
        {/* <Typography fontSize={13} fontWeight="bold" color="#494aa2">
          BNC
        </Typography> */}
        <Typography fontSize={20}>{data.departure}</Typography>
        <Typography fontSize={12} color="#808080" noWrap={false}>
          {moment(data.lastDepot).format("dddd D MMMM")}
        </Typography>
      </Stack>
    );
  };

  const Right = () => {
    return (
      <Stack direction="column" spacing={1} alignItems="flex-end">
        {/* <Typography fontSize={13} fontWeight="bold" color="#494aa2">
          ROM
        </Typography> */}
        <Typography fontSize={20}>{data.destination}</Typography>
        <Typography fontSize={12} color="#808080" nowrap={true}>
          {moment(data.distributionDate).format("dddd D MMMM")}
        </Typography>
      </Stack>
    );
  };
  const Coupon = () => {
    return (
      <Stack direction="column" flex={2} borderLeft={0.1} borderColor="#E2E2E2" p={2}>
        <Stack direction="row" spacing={1}>
          <Paper sx={{ padding: 0.4, border: 1, borderColor: "#C5C5C5" }} elevation={0}>
            <FaSuitcaseRolling size={13} color="gray" />
          </Paper>
          <Paper sx={{ padding: 0.4, border: 1, borderColor: "#C5C5C5" }} elevation={0}>
            <FaSuitcase size={13} color="gray" />
          </Paper>
          <Paper sx={{ padding: 0.4, border: 1, borderColor: "#C5C5C5" }} elevation={0}>
            <FaCreditCard size={13} color="gray" />
          </Paper>
          <Paper sx={{ padding: 0.4, border: 1, borderColor: "#C5C5C5" }} elevation={0}>
            <FaCoins size={13} color="gray" />
          </Paper>
        </Stack>
        <Stack direction="row" my={1}>
          <Typography fontSize={14} color="#494aa2">
            $
          </Typography>
          <Stack direction="row">
            <Typography fontSize={22} fontWeight="555" color="#494aa2">
              {data.pricePerKg}
            </Typography>
          </Stack>
        </Stack>
        <Button variant="contained" size="small" fullWidth color="warning">
          Voir
        </Button>
      </Stack>
    );
  };
  const Ticket = () => {
    return (
      <Box>
        <Stack
          p={0.5}
          px={1}
          direction="row"
          alignItems="center"
          height="10%"
          borderBottom={0.2}
          borderColor="#e2e2e2"
        >
          <Stack direction="row" alignItems="center" flex={1} spacing={1}>
            <Avatar sx={{ width: 24, height: 24 }}>
              <Typography fontSize={11}>{data.publisher.firstName[0].toUpperCase()}</Typography>
            </Avatar>
            <Box>
              <Typography fontSize={12}>{data.publisher.firstName}</Typography>
              <Stack direction="row" alignItems="center" spacing={0.3}>
                <Typography fontSize={9}>1h </Typography>
                <Typography fontSize={9}>. </Typography>
                <FaGlobeAfrica size={10} color="#C5C5C5" />
              </Stack>
            </Box>
          </Stack>
          <Stack direction="row-reverse" spacing={0.5} flex={1}>
            <Chip
              label="Livraison"
              variant="filled"
              icon={<FaShippingFast size={15} color="gray" />}
              sx={{ borderColor: "#C5C5C5" }}
              size="small"
            />
            <Chip
              label="Wave"
              variant="filled"
              icon={<FaCoins size={12} color="gray" />}
              sx={{ borderColor: "#C5C5C5" }}
              size="small"
            />
          </Stack>
        </Stack>

        <Grid p={2} container flex={1} alignItems="center" height="90%">
          <Grid item md={3}>
            <Left />
          </Grid>
          <Grid item md={6}>
            <Middle />
          </Grid>
          <Grid item md={3}>
            <Right />
          </Grid>
        </Grid>
      </Box>
    );
  };
  const GPAvatar = () => {
    return (
      <Stack justifyContent="center" flex={1} alignItems="center">
        <Avatar sx={{ width: 30, height: 30 }}>
          <Typography fontSize={13}>{data.publisher.firstName[0].toUpperCase()}</Typography>
        </Avatar>
        <Typography fontSize={12}>{data.publisher.firstName}</Typography>
      </Stack>
    );
  };
  return (
    <Paper
      sx={{
        boxShadow: "1px 1px 3px 1px #e2e2e2",
        border: 1,
        borderColor: "#F2F2F2",
        marginBottom: 3,
      }}
      elevation={0}
    >
      <Grid container>
        <Grid item md={9} flex={1} alignItems="center">
          <Ticket />
        </Grid>
        <Grid item md={3}>
          <Coupon />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Flight;
