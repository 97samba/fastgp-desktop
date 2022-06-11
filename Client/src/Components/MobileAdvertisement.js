import { Paper, Stack } from "@mui/material";
import React from "react";
import AdImage from "../Images/online_ad.svg";

const MobileAdvertisement = () => {
  return (
    <Paper
      sx={{
        boxShadow: {
          xs: "0px 2px 3px rgba(4, 0, 71, 0.1)",
          sm: "1px 1px 4px 1px #E5E5E5",
          md: "none",
        },
        mb: 2,
        display: { xs: "flex", md: "none" },
      }}
      flex={1}
    >
      <Stack p={2} justifyContent="center" alignItems="center" flex={1}>
        <img src={AdImage} alt={AdImage} width="75%" />
      </Stack>
    </Paper>
  );
};

export default MobileAdvertisement;
