import { LoadingButton } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { FaShippingFast } from "react-icons/fa";
import { BsCheck2 } from "react-icons/bs";
import COLORS from "../../colors";
import { ConfirmReservationDelivery } from "../../firebase/db";
import { ReservationContext } from "../ProfileDetailsComponents/ReservationViewer";
import { IoArrowBackOutline, IoArrowForwardOutline } from "react-icons/io5";

const DeliveryConfirmationDialog = () => {
  const { data, deliveryDialog, setdeliveryDialog } = useContext(ReservationContext);
  const [confirmingDelevery, setconfirmingDelevery] = useState(false);
  const [state, setstate] = useState({
    title: "Confirmation de la réception",
    description: "Veuillez confirmer la réception de votre colis, l'action est irréversible.",
    delivered: false,
  });

  async function confirmDelivery() {
    console.log("confirming délivery");
    setconfirmingDelevery(true);
    const res = await ConfirmReservationDelivery(data?.id);
    setconfirmingDelevery(false);
    res
      ? setstate({
          ...state,
          title: "Réception confirmée",
          description: "N'oublier pas de noter le GP pour recevoir 1kg gratuit*",
          delivered: true,
        })
      : setstate({
          ...state,
          title: "Erreur lors de la confirmation",
          delivered: false,
        });
  }

  return (
    <Dialog open={deliveryDialog} onClose={() => setdeliveryDialog(false)}>
      <DialogTitle>{state.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{state.description}</DialogContentText>
        <Stack alignItems="center" p={4} spacing={2}>
          <FaShippingFast color={COLORS.primary} size={50} />
        </Stack>
        {state.delivered ? (
          <Button
            fullWidth
            endIcon={<IoArrowForwardOutline />}
            href={"/feedback/" + data?.id + "/?g=" + data?.gpId + "&c=" + data?.owner}
            color="warning"
          >
            Continuer
          </Button>
        ) : (
          <Stack direction="row" spacing={2}>
            <Button
              fullWidth
              color="error"
              startIcon={<IoArrowBackOutline />}
              variant="outlined"
              onClick={() => setdeliveryDialog(false)}
            >
              Retour
            </Button>
            <LoadingButton
              fullWidth
              variant="contained"
              endIcon={<BsCheck2 />}
              loading={confirmingDelevery}
              onClick={() => confirmDelivery()}
            >
              Confirmer
            </LoadingButton>
          </Stack>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DeliveryConfirmationDialog;
