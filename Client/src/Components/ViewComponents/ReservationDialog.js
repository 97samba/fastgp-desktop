import {
  Box,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";

const ReservationDialog = ({ success, loading }) => {
  return (
    <Box>
      <Dialog open={success} maxWidth="md">
        <DialogTitle>
          {success ? "Réservation en cours" : "Erreur lors de la réservation"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
          <Box flex={1} textAlign="center">
            <CircularProgress size={40} />
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ReservationDialog;
