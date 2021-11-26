import { Divider, Grid, Paper, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext } from "react";
import { FaPlane, FaPlaneDeparture } from "react-icons/fa";
import { ViewContext } from "../Pages/View";
import Qrcode from "react-qr-code";

import COLORS from "../../colors";

const BoardingPass = () => {
  const { sender, receiver, state } = useContext(ViewContext);

  const QrCodePass = () => {
    function getQRCodeValue() {
      return state.id + ", " + sender.firstName + ", " + sender.lastName;
    }
    return (
      <Stack direction="row" justifyContent="center">
        <Qrcode value={getQRCodeValue()} bgColor="#F2F2F2F2" fgColor={COLORS.primary} size={80} />
      </Stack>
    );
  };

  return (
    <Box>
      <Typography gutterBottom>Votre réservation</Typography>
      <Divider />
      <Box my={2}>
        <Paper elevation={0}>
          <Box my={2}>
            <Grid container>
              <Grid
                item
                xs={12}
                sm={2}
                md={2}
                lg={2}
                xl={2}
                bgcolor="#F2F2F2F2"
                sx={{
                  borderTopLeftRadius: 10,
                  borderBottomLeftRadius: 10,
                  borderLeft: 1,
                  borderTop: 1,
                  borderBottom: 1,
                  borderColor: "#C5C5C5",
                }}
              >
                <Box py={1} textAlign="center" color="GrayText">
                  <Typography variant="body2">E - Ticket</Typography>
                  <Box my={2}>
                    <QrCodePass />
                  </Box>
                  <Typography variant="caption">Traçable </Typography>
                </Box>
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
                  borderTop: 1,
                  borderBottom: 1,
                  borderColor: "#C5C5C5",
                }}
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
                        Gratuite
                      </Typography>{" "}
                    </Box>
                  </Stack>
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                sm={3}
                md={3}
                lg={3}
                xl={3}
                bgcolor={COLORS.warning}
                sx={{
                  borderTopRightRadius: 10,
                  borderEndEndRadius: 10,
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
                  sx={{
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
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
                        <Typography>{state.prices.pricePerKG} €</Typography>
                      </Box>
                      <Box>
                        <Typography variant="caption">Payé :</Typography>
                        <Typography>Non </Typography>
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
                  mt={-0.8}
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
      </Box>
    </Box>
  );
};

export default BoardingPass;
