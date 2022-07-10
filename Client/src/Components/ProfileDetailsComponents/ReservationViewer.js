import { Stack, Grid } from "@mui/material";
import { Box } from "@mui/system";
import React, { createContext, useEffect, useState } from "react";
import { EditReservationPrice } from "../../firebase/db";
import LoadingSkeleton from "../ReservationDetailsComponents/LoadingSkeleton";
import PackageInformations from "../ReservationDetailsComponents/PackageInformations";
import ClientInformationsSummary from "../ReservationDetailsComponents/ClientInformationsSummary";
import DeliveryStatusInformations from "../ReservationDetailsComponents/DeliveryStatusInformations";
import PaymentValidationDialog from "../ReservationDetailsComponents/PaymentValidationDialog";
import Title from "../ReservationDetailsComponents/Title";
import PriceInformationsSummary from "../ReservationDetailsComponents/PriceInformationsSummary";
import { Tracker } from "./Tracker";
import DeliveryConfirmationDialog from "../ReservationDetailsComponents/DeliveryConfirmationDialog";

export const ReservationContext = createContext();

const ReservationViewer = ({ data, setdata, loading, isClient, feedback }) => {
  //3 etapes, validation, voyage,liraison
  const [step, setstep] = useState(Tracker.getStep(data));
  const [price, setprice] = useState();
  const [changingPrice, setchangingPrice] = useState(false);
  const [paying, setpaying] = useState(false);
  const [paymentDialog, setpaymentDialog] = useState(false);
  const [deliveryDialog, setdeliveryDialog] = useState(false);

  useEffect(() => {
    setstep(Tracker.getStep(data));
    data?.finalPrice ? setprice(data.finalPrice) : setprice(data?.prices?.pricePerKG);
  }, [data]);

  async function changePrice() {
    if (price !== "" && price) {
      setchangingPrice(true);

      await EditReservationPrice(price, data.id, false).then(() =>
        setdata({ ...data, finalPrice: price })
      );
      setchangingPrice(false);
    }
  }
  async function confirmPayment() {
    if (price !== "" && price) {
      setpaying(true);

      await EditReservationPrice(price, data.id, true).then(() =>
        setdata({ ...data, finalPrice: price, paid: true })
      );
      setpaying(false);
      setpaymentDialog(false);
    }
  }

  function handleClose() {
    setpaymentDialog(false);
  }

  const exported = {
    step,
    setstep,
    price,
    setprice,
    changingPrice,
    setchangingPrice,
    paying,
    setpaying,
    paymentDialog,
    setpaymentDialog,
    deliveryDialog,
    setdeliveryDialog,
    data,
    setdata,
    loading,
    isClient,
    feedback,
    changePrice,
    confirmPayment,
  };

  return (
    <ReservationContext.Provider value={exported}>
      <Title data={data} />
      {loading ? (
        <LoadingSkeleton />
      ) : (
        <Box>
          <Stack spacing={3}>
            <DeliveryStatusInformations step={step} data={data} />
            <PackageInformations data={data} />
          </Stack>
          <Grid container spacing={2} mt={2}>
            <Grid item xs={12} sm={12} md={6} xl={6} lg={6}>
              <ClientInformationsSummary data={data} />
            </Grid>
            <Grid item xs={12} sm={12} md={6} xl={6} lg={6}>
              <PriceInformationsSummary paying={paying} setOpenDialog={setpaymentDialog} />
              <PaymentValidationDialog
                open={paymentDialog}
                handleClose={handleClose}
                paying={paying}
                confirmPayment={confirmPayment}
              />
              <DeliveryConfirmationDialog />
            </Grid>
          </Grid>
        </Box>
      )}
    </ReservationContext.Provider>
  );
};

export default ReservationViewer;
