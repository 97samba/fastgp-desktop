import { Paper, Stack, Typography, CircularProgress } from "@mui/material";
import React from "react";
import COLORS from "../../colors";

const LoadingSkeleton = () => {
  return (
    <Paper
      sx={{
        flex: 1,
        boxShadow: "0px 1px 3px rgba(3, 0, 71, 0.2)",
        borderRadius: 3,
        textAlign: "center",
      }}
      elevation={0}
    >
      <Stack
        p={5}
        flex={1}
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <CircularProgress size={30} />
        <Typography variant="body2" color={COLORS.black}>
          Chargement des informations
        </Typography>
      </Stack>
    </Paper>
  );
};

export default LoadingSkeleton;
