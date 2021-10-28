import React, { createContext, useContext, useEffect, useState } from "react";

import {
  Autocomplete,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  Paper,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/material";
import { Box } from "@mui/system";
import Flight from "../Flight";
import axios from "axios";
import { FaExchangeAlt, FaPlaneArrival, FaPlaneDeparture } from "react-icons/fa";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import FlightSkeleton from "../FlightSkeleton";
const Header = () => {
  return (
    // <Box style={{ background: "#494aa2" }}>
    <Box sx={{ background: "white", borderBottom: 1, borderColor: "#D2D2D2" }}>
      <Container style={{ minWidth: "90%" }}>
        <Grid container spacing={1}>
          <Grid item md={6} lg={6}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Box flex={10} p={1} bgcolor="white">
                <Autocomplete
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      InputProps={{
                        startAdornment: <FaPlaneDeparture size={15} color="#C2C2C2" />,
                      }}
                      size="small"
                      value="Paris"
                      variant="outlined"
                      // placeholder="Départ"
                      label="Départ"
                    />
                  )}
                />
              </Box>
              <Box flex={1}>
                <Button variant="text" sx={{ py: 1.5, border: 1, borderColor: "#C5C5C5" }}>
                  <FaExchangeAlt size={15} color="gray" />
                </Button>
              </Box>
              <Box flex={10} p={1} bgcolor="white">
                <Autocomplete
                  popupIcon={<FaPlaneArrival size={15} color="#C2C2C2" />}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      size="small"
                      variant="outlined"
                      label="Destination"
                      // placeholder="Destination"
                      InputProps={{ startAdornment: <FaPlaneArrival size={16} color="#C2C2C2" /> }}
                      value="Dakar"
                    />
                  )}
                />
              </Box>
            </Stack>
          </Grid>
          <Grid item md={6} lg={6}>
            <Stack direction="row" spacing={1}>
              <Box flex={1} p={1} bgcolor="white">
                <DesktopDatePicker
                  type="date"
                  label="Date de départ"
                  renderInput={(params) => <TextField {...params} size="small" />}
                />
              </Box>
              <Box flex={1} p={1} bgcolor="white">
                <Button variant="contained">Rechercher</Button>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

const Body = () => {
  const { flights, loading } = useContext(HomeContext);

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
    return (
      <Paper
        elevation={0}
        sx={{ px: 2, py: 2, minHeight: "30%", border: 1, borderColor: "#E2E2E2" }}
      >
        <Stack divider={<Divider orientaion="horizontal" />} spacing={1}>
          <Typography>Résultats ({flights.length})</Typography>
          <Box py={1}>
            <Typography fontWeight="bold" fontSize={13}>
              Moyens de transport
            </Typography>
            <FormGroup sx={{ pt: 1 }}>
              <FormControlLabel
                sx={{ height: 25 }}
                control={<Checkbox defaultChecked size="small" />}
                label={<Typography fontSize={13}>Avion</Typography>}
              />
              <FormControlLabel
                sx={{ height: 25 }}
                control={<Checkbox size="small" />}
                label={<Typography fontSize={13}>Bateau</Typography>}
              />
            </FormGroup>
          </Box>
          <Box py={1}>
            <Typography fontWeight="bold" fontSize={13}>
              Prix
            </Typography>
            <Box pt={1}>
              <Stack direction="row" justifyContent="space-between">
                <Typography fontSize={11}>8 € </Typography>
                <Typography fontSize={11}>15 € </Typography>
              </Stack>
              <Box px={1}>
                <Slider min={0} max={15} />
              </Box>
            </Box>
          </Box>
          <Box py={1}>
            <Typography fontWeight="bold" fontSize={13}>
              Paiements acceptés
            </Typography>
            <FormGroup sx={{ pt: 1 }}>
              <FormControlLabel
                sx={{ height: 25 }}
                control={<Checkbox disableRipple defaultChecked size="small" />}
                label={<Typography fontSize={13}>Espéces</Typography>}
              />
              <FormControlLabel
                sx={{ height: 25 }}
                control={<Checkbox defaultChecked size="small" />}
                label={<Typography fontSize={13}>Carte</Typography>}
              />
              <FormControlLabel
                sx={{ height: 25 }}
                control={<Checkbox defaultChecked size="small" />}
                label={<Typography fontSize={13}>Paypal</Typography>}
              />
              <FormControlLabel
                sx={{ height: 25 }}
                control={<Checkbox defaultChecked size="small" />}
                label={<Typography fontSize={13}>transfert (Wave...)</Typography>}
              />
            </FormGroup>
          </Box>
          <Box py={1}>
            <Typography fontWeight="bold" fontSize={13}>
              Livraison
            </Typography>
            <FormGroup sx={{ pt: 1 }}>
              <FormControlLabel
                sx={{ height: 25 }}
                control={<Checkbox disableRipple defaultChecked size="small" />}
                label={<Typography fontSize={13}>Gratuite</Typography>}
              />
              <FormControlLabel
                sx={{ height: 25 }}
                control={<Checkbox defaultChecked size="small" />}
                label={<Typography fontSize={13}>Payante</Typography>}
              />
            </FormGroup>
          </Box>
        </Stack>
      </Paper>
    );
  };

  const Middle = () => {
    const BestPrice = ({ best }) => {
      return (
        <Grid item md={3}>
          <Paper elevation={0} sx={{ border: 1, borderColor: "#E2E2E2" }}>
            <Stack direction="row" spacing={0.5} py={1} px={1}>
              <Stack direction="row" spacing={0.5}>
                <Typography fontSize={10}> $</Typography>
                <Typography color="#494aa2" fontSize={20} fontWeight="bold">
                  {best.price}
                </Typography>
              </Stack>
              <Box>
                <Typography color="#494aa2" fontSize={11} fontWeight="bold">
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
        {loading ? (
          <Box pt={2}>
            {[1, 2, 3, 4, 5].map((data, index) => (
              <FlightSkeleton data={data} index={index} />
            ))}
          </Box>
        ) : (
          <Box pt={2}>
            {flights.map((data, index) => (
              <Flight data={data} key={index} />
            ))}
          </Box>
        )}
      </Box>
    );
  };

  const Right = () => {
    return (
      <Paper elevation={0} sx={{ p: 2, minHeight: "20%", border: 1, borderColor: "#E2E2E2" }}>
        <Typography>Publicités</Typography>
      </Paper>
    );
  };

  return (
    <Grid container spacing={2} p={1}>
      <Grid item xs={2} md={2} lg={2}>
        <Left />
      </Grid>
      <Grid item xs={7} md={7} lg={7}>
        <Middle />
      </Grid>
      <Grid item xs={3} md={3} lg={3}>
        <Right />
      </Grid>
    </Grid>
  );
};
const HomeContext = createContext();
const Home = () => {
  const [flights, setflights] = useState([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:5001/fir-c69a6/us-central1/api/GetAllFlights").then((result) => {
      setflights(result.data);
      setloading(false);
    });
  }, []);
  return (
    <div style={{ background: "#F6F6F9" }}>
      <HomeContext.Provider value={{ flights, loading }}>
        <Header />
        <Container style={{ minWidth: "90%" }}>
          <Body />
        </Container>
      </HomeContext.Provider>
    </div>
  );
};

export default Home;
