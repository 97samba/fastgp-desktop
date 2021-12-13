import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  CircularProgress,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useState } from "react";
import { ViewContext } from "../Pages/View";

const ViewDIalog = () => {
  const { dialogOpen, setdialogOpen } = useContext(ViewContext);
  const [dialogState, setDialogState] = useState({
    open: true,
    title: "Résumé de la réservation",
    loading: true,
  });

  return (
    <Box>
      <Dialog open={dialogOpen} maxWidth="lg">
        <DialogTitle>{dialogState.title}</DialogTitle>
        <DialogContent>
          {dialogState.loading ? (
            <Box textAlign="center" p={4}>
              <CircularProgress />
              <Typography pt={3}>Chargement en cours... </Typography>
            </Box>
          ) : (
            <Box>
              <DialogContentText>test</DialogContentText>
            </Box>
          )}
        </DialogContent>
        {!dialogState.loading && (
          <DialogActions>
            <Button>Valider</Button>
          </DialogActions>
        )}
      </Dialog>
    </Box>
  );
};

export default ViewDIalog;
