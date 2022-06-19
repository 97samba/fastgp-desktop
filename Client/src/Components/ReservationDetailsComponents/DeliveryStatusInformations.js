import { Paper, Stack, Typography, Divider, Chip } from "@mui/material";
import { Box } from "@mui/system";
import moment from "moment";
import React from "react";
import { FaShippingFast } from "react-icons/fa";
import { GiHandTruck } from "react-icons/gi";
import { GoPackage } from "react-icons/go";
import COLORS from "../../colors";
import { Tracker } from "../ProfileDetailsComponents/Tracker";

const DeliveryStatusInformations = ({ data, step }) => {
  return (
    <Paper
      sx={{
        flex: 1,
        boxShadow: "0px 1px 3px rgba(3, 0, 71, 0.2)",
        borderRadius: 3,
      }}
      elevation={0}
    >
      <Box px={3} py={3}>
        <Stack direction="row" spacing={2} mb={2} alignItems="center">
          <Typography>Etat :</Typography>
          <Chip
            label={Tracker.getStatus(data).text}
            // color={getStatus(data.status).color}
            sx={{
              color: Tracker.getStatus(data).textColor,
              backgroundColor: Tracker.getStatus(data).color,
            }}
          />
        </Stack>
        <Stack direction="row" flex={1} alignItems="center">
          <Box
            borderRadius={10}
            bgcolor={COLORS.warning}
            p={{ xs: 1.5, md: 2 }}
          >
            <GoPackage size={30} color="white" />
          </Box>
          <Divider
            sx={{
              flex: 1,
              borderBottomWidth: 5,
              borderColor: step >= 1 ? COLORS.warning : "lightgray",
            }}
          />
          <Box
            borderRadius={10}
            bgcolor={step >= 2 ? COLORS.warning : "lightGray"}
            p={{ xs: 1.5, md: 2 }}
          >
            <FaShippingFast size={30} color="white" />
          </Box>
          <Divider
            sx={{
              flex: 1,
              borderBottomWidth: 5,
              borderColor: step >= 3 ? COLORS.warning : "lightgray",
            }}
          />
          <Box
            borderRadius={10}
            bgcolor={step >= 4 ? COLORS.warning : "lightGray"}
            p={{ xs: 1.5, md: 2 }}
          >
            <GiHandTruck size={30} color="white" />
          </Box>
        </Stack>
        <Stack direction="row" mt={3} display="flex">
          <Stack
            direction="row"
            p={1}
            bgcolor="#e76f513d"
            alignItems="center"
            borderRadius={4}
            color={COLORS.black}
            spacing={1}
            px={2}
          >
            <Typography variant="body1">
              Date de livraison estimée :{" "}
            </Typography>
            <Typography fontWeight={555} variant="body1">
              {moment(data.distributionDate).format("D MMMM")}
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </Paper>
  );
};
export default DeliveryStatusInformations;
