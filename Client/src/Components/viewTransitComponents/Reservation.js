import { Divider, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const Reservation = () => {
    return (
        <Paper
            sx={{ p: 3, boxShadow: "0px 1px 3px rgba(3, 0, 71, 0.2)" }}
            elevation={0}
        >
            <Box>
                <Typography variant="h5" color="GrayText">
                    Reservation
                </Typography>

                <Divider sx={{ my: 2 }} />
                <Typography variant="body1" color="GrayText">
                    Comming soon ;)
                </Typography>
            </Box>
        </Paper>
    );
};

export default Reservation;
