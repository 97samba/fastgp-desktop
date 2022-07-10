import {
  ButtonBase,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { FaPlane, FaPlaneDeparture } from "react-icons/fa";
import Qrcode from "react-qr-code";

import COLORS from "../../colors";

const BoardingPass = ({ sender, receiver, state, currency }) => {
  const [open, setopen] = useState(false);
  const QrCodePass = ({ big }) => {
    const url = "https://fir-c69a6.firebaseapp.com/reservationDetails/";
    // const url = "http://192.168.1.23:3000/reservationDetails/";
    function getQRCodeValue() {
      // return url+state.id + ", " + sender?.firstName + ", " + sender?.lastName;
      return url + state.id + "?c=" + state.clientID + "&g=" + state.GPId;
    }
    return (
      <Stack direction="row" justifyContent="center">
        <Qrcode
          value={getQRCodeValue()}
          bgColor="#F2F2F2F2"
          fgColor={COLORS.primary}
          size={big ? 220 : 120}
        />
      </Stack>
    );
  };
  const QRCOdeDialog = () => {
    return (
      <Dialog open={open} onClose={closeQrcodeDialog} fullWidth={true} maxWidth="xl">
        <DialogTitle>A flasher par votre transporteur</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Montrer ce qrcode pour que votre transporteur accéde rapidement à votre colis.
          </DialogContentText>
          <Box py={2}>
            <QrCodePass big={true} />
          </Box>
          <Typography textAlign="center">E-ticket</Typography>
        </DialogContent>
      </Dialog>
    );
  };

  function showQrCodeDialog() {
    setopen(true);
  }
  function closeQrcodeDialog() {
    setopen(false);
  }
  function getPrice() {
    if (state?.finalPrice) {
      return state.finalPrice + " " + state?.currency;
    }
    if (state?.prices) {
      if (state.itemType === "thing") return `${state.prices.pricePerKG} ${state.currency} /Kg`;
      else return "à déterminer";
    } else {
      return "à déterminer";
    }
  }
  return (
    <Box>
      <Box my={2}>
        <Paper elevation={0}>
          <Box my={2}>
            <Grid container>
              <Grid
                item
                xs={6}
                sm={2}
                md={2}
                lg={2}
                xl={2}
                bgcolor="#F2F2F2F2"
                sx={{
                  borderRadius: {
                    xs: "0px 0px 0px 10px",
                    sm: "10px 0px 0px 10px",
                  },
                  borderLeft: 1,
                  borderTop: 1,
                  borderBottom: 1,
                  borderColor: "#C5C5C5",
                }}
                order={{ xs: 1, sm: 0, md: 0 }}
              >
                <ButtonBase sx={{ width: "100%" }} onClick={showQrCodeDialog}>
                  <Box py={0.5} textAlign="center" color="GrayText">
                    <Typography variant="body2">Cliquer</Typography>
                    <Box my={1}>
                      <QrCodePass />
                    </Box>
                    <Typography variant="caption">Traçable </Typography>
                  </Box>
                </ButtonBase>
              </Grid>
              <Grid
                item
                xs={12}
                sm={7}
                md={7}
                lg={7}
                xl={7}
                bgcolor="#F2F2F2"
                sx={{
                  borderRadius: {
                    xs: "10px 10px 0px 0px",
                    sm: "0px 0px 0px 0px",
                  },

                  borderTop: 1,
                  borderBottom: {
                    xs: 0,
                    sm: "1px solid #C5C5C5",
                  },
                  borderLeft: {
                    xs: "1px solid #C5C5C5",
                    sm: 0,
                  },
                  borderRight: {
                    xs: "1px solid #C5C5C5",
                    sm: 0,
                  },
                  borderColor: "#C5C5C5",
                }}
                order={{ xs: 0 }}
              >
                <Box flex={1} p={2} mr={1}>
                  <Stack direction="row" spacing={1} mb={1}>
                    <Typography variant="body2">Colis transporté par </Typography>
                    <Typography fontWeight="bold" variant="body2" color="primary">
                      {state.publisher.firstName + " " + state.publisher.lastName}
                    </Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between" my={1} flex={1}>
                    <Box>
                      <Typography variant="h6" fontWeight={600} color="primary">
                        {state.departure.name.toUpperCase()}
                      </Typography>
                      <Typography variant="body2" color="GrayText ">
                        {state.departure.country}
                      </Typography>
                    </Box>
                    <Box textAlign="center" mt={1}>
                      <FaPlane color={COLORS.warning} size={18} />
                    </Box>
                    <Box textAlign="end">
                      <Typography variant="h6" fontWeight={600} color="primary">
                        {state.destination.name.toUpperCase()}
                      </Typography>
                      <Typography variant="body2" color="GrayText ">
                        {state.destination.country}
                      </Typography>
                    </Box>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <Box>
                      <Typography variant="caption">Envoyeur :</Typography>
                      <Typography variant="body2" color="GrayText">
                        {sender.firstName ? sender.firstName : "Prénom"}{" "}
                        {sender.lastName ? sender.lastName : "Nom"}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption">Colis :</Typography>
                      <Typography variant="body2" color="GrayText">
                        1 KG
                      </Typography>{" "}
                    </Box>
                    <Box>
                      <Typography variant="caption">Livraison :</Typography>
                      <Typography variant="body2" color="GrayText">
                        Non
                      </Typography>{" "}
                    </Box>
                  </Stack>
                </Box>
              </Grid>
              <Grid
                item
                xs={6}
                sm={3}
                md={3}
                lg={3}
                xl={3}
                order={{ xs: 2 }}
                bgcolor={COLORS.warning}
                borderRadius={{
                  xs: "0px 0px 10px 0px",
                  sm: "0px 10px 10px 0px",
                }}
                sx={{
                  borderRight: 1,
                  borderTop: 1,
                  borderBottom: 1,
                  borderColor: "#C5C5C5",
                  borderLeft: 2,
                  borderLeftColor: "#F5F5F5",
                  borderLeftStyle: "dashed",
                }}
              >
                <Box
                  bgcolor="white"
                  px={0.7}
                  py={0.4}
                  mt={-0.2}
                  position="absolute"
                  ml={-1}
                  display={{ xs: "none", sm: "block" }}
                  sx={{
                    borderRadius: {
                      xs: "0px 0px 10px 0px",
                      sm: "0px 0px 10px 10px",
                    },
                    borderLeft: 1,
                    borderRight: 1,
                    borderColor: "#C5C5C5",
                  }}
                ></Box>
                <Box p={2}>
                  <Box color="white">
                    <Stack direction="row" spacing={1} alignItems="center">
                      <FaPlaneDeparture />
                      <Typography>Fast GP</Typography>
                    </Stack>
                    <Box my={1}>
                      <Typography variant="caption">Receveur :</Typography>
                      <Typography>
                        {receiver.firstName ? receiver.firstName : "Prenom"}{" "}
                        {receiver.lastName ? receiver.lastName : "Nom"}
                      </Typography>
                    </Box>
                    <Stack direction="row" my={1} justifyContent="space-between">
                      <Box>
                        <Typography variant="caption">Prix :</Typography>
                        <Typography>{getPrice()}</Typography>
                      </Box>
                      <Box>
                        <Typography variant="caption">Payé :</Typography>
                        <Typography>{state?.paid ? "Oui" : "Non"}</Typography>
                      </Box>
                    </Stack>
                  </Box>
                </Box>
                <Box
                  bgcolor="white"
                  px={0.6}
                  py={0.5}
                  position="absolute"
                  ml={-1}
                  mt={1}
                  display={{ xs: "none", sm: "block" }}
                  sx={{
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    borderLeft: 1,
                    borderRight: 1,
                    borderColor: "#C5C5C5",
                  }}
                ></Box>
              </Grid>
            </Grid>
          </Box>
        </Paper>
        <QRCOdeDialog />
      </Box>
    </Box>
  );
};

export default BoardingPass;
