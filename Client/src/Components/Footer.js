import { Divider, Grid, Stack, Typography, Link, Icon, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaPlaneDeparture,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import COLORS from "../colors";

const Footer = () => {
  const socials = [
    {
      icon: <FaFacebook size={20} />,
      link: "https://www.facebook.com/profile.php?id=100082678031026",
    },
    {
      icon: <FaInstagram size={20} />,
      link: "https://www.instagram.com/fast.gp.colis/?hl=fr",
    },
    { icon: <FaYoutube size={20} />, link: "http://www.youtube.fr" },
    { icon: <FaTwitter size={20} />, link: "https://twitter.com/samband35813072" },
  ];
  const utilLinks = [
    { label: "Contactez-nous", page: "/contactUs" },
    { label: "A propos", page: "/aboutUs" },
    { label: "Conditions", page: "/conditionsAndPolitics" },
    // { label: "Blog", page: "/blog" },
  ];

  const pages = [
    { label: "Acceuil", page: "/" },
    { label: "Envoyer", page: "/search" },
    { label: "Transporter", page: "/create" },
    { label: "Boutique", page: "/shop" },
  ];

  const professionals = [
    { label: "Devenir gp", page: "/register/becomeGp" },
    { label: "Devenir partenaire", page: "/moreInfos" },
    { label: "Reporter un problème", page: "/contactUs" },
  ];
  return (
    <Box bgcolor={COLORS.primary}>
      <Box mx={{ xs: 3, sm: 3, md: 10, xl: 10, lg: 10 }} color="white">
        <Grid container pt={5} rowSpacing={3} columnSpacing={2}>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
            <Typography gutterBottom variant="h5">
              Fast GP
            </Typography>
            <Typography variant="body2">
              Fast GP est un site professionnel de livraison à international qui recense
              toutes les annonces de covalisage du net.
            </Typography>
            <Stack direction="row" spacing={2} my={2}>
              {socials.map((social, index) => (
                <Box key={index}>
                  <IconButton color="inherit" target="_blank" href={social.link}>
                    {social.icon}
                  </IconButton>
                </Box>
              ))}
            </Stack>
          </Grid>
          <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
            <Typography fontWeight={500}>Liens utiles</Typography>
            <Divider
              sx={{
                my: 1,
                background: "orange",
                width: { xs: "100%", sm: "100%", md: "70%" },
              }}
            />
            <Stack direction="column" spacing={1}>
              {utilLinks.map((page, index) => (
                <Link
                  key={index}
                  href={page.page}
                  variant="body2"
                  underline="none"
                  color="white"
                >
                  {page.label}
                </Link>
              ))}
            </Stack>
          </Grid>
          <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
            <Typography fontWeight={500}>Professionel</Typography>
            <Divider
              sx={{
                my: 1,
                background: "orange",
                width: { xs: "100%", sm: "100%", md: "70%" },
              }}
            />
            <Stack direction="column" spacing={1}>
              {professionals.map((page, index) => (
                <Link
                  key={index}
                  href={page.page}
                  variant="body2"
                  underline="none"
                  color="white"
                >
                  {page.label}
                </Link>
              ))}
            </Stack>
          </Grid>
          <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
            <Typography fontWeight={500}>Site</Typography>
            <Divider
              sx={{
                my: 1,
                background: "orange",
                width: { xs: "100%", sm: "100%", md: "70%" },
              }}
            />
            <Stack direction="column" spacing={1}>
              {pages.map((page, index) => (
                <Link
                  key={index}
                  href={page.page}
                  variant="body2"
                  underline="none"
                  color="white"
                >
                  {page.label}
                </Link>
              ))}
            </Stack>
          </Grid>
          {/* <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
            <Typography fontWeight={500}>Télecharger sur mobile</Typography>
          </Grid> */}
        </Grid>
        <Divider sx={{ my: 5, background: "white" }} />
        <Stack direction="row" spacing={2} pb={5} justifyContent="space-between">
          <Typography flex={1} variant="caption">
            © 2021 Sangomar, Fast GP. Tous droits réservés
          </Typography>
          <Stack flex={1} direction="row" pb={5} spacing={1}>
            <Typography variant="caption" fontWeight={500}>
              12 000
            </Typography>
            <Typography variant="caption">annonces</Typography>
            <FaPlaneDeparture color={COLORS.warning} />
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default Footer;
