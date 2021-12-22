import { Box, Button, Divider, Grid, IconButton, Paper, Stack, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { BsTelephone } from "react-icons/bs";
import { FaFacebook, FaUserCircle, FaWhatsapp } from "react-icons/fa";
import { AuthContext } from "../../Providers/AuthProvider";
import { ViewContext } from "../Pages/View";
import Advertiser from "./Advertiser";

const ContactInfo = ({ state, adViewed, setadViewed }) => {
  const [open, setopen] = useState(false);
  const { currentUser } = useContext(ViewContext);
  const { handelOpenSignInDialog } = useContext(AuthContext);

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

  useEffect(() => {
    currentUser?.uid
      ? setdatas({
          phoneNumber: state.publisher.phone,
          facebookLink: state.facebookLink,
          whatsapp: state.publisher.whatsapp,
        })
      : setdatas(hideInformations());
  }, [currentUser]);

  return (
    <Paper sx={{ p: 3, boxShadow: "0px 1px 3px rgba(3, 0, 71, 0.2)" }} elevation={0}>
      <Typography variant="h5" color="GrayText">
        Contact
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Grid container my={1} rowSpacing={2} columnSpacing={2} width="100%">
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <Stack direction="row" spacing={2} alignItems="center">
            <IconButton>
              <BsTelephone color="gray" />
            </IconButton>
            <Box flex={1}>
              <Typography gutterBottom color="primary" fontWeight="bold">
                Téléphone
              </Typography>
              <Divider sx={{ mb: 1 }} />
              <Typography variant="body2" color="GrayText">
                {datas.phoneNumber}
              </Typography>
            </Box>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <Stack direction="row" spacing={2} alignItems="center">
            <IconButton>
              <FaWhatsapp color="gray" />
            </IconButton>
            <Box flex={1}>
              <Typography gutterBottom color="primary" fontWeight="bold">
                Whatsapp
              </Typography>
              <Divider sx={{ mb: 1 }} />
              <Typography variant="body2" color="GrayText">
                {datas.whatsapp}
              </Typography>
            </Box>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Stack direction="row" spacing={2} alignItems="center">
            <IconButton>
              <FaFacebook color="gray" />
            </IconButton>
            <Box flex={1}>
              <Typography gutterBottom color="primary" fontWeight="bold">
                Lien Facebook
              </Typography>
              <Divider sx={{ mb: 1 }} />
              <Typography variant="body2" color="GrayText">
                {datas.facebookLink}
              </Typography>
            </Box>
          </Stack>
        </Grid>
        {!currentUser && (
          <Grid item xs={12} sm={12} md={5} lg={5} xl={5} mt={{ xs: 2, sm: 2, md: 0 }}>
            <Button
              variant="contained"
              size="medium"
              color="warning"
              fullWidth
              onClick={openAdvertiser}
            >
              Voir les numéros
            </Button>
          </Grid>
        )}
        {!currentUser?.uid && (
          <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
            <Divider>ou</Divider>
          </Grid>
        )}
        {!currentUser && (
          <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
            <Button
              variant="contained"
              size="medium"
              fullWidth
              endIcon={<FaUserCircle />}
              onClick={handelOpenSignInDialog}
            >
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
