import { Box, Typography } from "@mui/material";
import React from "react";
import NotFoundImage from "../../Images/notfoundflight.svg";
const FlightNotFound = () => {
  return (
    <Box>
      <img src={NotFoundImage} alt={NotFoundImage} width={200} height={200} />
      <Typography variant="body1" mt={2}>
        L'annonce est introuvable ou a été supprimée.
      </Typography>
    </Box>
  );
};

export default FlightNotFound;
