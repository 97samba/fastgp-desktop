import { Avatar, Button, Divider, Paper, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import {
  FaCoins,
  FaCreditCard,
  FaDotCircle,
  FaRegDotCircle,
  FaSuitcase,
  FaSuitcaseRolling,
} from "react-icons/fa";
import { IoIosAirplane } from "react-icons/io";
import moment from "moment";

const Flight = ({ data }) => {
  const Middle = () => {
    return (
      <Stack flex={4} justifyContent="space-between">
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
          <FaDotCircle size={15} color="#494aa2" />
          <Box flex={1}>
            <Divider orientation="horizontal" />
          </Box>
          <IoIosAirplane size={20} color="#494aa2" />
          <Box flex={1}>
            <Divider orientation="horizontal" />
          </Box>
          <FaRegDotCircle size={15} color="#494aa2" />
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
      <Stack direction="row" flex={3}>
        <Stack justifyContent="center" flex={1} alignItems="center">
          <Avatar sx={{ width: 30, height: 30 }}>
            <Typography fontSize={13}>{data.publisher.firstName[0].toUpperCase()}</Typography>
          </Avatar>
          <Typography fontSize={12}>{data.publisher.firstName}</Typography>
        </Stack>
        <Stack justifyContent="center" flex={2}>
          <Typography fontSize={13} fontWeight="bold">
            BNC
          </Typography>
          <Typography fontSize={13}>{data.departure}</Typography>
          <Typography fontSize={13}>{moment(data.distributionDate).format("ll")}</Typography>
        </Stack>
      </Stack>
    );
  };
  const Right = () => {
    return (
      <Stack direction="row" flex={3} spacing={3}>
        <Stack direction="column" justifyContent="flex-start" alignItems="flex-end" flex={3}>
          <Typography fontSize={13} fontWeight="bold">
            ROM
          </Typography>
          <Typography fontSize={13}>{data.destination}</Typography>
          <Typography fontSize={13}>{moment(data.departureDate).format("ll")}</Typography>
        </Stack>
        <Stack direction="column" flex={2}>
          <Stack direction="row">
            <Paper sx={{ padding: 0.4, border: 1, borderColor: "#C5C5C5", ml: 0.5 }} elevation={0}>
              <FaSuitcaseRolling size={13} color="gray" />
            </Paper>
            <Paper sx={{ padding: 0.4, border: 1, borderColor: "#C5C5C5", ml: 0.5 }} elevation={0}>
              <FaSuitcase size={13} color="gray" />
            </Paper>
            <Paper sx={{ padding: 0.4, border: 1, borderColor: "#C5C5C5", ml: 0.5 }} elevation={0}>
              <FaCreditCard size={13} color="gray" />
            </Paper>
            <Paper sx={{ padding: 0.4, border: 1, borderColor: "#C5C5C5", ml: 0.5 }} elevation={0}>
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
      <Stack direction="row" px={4} my={2} spacing={2} flex={1} alignItems="center">
        <Left />
        <Middle />
        <Right />
      </Stack>
    </Paper>
  );
};

export default Flight;
