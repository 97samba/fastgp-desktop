import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import PresentationImage from "../../Images/HomeImage.svg";
import paris from "../../Images/paris.jpg";
import { GiAirplaneDeparture } from "react-icons/gi";
import { FaAward, FaCoins, FaSuitcase, FaUserAlt } from "react-icons/fa";
import SearchBar from "../SearchBar";
import { SearchPageContext } from "./Search";
import COLORS from "../../colors";

const SearchPaper = () => {
  return (
    <Paper
      sx={{
        p: 3,
        my: 2,
        border: 0.1,
        borderColor: "#E5E5E5",
        boxShadow: "1px 1px 3px 1px #494aa225",
        marginTop: -5,
        width: "90%",
        marginX: "auto",
      }}
      elevation={0}
    >
      <SearchBar gotoPage={true} />
    </Paper>
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
      <Box bgcolor="white">
        <Container>
          <Grid container display={{ xs: "none", sm: "none", md: "flex", lg: "flex", xl: "flex" }}>
            <Grid item md={5} lg={6} xl={6} p={5}>
              <Stack justifyContent="center" py={4} spacing={1} color>
                <Typography variant="h4" fontWeight="bold" color="primary">
                  Envoyer vos colis
                </Typography>
                <Typography gutterBottom variant="h4" fontWeight="bold" color={COLORS.warning}>
                  partout dans le monde !
                </Typography>
                <Typography variant="body1" fontWeight={400} color="GrayText">
                  Fast Gp est un grand réseau de covaliseurs inscrits et identifiés, plus des
                  annonces pris partout dans le web.
                </Typography>
                <Stack direction="row" spacing={1} mt={2}>
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
            <Grid item md={7} lg={6} xl={6} mb={5}>
              <img src={PresentationImage} alt="presentation" width="100%" />
            </Grid>
          </Grid>
          <Box mb={10} display={{ xs: "block", sm: "block", md: "none" }}>
            <Typography variant="h4" fontWeight={500}>
              Envoyer vos colis partout dans le
            </Typography>
          </Box>
        </Container>
        <Box bgcolor="#F5F5F5">
          <Container>
            <Grid container>
              <Grid item md={12} lg={12} xl={12} minHeight={300}>
                <SearchPaper />
                <PopularDestinations />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </SearchPageContext.Provider>
  );
};

export default Home;
