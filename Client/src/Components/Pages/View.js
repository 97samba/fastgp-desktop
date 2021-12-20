import { Container, Divider, Grid, Paper, Stack, Typography } from "@mui/material";
import React, { createContext, useEffect, useState } from "react";

import { useHistory, useParams } from "react-router";
import ProfilDescriptor from "../ViewComponents/ProfilDescriptor";
import Reservation from "../ViewComponents/Reservation";
import ContactInfo from "../ViewComponents/ContactInfo";
import FlightInformations from "../ViewComponents/FlightInformations";
import { getAFlight } from "../../firebase/db";
import { useAuth } from "../../firebase/auth";
import COLORS from "../../colors";

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
  const { id } = useParams();
  const currentUser = useAuth();
  const [flightState, setflightState] = useState(history.location.state);
  const [sender, setsender] = useState({ firstName: "", lastName: "", phoneNumber: "" });
  const [receiver, setreceiver] = useState({ firstName: "", lastName: "", phoneNumber: "" });
  const [adViewed, setadViewed] = useState(false);
  const [loading, setLoading] = useState(true);

  const visitProfil = () => {
    if (flightState.ownerId) {
      history.push(`/GPprofile/${flightState.ownerId}`);
    }
  };

  useEffect(() => {
    async function fetchDatas() {
      if (!id) history.push("/");
      if (id && history.location.state === undefined) {
        var flight = await getAFlight(id);
        setflightState(flight);
        setLoading(false);
      } else {
        setLoading(false);
      }
    }
    fetchDatas();
  }, []);
  useEffect(() => {
    currentUser?.email &&
      setsender({
        ...sender,
        firstName: currentUser.displayName.split(" ")[0],
        lastName: currentUser.displayName.split(" ")[1],
      });
  }, [currentUser]);

  return (
    <ViewContext.Provider
      value={{
        sender,
        setsender,
        receiver,
        setreceiver,
        adViewed,
        setadViewed,
        visitProfil,
        currentUser,
        flightState,
        history,
      }}
    >
      <Container sx={{ minWidth: "90%", mt: 5, backgroundColor: COLORS.background }}>
        {loading ? (
          <Typography>loading</Typography>
        ) : (
          <Grid container minHeight={300} spacing={2}>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} order={{ xs: 1, sm: 1, md: 0 }}>
              <ProfilDescriptor state={flightState} />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <Typography
                color="GrayText"
                gutterBottom
                variant="captions"
                display={{ sx: "block", sm: "block", md: "none" }}
              >
                Vos deux premières livraisons sont gratuites*
              </Typography>{" "}
              <Stack direction="column" spacing={2}>
                <FlightInformations state={flightState} />
                <Reservation />
                <ContactInfo state={flightState} adViewed={adViewed} setadViewed={setadViewed} />
              </Stack>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={3}
              lg={3}
              xl={3}
              display={{ xs: "none", sm: "none", md: "block" }}
            >
              <Summary />
            </Grid>
          </Grid>
        )}
      </Container>
    </ViewContext.Provider>
  );
};

export default View;
