import {
  Stack,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import React from "react";
import COLORS from "../../colors";
import { LoadingButton } from "@mui/lab";
import { RiHandCoinLine } from "react-icons/ri";

const PaymentValidationDialog = ({
  open,
  handleClose,
  paying,
  confirmPayment,
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle color="primary">Confirmer le paiement</DialogTitle>
      <DialogContent>
        <DialogContentText>
          En cliquant sur oui, vous confirmez avoir reçu le paiment du client
        </DialogContentText>
        <Stack flex={1} alignItems="center" my={2}>
          <RiHandCoinLine size={70} color={COLORS.primary} />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ my: 1 }}>
        <Button
          fullWidth
          size="medium"
          variant="outlined"
          color="error"
          onClick={handleClose}
        >
          Fermer
        </Button>

        <LoadingButton
          fullWidth
          loading={paying}
          variant="contained"
          color="success"
          onClick={confirmPayment}
        >
          Confirmer
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
export default PaymentValidationDialog;
