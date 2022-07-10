import { Paper, Stack, Typography, Divider, Button, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { FaHandHoldingUsd } from "react-icons/fa";
import COLORS from "../../colors";
import { LoadingButton } from "@mui/lab";
import { Tracker } from "../ProfileDetailsComponents/Tracker";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdOutlineReportProblem, MdPhone } from "react-icons/md";
import { IoStar } from "react-icons/io5";
import { useHistory } from "react-router-dom";
import { ReservationContext } from "../ProfileDetailsComponents/ReservationViewer";

const Summary = ({ data }) => {
  return (
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
            : data.prices?.pricePerKG + " " + data.currency}
        </Typography>
      </Stack>
    </Stack>
  );
};

const GpPriceHandle = ({
  changingPrice,
  handlePriceChanging,
  setediting,
  setOpenDialog,
  editing,
}) => {
  return (
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
        <Button variant="outlined" color="warning" onClick={() => setediting(true)}>
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
  );
};

const AfterPaidActions = () => {
  const { data, isClient, setdeliveryDialog } = useContext(ReservationContext);
  return (
    <>
      {Tracker.getStep(data) >= 3 && Tracker.getStep(data) < 4 ? (
        <>
          {isClient ? (
            <>
              <Button
                fullWidth
                size="medium"
                variant="contained"
                color="success"
                endIcon={<IoMdCheckmarkCircleOutline />}
                onClick={() => setdeliveryDialog(true)}
              >
                Confirmer la réception
              </Button>
            </>
          ) : (
            <Button
              href={"tel:" + data?.reciever?.phoneNumber}
              variant="contained"
              color="success"
              endIcon={<MdPhone />}
            >
              Appeller le client
            </Button>
          )}
        </>
      ) : (
        <Button
          fullWidth
          size="medium"
          variant="contained"
          color="success"
          href="/contactUs"
          endIcon={<MdOutlineReportProblem />}
          // onClick={() => setOpenDialog(true)}
        >
          Signaler un probléme
        </Button>
      )}
    </>
  );
};

const PriceInformationsSummary = ({ paying, changingPrice, setOpenDialog }) => {
  const { data, isClient, feedback, price, setprice, changePrice, confirmPayment } =
    useContext(ReservationContext);

  const [editing, setediting] = useState(false);
  const history = useHistory();

  function handlePriceChanging() {
    changePrice();
    setediting(false);
  }

  function handlePaying() {
    confirmPayment();
  }

  return (
    <>
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
            <Summary data={data} />
          )}

          {!data?.paid && isClient === false && (
            <GpPriceHandle
              setOpenDialog={setOpenDialog}
              setediting={setediting}
              changingPrice={changingPrice}
              editing={editing}
              handlePriceChanging={handlePriceChanging}
            />
          )}
          {data?.paid && <AfterPaidActions />}
          {/* {data?.paid && isClient && Tracker.getStep() >= 4 && ( */}
          {/* réservation payée, le client, pas de feedback */}
          {data?.paid && isClient && !feedback?.owner && (
            <Button
              variant="contained"
              color="warning"
              fullWidth
              endIcon={<IoStar />}
              href={"/feedback/" + data.id + "?g=" + data.gpId + "&c=" + data.owner}
            >
              Noter le transporteur
            </Button>
          )}
          {data?.paid && (
            <Typography color={COLORS.black} variant="caption" fontWeight={500}>
              Payé en liquide
            </Typography>
          )}
        </Stack>
      </Paper>
    </>
  );
};

export default PriceInformationsSummary;
