import React, { createContext, useContext, useEffect, useState } from "react";

import { Avatar, Container, Grid, Paper, Typography } from "@mui/material";
import { Stack } from "@mui/material";
import { Box } from "@mui/system";
import Flight from "../Flight";
import axios from "axios";

const Header = () => {
  return (
    <Box>
      <Grid container spacing={2} p={1}>
        <Grid item xs={9} sm={9} md={9}>
          <Paper elevation={0} style={{ background: "#494aa2" }}>
            <Stack py={1} px={3} direction="row">
              <Box flex={2}>
                <Typography color="white">Barcelona (BCN) - Rome (ROM)</Typography>
                <Typography color="white" fontSize={13}>
                  1 colis - kg
                </Typography>
              </Box>
              {/* <Stack direction="row">
                      <TextField size="small" variant="outlined" label="Départ" />
                      <TextField size="small" placeholder="Départ" label="Départ" />
                    </Stack> */}
            </Stack>
          </Paper>
        </Grid>
        <Grid item xs={3} sm={3} md={3}>
          <Paper elevation={0}>
            <Box p={2}>
              <Typography>Publicités</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

const Body = () => {
  const { flights } = useContext(HomeContext);

  const bests = [
    {
      label: "Le moins cher",
      date: "16 sept",
      price: 8,
    },
    {
      label: "Le meilleur",
      date: "18 sept",
      price: 12,
    },
    {
      label: "Le plus rapide",
      date: "demain",
      price: 15,
    },
    {
      label: "Le plus proche",
      date: "20 sept",
      price: 11,
    },
  ];
  const Left = () => {
    const BestPrice = ({ best }) => {
      return (
        <Grid item md={3}>
          <Paper elevation={0}>
            <Stack direction="row" spacing={0.5} py={2} px={4}>
              <Stack direction="row" spacing={0.5}>
                <Typography fontSize={10}> $</Typography>
                <Typography color="#494aa2" fontSize={26} fontWeight="bold">
                  {best.price}
                </Typography>
              </Stack>
              <Box>
                <Typography color="#494aa2" fontSize={13} fontWeight="bold">
                  {best.label}
                </Typography>
                <Typography fontSize={12}>{best.date}</Typography>
              </Box>
            </Stack>
          </Paper>
        </Grid>
      );
    };

    return (
      <Box>
        <Grid container spacing={2}>
          {bests.map((best) => (
            <BestPrice best={best} />
          ))}
        </Grid>
        <Grid container spacing={2} mt={2}>
          <Grid item md={3}>
            <Paper elevation={0} sx={{ p: 2 }}>
              <Typography>Résultats ({flights.length})</Typography>
            </Paper>
          </Grid>
          <Grid item md={9}>
            <Box>
              {flights.map((data, index) => (
                <Flight data={data} key={index} />
              ))}
            </Box>
          </Grid>
        </Grid>
      </Box>
    );
  };

  return (
    <Grid container spacing={2} p={1}>
      <Grid item xs={9} md={9} lg={9}>
        <Left />
      </Grid>
      <Grid item xs={3} md={3} lg={3}></Grid>
    </Grid>
  );
};
const HomeContext = createContext();
const Home = () => {
  const [flights, setflights] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5001/fir-c69a6/us-central1/api/GetAllFlights")
      .then((result) => setflights(result.data));
  }, []);
  return (
    <div style={{ background: "#F6F6F9", flex: 1 }}>
      <HomeContext.Provider value={{ flights }}>
        <Container style={{ background: "#F6F6F9", minWidth: "100%" }}>
          <Header />
          <Body />
        </Container>
      </HomeContext.Provider>
    </div>
  );
};

export default Home;
