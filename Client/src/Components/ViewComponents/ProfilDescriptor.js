import { Button, Divider, Paper, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { FaCheckCircle, FaCommentDots, FaStar, FaStarHalfAlt, FaUser } from "react-icons/fa";

import ProfilPic from "../../Images/profile.svg";

const ProfilDescriptor = ({ state }) => {
  return (
    <Paper sx={{ p: 3 }}>
      <Box>
        <Typography>Covaliseur:</Typography>
        <Divider sx={{ my: 1 }} />
        <Stack direction="column" justifyContent="center" alignItems="center" spacing={1} my={4}>
          <img width="50%" src={ProfilPic} />
          <Typography variant="body2">
            {state.publisher.firstName + " " + state.publisher.lastName}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1} justifyContent="center">
          <FaStar color="goldenrod" />
          <FaStar color="goldenrod" />
          <FaStar color="goldenrod" />
          <FaStar color="goldenrod" />
          <FaStarHalfAlt color="goldenrod" />
          <Typography variant="body2">( 12 )</Typography>
        </Stack>
        <Divider sx={{ my: 1 }} />
        <Stack spacing={2} my={2}>
          <Button variant="contained" fullWidth color="warning" endIcon={<FaUser />}>
            Voir profil
          </Button>
          <Button variant="contained" fullWidth color="primary" endIcon={<FaCommentDots />}>
            Contacter
          </Button>
        </Stack>
        <Divider sx={{ my: 2 }} />
        <Typography>Informations confirmées</Typography>
        <Box my={1}>
          {["Email", "Passeport", "billet d'avion"].map((info, index) => (
            <Stack direction="row" spacing={2} alignItems="center">
              <FaCheckCircle size={12} color="green" />
              <Typography>{info}</Typography>
            </Stack>
          ))}
        </Box>
      </Box>
    </Paper>
  );
};

export default ProfilDescriptor;