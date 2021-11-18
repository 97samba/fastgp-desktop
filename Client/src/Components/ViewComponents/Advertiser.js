import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
} from "@mui/material";
import React, { useContext } from "react";

import AdImage from "../../Images/online_ad.svg";
import { ViewContext } from "../Pages/View";

const Advertiser = ({ open, handleClose }) => {
  const { adViewed } = useContext(ViewContext);

  return (
    <Dialog open={open} fullWidth maxWidth="md" onClose={handleClose}>
      <DialogTitle>Voir les informations gratuitement</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Regarder une courte pub pour dévérouiller les informations
        </DialogContentText>
        <Stack justifyContent="center" alignItems="center" p={5}>
          <img width="90%" src={AdImage} />
        </Stack>
        <DialogContentText>Appuyer sur "Déverouiller" à la fin de la vidéo</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button>Abandonner</Button>
        <Button disabled={!adViewed}>Déverouiller</Button>
      </DialogActions>
    </Dialog>
  );
};

export default Advertiser;
