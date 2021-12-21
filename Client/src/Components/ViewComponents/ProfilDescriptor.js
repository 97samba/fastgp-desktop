import { Button, Divider, Paper, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext } from "react";
import { FaCheckCircle, FaCommentDots, FaStar, FaStarHalfAlt, FaUser } from "react-icons/fa";

import ProfilPic from "../../Images/profile.svg";
import { ViewContext } from "../Pages/View";

const ProfilDescriptor = ({ state }) => {
  const { visitProfil } = useContext(ViewContext);
  return (
    <Paper sx={{ p: 3, boxShadow: "0px 1px 3px rgba(3, 0, 71, 0.2)" }} elevation={0}>
      <Box>
        <Typography>Covaliseur:</Typography>
        <Divider sx={{ my: 1 }} />
        <Stack direction={{ xs: "row", sm: "row", md: "column" }}>
          <Box flex={{ xs: 2, sm: 1 }}>
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={1}
              my={4}
            >
              <img
                width="50%"
                alt={state.publisher?.photoURL ? state.publisher.photoURL : ProfilPic}
                src={state.publisher?.photoURL ? state.publisher.photoURL : ProfilPic}
                style={{ borderRadius: 5 }}
              />
              <Typography variant="body2">
                {state.publisher.firstName + " " + state.publisher.lastName}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={0.5} justifyContent="center">
              <FaStar color="goldenrod" />
              <FaStar color="goldenrod" />
              <FaStar color="goldenrod" />
              <FaStar color="goldenrod" />
              <FaStarHalfAlt color="goldenrod" />
              <Typography variant="body2">(12)</Typography>
            </Stack>
          </Box>
          <Box flex={{ xs: 3, sm: 1 }}>
            {/* <Divider sx={{ my: 1 }} /> */}
            <Stack spacing={2} my={2}>
              <Button
                variant="contained"
                fullWidth
                color="warning"
                endIcon={<FaUser />}
                onClick={visitProfil}
              >
                Voir profil
              </Button>
              <Button variant="contained" fullWidth color="primary" endIcon={<FaCommentDots />}>
                Contacter
              </Button>
            </Stack>
            {/* <Divider sx={{ my: 2 }} /> */}
            <Box>
              <Typography>Informations confirmées</Typography>
              <Box my={1}>
                {["Email", "Passeport", "billet d'avion"].map((info, index) => (
                  <Stack direction="row" spacing={2} alignItems="center">
                    <FaCheckCircle size={12} color="green" />
                    <Typography>{info}</Typography>
                  </Stack>
                ))}
              </Box>
            </Box>{" "}
          </Box>
        </Stack>
      </Box>
    </Paper>
  );
};

export default ProfilDescriptor;
