import { Container, Divider, Grid, Paper, Stack, Typography } from "@mui/material";
import React, { createContext, useEffect, useState } from "react";

import { useHistory } from "react-router";
import ProfilDescriptor from "../ViewComponents/ProfilDescriptor";
import Reservation from "../ViewComponents/Reservation";
import ContactInfo from "../ViewComponents/ContactInfo";
import FlightInformations from "../ViewComponents/FlightInformations";

const Summary = () => {
  return (
    <Paper sx={{ minHeight: "50%", p: 3 }}>
      <Typography>Publicités : </Typography>
      <Divider sx={{ my: 2 }} />
    </Paper>
  );
};

export const ViewContext = createContext();

const View = () => {
  const history = useHistory();
  const [state, setstate] = useState(history.location.state);
  const [sender, setsender] = useState({ firstName: "", lastName: "", phoneNumber: "" });
  const [receiver, setreceiver] = useState({ firstName: "", lastName: "", phoneNumber: "" });
  const [adViewed, setadViewed] = useState(false);

  useEffect(() => {
    console.log(`state`, state);
  }, []);
  return (
    <ViewContext.Provider
      value={{ state, sender, setsender, receiver, setreceiver, adViewed, setadViewed }}
    >
      <Container sx={{ minWidth: "90%" }}>
        <Grid container minHeight={300} spacing={2}>
          <Grid item xs={12} sm={3} md={3} lg={3} xl={3}>
            <ProfilDescriptor state={state} />
          </Grid>
          <Grid item xs={12} sm={9} md={6} lg={6} xl={6}>
            <Stack direction="column" spacing={2}>
              <Reservation />
              <FlightInformations state={state} />
              <ContactInfo state={state} adViewed={adViewed} setadViewed={setadViewed} />
            </Stack>
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
            <Summary />
          </Grid>
        </Grid>
      </Container>
    </ViewContext.Provider>
  );
};

export default View;
