import React from "react";
import AdImage from "../../Images/online_ad.svg";

import { Divider, Paper, Typography } from "@mui/material";

const PubBar = () => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        border: 1,
        borderColor: "#E2E2E2",
      }}
    >
      <Typography gutterBottom>Publicités</Typography>
      <img src={AdImage} alt={AdImage} width="100%" />
      <Divider sx={{ my: 3 }} />
      <img src={AdImage} alt={AdImage} width="100%" />
    </Paper>
  );
};

export default PubBar;
