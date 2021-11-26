import { Button, Divider, Grid, Paper, Stack, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { FaFacebook, FaPhone, FaUserCircle, FaWhatsapp } from "react-icons/fa";
import { ViewContext } from "../Pages/View";
import Advertiser from "./Advertiser";

const ContactInfo = ({ state, adViewed, setadViewed }) => {
  const [open, setopen] = useState(false);
  const { currentUser } = useContext(ViewContext);

  const hideInformations = () => {
    return {
      phoneNumber: state.publisher.phone.substring(0, 2) + "*******",
      facebookLink: "https://www.facebook.fr/*******",
      whatsapp: state.publisher.whatsapp.substring(0, 2) + "*******",
    };
  };

  const [datas, setdatas] = useState(hideInformations(state));

  const handleClose = async () => {
    setopen(false);
    // await new Promise((res) => setTimeout(res, 2000));
    setadViewed(!adViewed);
  };

  const openAdvertiser = () => {
    setopen(true);
  };

  useEffect(() => {
    adViewed || currentUser?.uid
      ? setdatas({
          phoneNumber: state.publisher.phone,
          facebookLink: state.facebookLink,
          whatsapp: state.publisher.whatsapp,
        })
      : setdatas(hideInformations());
  }, [adViewed]);

  return (
    <Paper sx={{ p: 3 }} variant="outlined">
      <Typography variant="h5" color="GrayText">
        Contact
      </Typography>

      <Divider sx={{ my: 2 }} />
      <Grid container my={1} rowSpacing={3} columnSpacing={6} width="100%">
        <Grid item md={6} lg={6} xl={6} width="100%">
          <Stack direction="row" spacing={2} alignItems="center">
            <FaPhone color="gray" />
            <Typography color="primary">Téléphone</Typography>
          </Stack>
          <Divider sx={{ my: 1 }} />
          <Typography variant="body1" color="GrayText">
            {datas.phoneNumber}
          </Typography>
        </Grid>
        <Grid item md={6} lg={6} xl={6}>
          <Stack direction="row" spacing={2} alignItems="center">
            <FaWhatsapp color="gray" />
            <Typography color="primary">Numéro Whatsapp</Typography>
          </Stack>
          <Divider sx={{ my: 1 }} />
          <Typography variant="body2" color="GrayText">
            {datas.whatsapp}
          </Typography>
        </Grid>
        <Grid item md={12} lg={12} xl={12}>
          <Stack direction="row" spacing={2} alignItems="center">
            <FaFacebook color="gray" />
            <Typography color="primary">Lien Facebook</Typography>
          </Stack>
          <Divider sx={{ my: 1 }} />
          <Typography variant="body2" color="GrayText">
            {datas.facebookLink}
          </Typography>
        </Grid>
        {!currentUser && (
          <Grid item md={5} lg={5} xl={5}>
            <Button
              variant="contained"
              size="small"
              color="warning"
              fullWidth
              onClick={openAdvertiser}
            >
              Voir les numéros
            </Button>
          </Grid>
        )}
        {!currentUser?.uid && (
          <Grid item md={2} lg={2} xl={2}>
            <Divider>ou</Divider>
          </Grid>
        )}
        {!currentUser && (
          <Grid item md={5} lg={5} xl={5}>
            <Button variant="contained" size="small" fullWidth endIcon={<FaUserCircle />}>
              Se connecter
            </Button>
          </Grid>
        )}
      </Grid>
      <Advertiser open={open} handleClose={handleClose} />
    </Paper>
  );
};

export default ContactInfo;
