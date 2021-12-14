import {
  Avatar,
  Button,
  Chip,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
  Link,
  MenuItem,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import {
  FaCoins,
  FaCreditCard,
  FaDotCircle,
  FaGlobeAfrica,
  FaPlaneArrival,
  FaPlaneDeparture,
  FaRegDotCircle,
  FaShippingFast,
  FaSuitcase,
  FaSuitcaseRolling,
} from "react-icons/fa";
import { IoIosAirplane } from "react-icons/io";
import moment from "moment";
import colors from "../colors";
import { useHistory } from "react-router";
import COLORS from "../colors";

const Flight = ({ data }) => {
  const history = useHistory();
  const viewFlight = (flight) => {
    history.push(`/view/${flight.id}`, flight);
  };
  const calculateWeight = () => {
    let weight = 0;
    data.suitcases.map((suitecase) => (weight += suitecase.weight));
    return weight;
  };
  const Middle = () => {
    return (
      <Stack justifyContent="space-between" spacing={2}>
        <Stack
          direction="row"
          justifyContent="space-between"
          flex={1}
          alignItems="center"
          spacing={1}
          color="#535591"
        >
          <FaDotCircle size={13} />
          <Box flex={1}>
            <Divider orientation="horizontal" />
          </Box>
          <IoIosAirplane size={20} />
          <Box flex={1}>
            <Divider orientation="horizontal" />
          </Box>
          <FaRegDotCircle size={13} />
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="center" spacing={1} my={2}>
          <Typography fontSize={12} color="gray">
            {calculateWeight()} kg
          </Typography>
          <FaSuitcase color="#e76f51" size={12} />
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
        <Typography fontSize={20} color="secondary">
          {data.departure.name}
        </Typography>

        <Stack direction="row" alignItems="center" spacing={0.5}>
          <FaPlaneDeparture color={colors.warning} size={12} />
          <Typography fontSize={13} color="GrayText">
            {moment(data.departureDate).format("dddd D MMM")}
          </Typography>
        </Stack>
      </Stack>
    );
  };

  const Right = () => {
    return (
      <Stack direction="column" spacing={1} alignItems="flex-end">
        <Typography fontSize={20} color="secondary">
          {data.destination.name}
        </Typography>
        <Stack
          direction="row"
          alignItems="center"
          spacing={0.5}
          mt={1}
          sx={{ display: { xs: "none", sm: "none", md: "flex" } }}
        >
          <FaPlaneArrival color={colors.warning} size={12} />
          <Typography fontSize={13} color="Graytext">
            {moment(data.distributionDate).format("dddd D MMM")}
          </Typography>
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          spacing={0.5}
          sx={{ display: { xs: "flex", md: "none", sm: "flex" } }}
        >
          <Typography variant="body1" fontWeight={555} color={COLORS.warning}>
            {data.prices.pricePerKG} €
          </Typography>
        </Stack>
      </Stack>
    );
  };
  const Coupon = () => {
    return (
      <Box>
        <Box
          bgcolor="#f6f6f9"
          px={1}
          py={0.6}
          mt={-0.1}
          position="absolute"
          ml={-1}
          sx={{
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            borderLeft: 1,
            borderRight: 1,
            borderColor: "#E2E2E2",
          }}
        ></Box>

        <Stack borderLeft={0.1} borderColor="#E2E2E2" p={2}>
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
            <Stack direction="row" alignItems="flex-end" spacing={1} flexGrow={1}>
              <Typography fontSize={22} fontWeight="555" color="primary">
                {data.prices.pricePerKG}
              </Typography>
              <Typography fontSize={16} fontWeight="555" color="primary">
                $
              </Typography>
              <Typography variant="caption"> /kg</Typography>
            </Stack>
          </Stack>
          <Button
            variant="contained"
            size="small"
            fullWidth
            color="warning"
            onClick={() => viewFlight(data)}
          >
            Voir
          </Button>
        </Stack>
        <Box
          bgcolor="#f6f6f9"
          px={1}
          py={0.6}
          position="absolute"
          ml={-1}
          mt={-1.1}
          sx={{
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            borderLeft: 1,
            borderRight: 1,
            borderColor: "#E2E2E2",
          }}
        ></Box>
      </Box>
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
            <Link underline="none" href={`/GPprofile/${data.ownerId}`}>
              <Avatar sx={{ width: 24, height: 24 }}>
                <Typography fontSize={11}>{data.publisher.firstName[0].toUpperCase()}</Typography>
              </Avatar>
            </Link>
            <Box>
              <Link underline="hover" href={`/GPprofile/${data.ownerId}`}>
                <Typography fontSize={12}>{data.publisher.firstName}</Typography>
              </Link>
              <Stack direction="row" alignItems="center" spacing={0.3}>
                <Typography fontSize={9}>{moment(data.createdAt).fromNow()}</Typography>
                <Typography fontSize={9}>. </Typography>
                <FaGlobeAfrica size={10} color="#C5C5C5" />
              </Stack>
            </Box>
          </Stack>
          <Stack direction="row-reverse" spacing={0.5} flex={1}>
            {data.canShip ? (
              <Chip
                label="Livraison"
                variant="filled"
                icon={<FaShippingFast size={15} color="gray" />}
                sx={{ borderColor: "#C5C5C5" }}
                size="small"
              />
            ) : null}
            {data.paymentMethod
              .filter((payment) => payment.supported)
              .map((method, index) => (
                <Chip
                  label={method.label}
                  key={index}
                  variant="filled"
                  icon={<FaCoins size={12} color="gray" />}
                  sx={{ borderColor: "#C5C5C5" }}
                  size="small"
                />
              ))}
          </Stack>
        </Stack>
        <Box display={{ xs: "block", sm: "block", md: "none", lg: "none", xl: "none" }}>
          <MenuItem onClick={() => viewFlight(data)}>
            <Grid p={2} container flex={1} alignItems="center">
              <Grid item xs={4} md={3} sm={4} lg={3} xl={3}>
                <Left />
              </Grid>
              <Grid item xs={4} md={6} sm={4} lg={6} xl={6}>
                <Middle />
              </Grid>
              <Grid item xs={4} md={3} sm={4} lg={3} xl={3}>
                <Right />
              </Grid>
            </Grid>
          </MenuItem>
        </Box>
        <Box display={{ xs: "none", sm: "none", md: "block", lg: "block", xl: "block" }}>
          <Grid p={2} container flex={1} alignItems="center">
            <Grid item xs={4} md={3} sm={4} lg={3} xl={3}>
              <Left />
            </Grid>
            <Grid item xs={4} md={6} sm={4} lg={6} xl={6}>
              <Middle />
            </Grid>
            <Grid item xs={4} md={3} sm={4} lg={3} xl={3}>
              <Right />
            </Grid>
          </Grid>
        </Box>
      </Box>
    );
  };

  return (
    <Paper
      sx={{
        // boxShadow: "1px 1px 3px 1px #e2e2e2",
        border: 1,
        borderColor: "#E2E2E2",
        marginBottom: 3,
        "&:hover": { boxShadow: "1px 1px 4px 1px #E5E5E5", border: 0 },
      }}
      elevation={0}
    >
      <Grid container>
        <Grid item xs={12} sm={12} md={9} xl={9} lg={9} alignItems="center" flex={1}>
          <Ticket />
        </Grid>
        <Grid
          item
          md={3}
          xl={3}
          lg={3}
          flex={1}
          sx={{ display: { xs: "none", sm: "none", md: "block" } }}
        >
          <Coupon />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Flight;
