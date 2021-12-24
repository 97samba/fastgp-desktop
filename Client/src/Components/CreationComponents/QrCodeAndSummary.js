import { Button, Dialog, DialogTitle, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import QRCode from "react-qr-code";
import COLORS from "../../colors";
import AnnounceImage from "../../Images/Announce-3.svg";

const QrCodeAndSummary = ({ id }) => {
  const [state, setstate] = useState({ open: false });
  const QrCodePass = ({ label }) => {
    const url = "https://fir-c69a6.firebaseapp.com/view/";
    function getQRCodeValue() {
      return url + id;
    }
    return (
      <Stack direction="column" alignItems="center" spacing={2}>
        <QRCode value={getQRCodeValue()} bgColor="#F2F2F2F2" fgColor={COLORS.primary} size={80} />
        <Typography variant="caption">{label}</Typography>
      </Stack>
    );
  };
  const Summarydialog = () => {
    return (
      <Dialog open={state.open} onClose={() => setstate({ ...state, open: false })} fullWidth>
        <DialogTitle>Vous y êtes presque!</DialogTitle>
        <Box mx={1} mb={2} display="flex" justifyContent="center">
          <Box
            width="250 px"
            height="500 px"
            justifyContent="center"
            sx={{
              backgroundImage: `url(${AnnounceImage})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "200px",
            }}
          >
            {/* <img src={AnnounceImage} alt={AnnounceImage} width="90%" height="100%" /> */}
            <Stack spacing={2} direction="row" flexGrow={1}>
              <Typography variant="h4">Dakar</Typography>
              <Typography variant="h4">France</Typography>
            </Stack>
            <Stack spacing={2} direction="row" mt={10}>
              <Typography variant="h4">Dakar</Typography>
              <Typography variant="h4">France</Typography>
            </Stack>
            <Stack spacing={2} direction="row" mt={10}>
              <Typography variant="h4">Dakar</Typography>
              <Typography variant="h4">France</Typography>
            </Stack>
          </Box>
        </Box>
        <Box>
          <QrCodePass label="Ce QRcode redirige vers votre annonce." />
        </Box>
      </Dialog>
    );
  };

  return (
    <Stack pt={4}>
      <Button onClick={() => setstate({ ...state, open: true })}>
        <QrCodePass label="Cliquer pour voir l'annonce" />
      </Button>
      <Summarydialog />
    </Stack>
  );
};

export default QrCodeAndSummary;
