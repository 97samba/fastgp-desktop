import { Button, Divider, Paper, Skeleton, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext } from "react";
import { FaCheckCircle, FaCommentDots, FaStar, FaStarHalfAlt, FaUser } from "react-icons/fa";
import COLORS from "../../colors";

import ProfilPic from "../../Images/profile.svg";
import { ViewContext } from "../Pages/View";

const ProfilDescriptorSkeleton = () => {
  return (
    <Box>
      <Stack spacing={2} alignItems="center" flex={1}>
        <Skeleton variant="circular" width={100} height={100} />
        <Skeleton width="90%" height={40} />
        <Skeleton width="90%" height={40} />
      </Stack>
    </Box>
  );
};
const ProfilDescriptor = ({ state }) => {
  const { visitProfil, loading } = useContext(ViewContext);
  return (
    <Paper sx={{ p: 3, boxShadow: "0px 1px 3px rgba(3, 0, 71, 0.2)" }} elevation={0}>
      {loading ? (
        <ProfilDescriptorSkeleton />
      ) : (
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
                m={2}
              >
                <img
                  width="100%"
                  alt={state.publisher?.photoURL ? state.publisher.photoURL : ProfilPic}
                  src={state.publisher?.photoURL ? state.publisher.photoURL : ProfilPic}
                  style={{ borderRadius: 5 }}
                />
                <Typography variant="body2">
                  {state.publisher.firstName + " " + state.publisher.lastName}
                </Typography>
              </Stack>
            </Box>
            <Box flex={{ xs: 3, sm: 1 }}>
              {/* <Divider sx={{ my: 1 }} /> */}
              <Stack spacing={2} my={2}>
                <Button variant="outlined" fullWidth color="primary" endIcon={<FaCommentDots />}>
                  Contacter
                </Button>
                <Button
                  variant="outlined"
                  fullWidth
                  color="warning"
                  endIcon={<FaUser />}
                  onClick={visitProfil}
                >
                  Voir profil
                </Button>
              </Stack>
              {/* <Divider sx={{ my: 2 }} /> */}
              <Box color={COLORS.black}>
                <Typography variant="body1">Informations confirmées</Typography>
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
      )}
    </Paper>
  );
};

export default ProfilDescriptor;
