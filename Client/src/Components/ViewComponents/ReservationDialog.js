import LoadingButton from "@mui/lab/LoadingButton";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useHistory } from "react-router-dom";
import COLORS from "../../colors";
import { useAuth } from "../../firebase/auth";

const ReservationDialog = ({
  reservationId,
  loading,
  open,
  handleReservation,
  sender,
  reciever,
  isReciever,
  setOpen,
  flight,
  itemType,
  payer,
  title,
}) => {
  const history = useHistory();
  const currentUser = useAuth();
  return (
    <Box>
      <Dialog open={open} maxWidth="md" onClose={() => setOpen(false)}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Vous y êtes presque, vérifez vos informations avant de valider.
          </DialogContentText>
          <Typography
            fontWeight={555}
            color={COLORS.primary}
            textAlign="center"
            gutterBottom
            mt={2}
          >
            Résumé
          </Typography>
          <Divider light />
          <Box flex={1} textAlign="center" mt={2}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="body2" color={COLORS.primary}>
                Envoyeur :{" "}
              </Typography>
              <Typography variant="body2" colors={COLORS.black}>
                {sender?.firstName +
                  " " +
                  sender?.lastName +
                  " -- " +
                  sender?.phoneNumber}
              </Typography>
            </Stack>
            {isReciever !== "yes" && (
              <Stack
                mt={2}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="body2" color={COLORS.primary}>
                  Receveur :{" "}
                </Typography>
                <Typography variant="body2" colors={COLORS.black}>
                  {reciever?.firstName +
                    " " +
                    reciever?.lastName +
                    " -- " +
                    reciever?.phoneNumber}
                </Typography>
              </Stack>
            )}
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              mt={2}
            >
              <Typography variant="body2" color={COLORS.primary}>
                Type de colis :{" "}
              </Typography>
              <Typography variant="body2" colors={COLORS.black}>
                {itemType}
              </Typography>
            </Stack>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              mt={2}
            >
              <Typography variant="body2" color={COLORS.primary}>
                Prix :{" "}
              </Typography>
              <Typography variant="body2" colors={COLORS.black}>
                {flight.prices.pricePerKG + flight.currency + " /Kg"}
              </Typography>
            </Stack>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              mt={2}
            >
              <Typography variant="body2" color={COLORS.primary}>
                Qui paye ? :{" "}
              </Typography>
              <Typography variant="body2" colors={COLORS.black}>
                {payer}
              </Typography>
            </Stack>
          </Box>
        </DialogContent>
        {reservationId === "" ? (
          <DialogActions>
            <Button size="small" color="error" onClick={() => setOpen(false)}>
              Annuler
            </Button>
            <LoadingButton
              size="small"
              variant="contained"
              loading={loading}
              color="success"
              onClick={handleReservation}
            >
              Réserver
            </LoadingButton>
          </DialogActions>
        ) : (
          <DialogActions>
            <Button size="small" color="error" onClick={() => setOpen(false)}>
              Fermer
            </Button>
            <Button
              color="primary"
              href={`/profilDetails/${currentUser?.uid}/packages`}
            >
              Voir la réservation
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </Box>
  );
};

export default ReservationDialog;
