import { Stack, Typography, IconButton, Divider, Grid } from "@mui/material";
import React from "react";
import COLORS from "../../colors";

const InformationViewer = ({ icon, label, information, full = false }) => {
  return (
    <Grid
      item
      xs={12}
      sm={12}
      md={full ? 12 : 6}
      lg={full ? 12 : 6}
      xl={full ? 12 : 6}
    >
      <Stack direction="row" spacing={1}>
        <IconButton>{icon}</IconButton>

        <Typography
          gutterBottom
          color={COLORS.black}
          fontWeight={555}
          variant="body1"
          flexGrow={1}
        >
          {label}
        </Typography>
        <Typography variant="body1" color="GrayText">
          {information}
        </Typography>
      </Stack>
      <Divider sx={{ my: 0.5 }} />
    </Grid>
  );
};

export default InformationViewer;
