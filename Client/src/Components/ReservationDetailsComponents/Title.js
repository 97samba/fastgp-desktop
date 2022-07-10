import {
  Stack,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import React, { useState } from "react";
import { FaShoppingBag } from "react-icons/fa";
import { MdOutlineDeleteForever } from "react-icons/md";
import { useHistory } from "react-router-dom";
import COLORS from "../../colors";
import { deleteUserReservation } from "../../firebase/db";
import { LoadingButton } from "@mui/lab";
import { useAuth } from "../../firebase/auth";

const Title = ({ data }) => {
  const [deleteDialog, setdeleteDialog] = useState(false);
  const history = useHistory();
  const currentUser = useAuth();

  async function handleDeleteReservation() {
    await deleteUserReservation(data.id)
      .then(() => setdeleteDialog(false))
      .then(() => history.push("/profilDetails/" + currentUser?.uid));
  }

  const SuppressionDialog = () => {
    return (
      <Dialog open={deleteDialog} onClose={() => setdeleteDialog(false)}>
        <DialogTitle>Confirmer la suppression</DialogTitle>
        <DialogContent>
          <DialogContentText>Voulez-vous réellement supprimer la réservation ?</DialogContentText>
          <Stack flex={1} alignItems="center" my={2}>
            <MdOutlineDeleteForever size={60} color={COLORS.black} />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button fullWidth variant="outlined" size="medium" onClick={() => setdeleteDialog(false)}>
            Fermer
          </Button>
          <LoadingButton
            fullWidth
            variant="contained"
            color="error"
            size="medium"
            onClick={handleDeleteReservation}
          >
            Supprimer
          </LoadingButton>
        </DialogActions>
      </Dialog>
    );
  };
  return (
    <Stack
      direction="row"
      spacing={2}
      alignItems="center"
      // display={{ xs: "none", sm: "none", md: "flex" }}
      mb={2}
    >
      <FaShoppingBag color={COLORS.warning} />

      <Typography
        display={{ xs: "none", sm: "none", md: "flex" }}
        fontWeight="bold"
        variant="h5"
        color="primary"
        flexGrow={1}
      >
        Détails de la réservation
      </Typography>
      <Typography
        display={{ xs: "flex", sm: "flex", md: "none" }}
        fontWeight="bold"
        variant="h6"
        color="primary"
        flexGrow={1}
      >
        Réservation
      </Typography>
      <Button
        color="error"
        onClick={() => setdeleteDialog(true)}
        endIcon={<MdOutlineDeleteForever />}
        disabled={data?.status === "delivered"}
      >
        {" "}
        Supprimer
      </Button>
      <SuppressionDialog />
    </Stack>
  );
};
export default Title;
