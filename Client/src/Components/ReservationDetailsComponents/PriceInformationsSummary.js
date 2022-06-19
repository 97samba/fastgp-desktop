import {
  Paper,
  Stack,
  Typography,
  Divider,
  Grid,
  Button,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { FaHandHoldingUsd } from "react-icons/fa";
import COLORS from "../../colors";
import { EditReservationPrice } from "../../firebase/db";
import { LoadingButton } from "@mui/lab";
import LoadingSkeleton from "../ReservationDetailsComponents/LoadingSkeleton";
import PackageInformations from "../ReservationDetailsComponents/PackageInformations";
import ClientInformationsSummary from "../ReservationDetailsComponents/ClientInformationsSummary";
import DeliveryStatusInformations from "../ReservationDetailsComponents/DeliveryStatusInformations";
import PaymentValidationDialog from "../ReservationDetailsComponents/PaymentValidationDialog";
import Title from "../ReservationDetailsComponents/Title";
import { Tracker } from "../ProfileDetailsComponents/Tracker";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

const PriceInformationsSummary = ({
  data,
  isClient,
  changePrice,
  confirmPayment,
  paying,
  changingPrice,
  price,
  setprice,
  setOpenDialog,
}) => {
  const [editing, setediting] = useState(false);
  function handlePriceChanging() {
    changePrice();
    setediting(false);
  }

  function handlePaying() {
    confirmPayment();
  }
  return (
    <Paper
      sx={{
        flex: 1,
        boxShadow: "0px 1px 3px rgba(3, 0, 71, 0.2)",
        borderRadius: 3,
      }}
      elevation={0}
    >
      <Stack spacing={2} color={COLORS.black} py={2} px={3}>
        <Typography fontSize={18} fontWeight={555}>
          Résumé
        </Typography>
        {editing ? (
          <TextField
            size="small"
            label={"Prix final en " + data.currency}
            value={price}
            onChange={(e) => setprice(e.target.value)}
            type="number"
            helperText="Assurez vous que le client est au courant"
          />
        ) : (
          <Stack spacing={1}>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body1" color="GrayText">
                Prix d'envoi:
              </Typography>
              <Typography variant="body1" fontWeight={555}>
                {data?.finalPrice
                  ? data?.finalPrice + " " + data.currency
                  : data.prices?.pricePerKG + " " + data.currency}
              </Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body1" color="GrayText">
                Livraison:
              </Typography>
              <Typography variant="body1" fontWeight={555}>
                0 {data.currency}
              </Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body1" color="GrayText">
                Réduction:
              </Typography>
              <Typography variant="body1" fontWeight={555}>
                {"- 0 " + data.currency}
              </Typography>
            </Stack>
            <Divider />
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body1" fontWeight={500}>
                Total:
              </Typography>
              <Typography variant="body1" fontWeight={500}>
                {data?.finalPrice
                  ? data?.finalPrice + " " + data.currency
                  : data.prices.pricePerKG + " " + data.currency}
              </Typography>
            </Stack>
          </Stack>
        )}
        {!data?.paid && isClient === false && (
          <>
            {editing ? (
              <LoadingButton
                loading={changingPrice}
                variant="outlined"
                color="warning"
                onClick={() => handlePriceChanging(false)}
              >
                Confirmer le prix
              </LoadingButton>
            ) : (
              <Button
                variant="outlined"
                color="warning"
                onClick={() => setediting(true)}
              >
                Changer le prix
              </Button>
            )}
            <Button
              fullWidth
              size="medium"
              variant="contained"
              color="success"
              endIcon={<FaHandHoldingUsd />}
              onClick={() => setOpenDialog(true)}
            >
              Confirmer le paiement
            </Button>
          </>
        )}
        {data?.paid && (
          <>
            {Tracker.getStep(data) === 3 ? (
              <Button
                fullWidth
                size="medium"
                variant="contained"
                color="success"
                endIcon={<IoMdCheckmarkCircleOutline />}
                // onClick={() => setOpenDialog(true)}
              >
                Confirmer la réception
              </Button>
            ) : (
              <Button
                fullWidth
                size="medium"
                variant="contained"
                color="success"
                endIcon={<FaHandHoldingUsd />}
                // onClick={() => setOpenDialog(true)}
              >
                Signaler un probléme
              </Button>
            )}
            <Typography variant="caption" fontWeight={500}>
              Payé en liquide
            </Typography>
          </>
        )}
      </Stack>
    </Paper>
  );
};

export default PriceInformationsSummary;
