import {
  Paper,
  Stack,
  Typography,
  IconButton,
  Divider,
  Grid,
  Button,
  CircularProgress,
  Link,
  Chip,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { Box } from "@mui/system";
import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  FaHandHoldingUsd,
  FaShippingFast,
  FaShoppingBag,
  FaUserAlt,
} from "react-icons/fa";
import { GiHandTruck, GiPayMoney } from "react-icons/gi";
import { GoPackage } from "react-icons/go";
import { MdOutlineDeleteForever, MdPhone, MdPhoto } from "react-icons/md";
import { useHistory } from "react-router-dom";
import COLORS from "../../colors";
import BoardingPass from "../ViewComponents/BoardingPass";
import { FaEuroSign, FaHandHolding, FaPlaneDeparture } from "react-icons/fa";
import { MdTextsms } from "react-icons/md";
import { deleteUserReservation, EditReservationPrice } from "../../firebase/db";
import { LoadingButton } from "@mui/lab";
import { RiHandCoinLine } from "react-icons/ri";
import { useAuth } from "../../firebase/auth";
import LoadingSkeleton from "../ReservationDetailsComponents/LoadingSkeleton";
import PackageInformations from "../ReservationDetailsComponents/PackageInformations";
import InformationViewer from "./InformationViewer";

const ClientInformationsSummary = ({ data }) => {
  return (
    <Paper
      sx={{
        flex: 1,
        boxShadow: "0px 1px 3px rgba(3, 0, 71, 0.2)",
        borderRadius: 3,
        minHeight: 200,
      }}
      elevation={0}
    >
      <Stack spacing={2} color={COLORS.black} py={2}>
        {/* <Typography variant="body1" fontWeight={500}>
                      Informations générales
                  </Typography> */}
        <Stack px={3}>
          <Typography fontSize={18} fontWeight={555} gutterBottom>
            Client
          </Typography>
          <Grid container rowSpacing={2} columnSpacing={6} pb={2} pt={1}>
            <InformationViewer
              full={true}
              icon={<GiPayMoney size={18} color={COLORS.primary} />}
              label="Payeur"
              information={
                <Typography>
                  {data.payer === "Envoyeur"
                    ? data.sender.firstName +
                      " " +
                      data.sender.lastName +
                      " (" +
                      data.payer +
                      ")"
                    : data.reciever.firstName +
                      " " +
                      data.reciever.lastName +
                      " (" +
                      data.payer +
                      ")"}
                </Typography>
              }
            />
            <InformationViewer
              full={true}
              icon={<FaHandHolding size={16} color={COLORS.primary} />}
              label="Receveur"
              information={
                <Typography>
                  {data.reciever.firstName + " " + data.reciever.lastName}
                </Typography>
              }
            />
          </Grid>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default ClientInformationsSummary;
