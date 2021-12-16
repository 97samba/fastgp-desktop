import { Divider, Grid, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { FaFacebook, FaInstagram, FaPlaneDeparture, FaTwitter, FaYoutube } from "react-icons/fa";
import COLORS from "../colors";

const Footer = () => {
  const socials = [
    { icon: <FaFacebook size={20} />, link: "http://www.facebook.fr" },
    { icon: <FaInstagram size={20} />, link: "http://www.instagram.fr" },
    { icon: <FaYoutube size={20} />, link: "http://www.youtube.fr" },
    { icon: <FaTwitter size={20} />, link: "http://www.twitter.fr" },
  ];
  return (
    <Box bgcolor={COLORS.primary}>
      <Box mx={{ xs: 5, sm: 5, md: 10, xl: 10, lg: 10 }} color="white">
        <Grid container pt={5}>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
            <Typography gutterBottom variant="h5">
              Fast GP
            </Typography>
            <Typography variant="body2">
              Fast GP est un site professionnel de livraison international qui recense toutes les
              annonces de covalisage du net.
            </Typography>
            <Stack direction="row" spacing={2} my={2}>
              {socials.map((social, index) => (
                <Box key={index}>{social.icon}</Box>
              ))}
            </Stack>
          </Grid>
          <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
            <Typography fontWeight={500}>Liens utiles</Typography>
            <Divider
              sx={{ my: 2, background: "orange", width: { xs: "100%", sm: "100%", md: "70%" } }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
            <Typography fontWeight={500}>Professionel</Typography>
            <Divider
              sx={{ my: 2, background: "orange", width: { xs: "100%", sm: "100%", md: "70%" } }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
            <Typography fontWeight={500}>Professionel</Typography>
            <Divider
              sx={{ my: 2, background: "orange", width: { xs: "100%", sm: "100%", md: "70%" } }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
            <Typography fontWeight={500}>Télecharger sur mobile</Typography>
          </Grid>
        </Grid>
        <Divider sx={{ my: 5, background: "white" }} />
        <Stack direction="row" pb={5} justifyContent="space-between">
          <Typography variant="caption">© 2021 Sangomar, Fast GP. Tous droits réservés</Typography>
          <Stack direction="row" pb={5} justifyContent="space-between" spacing={1}>
            <Typography variant="caption" fontWeight={600}>
              12 000
            </Typography>
            <Typography variant="caption">annonces publiées</Typography>
            <FaPlaneDeparture color={COLORS.warning} />
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default Footer;
