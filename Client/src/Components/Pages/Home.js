import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Divider,
  Grid,
  InputBase,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import PresentationImage from "../../Images/undraw_airport_re_oqk1.svg";
import paris from "../../Images/paris.jpg";
import { GiAirplaneArrival, GiAirplaneDeparture } from "react-icons/gi";
import { AiOutlineSwap } from "react-icons/ai";
import { FaAward, FaCoins, FaSuitcase, FaUserAlt } from "react-icons/fa";
import SearchBar from "../SearchBar";
import { SearchPageContext } from "./Search";

const SearchPaper = () => {
  return (
    <Box>
      <Paper
        sx={{
          p: 3,
          my: 2,
          border: 0.1,
          borderColor: "#E5E5E5",
          boxShadow: "1px 1px 3px 1px #494aa225",
          marginTop: -5,
          width: "80%",
          marginX: "auto",
        }}
        elevation={0}
      >
        <SearchBar gotoPage={true} />
      </Paper>
    </Box>
  );
};
const PopularDestinations = () => {
  return (
    <Box p={5}>
      <Typography variant="h5" fontWeight={600} color="GrayText" my={3}>
        Destinations populaires
      </Typography>
      <Grid container spacing={4}>
        <Grid item md={3} xl={3} lg={3}>
          <Card>
            <CardMedia component="img" height="150" width="100" alt="paris" image={paris} />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Paris
              </Typography>
              <Stack direction="row" justifyContent="space-between" my={1}>
                <Box>
                  <Stack direction="row" spacing={1}>
                    <FaAward color="gray" />
                    <Typography variant="body1">1</Typography>
                  </Stack>
                  <Typography variant="caption">Rang</Typography>
                </Box>
                <Box>
                  <Stack direction="row" spacing={1}>
                    <GiAirplaneDeparture color="gray" />
                    <Typography>324</Typography>
                  </Stack>
                  <Typography variant="caption">Vols</Typography>
                </Box>
                <Box>
                  <Stack direction="row" spacing={1}>
                    <FaCoins color="gray" />
                    <Typography>324</Typography>
                  </Stack>
                  <Typography variant="caption">Prix Moyen</Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={3} xl={3} lg={3}>
          <Card>
            <CardMedia component="img" height="150" width="100" alt="paris" image={paris} />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Dakar
              </Typography>
              <Stack direction="row" justifyContent="space-between" my={1}>
                <Box>
                  <Stack direction="row" spacing={1}>
                    <FaAward color="gray" />
                    <Typography variant="body1">2</Typography>
                  </Stack>
                  <Typography variant="caption">Rang</Typography>
                </Box>
                <Box>
                  <Stack direction="row" spacing={1}>
                    <GiAirplaneDeparture color="gray" />
                    <Typography>324</Typography>
                  </Stack>
                  <Typography variant="caption">Vols</Typography>
                </Box>
                <Box>
                  <Stack direction="row" spacing={1}>
                    <FaCoins color="gray" />
                    <Typography>324</Typography>
                  </Stack>
                  <Typography variant="caption">Prix Moyen</Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={3} xl={3} lg={3}>
          <Card>
            <CardMedia component="img" height="150" width="100" alt="paris" image={paris} />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Casablanca
              </Typography>
              <Stack direction="row" justifyContent="space-between" my={1}>
                <Box>
                  <Stack direction="row" spacing={1}>
                    <FaAward color="gray" />
                    <Typography variant="body1">3</Typography>
                  </Stack>
                  <Typography variant="caption">Rang</Typography>
                </Box>
                <Box>
                  <Stack direction="row" spacing={1}>
                    <GiAirplaneDeparture color="gray" />
                    <Typography>324</Typography>
                  </Stack>
                  <Typography variant="caption">Vols</Typography>
                </Box>
                <Box>
                  <Stack direction="row" spacing={1}>
                    <FaCoins color="gray" />
                    <Typography>324</Typography>
                  </Stack>
                  <Typography variant="caption">Prix Moyen</Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={3} xl={3} lg={3}>
          <Card>
            <CardMedia component="img" height="150" width="100" alt="paris" image={paris} />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Paris
              </Typography>
              <Stack direction="row" justifyContent="space-between" my={1}>
                <Box>
                  <Stack direction="row" spacing={1}>
                    <FaAward color="gray" />
                    <Typography variant="body1">1</Typography>
                  </Stack>
                  <Typography variant="caption">Rang</Typography>
                </Box>
                <Box>
                  <Stack direction="row" spacing={1}>
                    <GiAirplaneDeparture color="gray" />
                    <Typography>324</Typography>
                  </Stack>
                  <Typography variant="caption">Vols</Typography>
                </Box>
                <Box>
                  <Stack direction="row" spacing={1}>
                    <FaCoins color="gray" />
                    <Typography>324</Typography>
                  </Stack>
                  <Typography variant="caption">Prix Moyen</Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

const Home = () => {
  const [flights, setflights] = useState([]);
  return (
    <SearchPageContext.Provider value={{ flights, setflights }}>
      <Container>
        <Box>
          <Grid container>
            <Grid item md={6} lg={6} xl={6} p={5}>
              <Stack justifyContent="center" py={4} spacing={2}>
                <Typography variant="h4" fontWeight={500}>
                  Envoyer vos colis
                </Typography>
                <Typography gutterBottom variant="h4" fontWeight={500}>
                  partout dans le monde !
                </Typography>
                <Typography variant="body1" fontWeight={400} color="GrayText">
                  Fast Gp est un grand réseau de covaliseurs inscrits et identifiés, plus des
                  annonces pris partout dans le web.
                </Typography>
                <Stack direction="row" spacing={4}>
                  <Button fullWidth variant="contained" endIcon={<FaSuitcase size={15} />}>
                    Compte GP
                  </Button>
                  <Button
                    fullWidth
                    variant="contained"
                    color="warning"
                    endIcon={<FaUserAlt size={15} />}
                  >
                    Compte Client
                  </Button>
                </Stack>
              </Stack>
            </Grid>
            <Grid item md={6} lg={6} xl={6} mb={5}>
              <img src={PresentationImage} alt="presentation" width="60%" />
            </Grid>
            <Grid item md={12} lg={12} xl={12} bgcolor="#F5F5F5" minHeight={300} mt={5}>
              <SearchPaper />
              <PopularDestinations />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </SearchPageContext.Provider>
  );
};

export default Home;
