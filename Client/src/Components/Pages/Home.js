import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import paris from "../../Images/paris.jpg";
import { GiAirplaneDeparture, GiTakeMyMoney } from "react-icons/gi";
import { FaAward, FaCoins, FaSuitcase, FaUserAlt } from "react-icons/fa";
import SearchBar from "../SearchBar";
import { SearchPageContext } from "./Search";
import COLORS from "../../colors";
import {
  MdFilterAlt,
  MdOutlineDeliveryDining,
  MdSearch,
  MdSecurity,
} from "react-icons/md";
import { getFeaturedFlight } from "../../firebase/db";
import Flight from "../Flight";
import FlightSkeleton from "../FlightSkeleton";
import Carousel from "react-elastic-carousel";
import sendFirstStep from "../../Images/Home/sendFirstStep.png";
import sendSecondStep from "../../Images/Home/sendSecondStep.png";
import sendThirdStep from "../../Images/Home/sendThirdStep.png";
import sendFourthStep from "../../Images/Home/sendFourthStep.png";
import { GoPackage } from "react-icons/go";

const PresentationImage =
  "https://firebasestorage.googleapis.com/v0/b/fir-c69a6.appspot.com/o/websiteImage%2FHomeImage.svg?alt=media&token=6ed815ca-143a-48bf-a3eb-69d1ed86f2ba";
const SearchPaper = () => {
  return (
    <Box mt={{ xs: -8, sm: -8, md: -6 }}>
      <Paper
        sx={{
          borderColor: "#E5E5E5",
          boxShadow: { sm: "none", md: "1px 1px 5px 2px #494aa225" },
          width: { xs: "100%", sm: "100%", md: "90%" },
          marginX: "auto",
          backgroundColor: {
            xs: "inherit",
            sm: "inherit",
            md: "white",
          },
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
            <CardMedia
              component="img"
              height="150"
              width="100"
              alt="paris"
              image={paris}
            />
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
            <CardMedia
              component="img"
              height="150"
              width="100"
              alt="paris"
              image={paris}
            />
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
            <CardMedia
              component="img"
              height="150"
              width="100"
              alt="paris"
              image={paris}
            />
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
            <CardMedia
              component="img"
              height="150"
              width="100"
              alt="paris"
              image={paris}
            />
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
const OurValues = () => {
  const values = [
    {
      label: "Zéro commission",
      description:
        "Afin de garantir des prix bas, Fast Gp ne vous prend aucune commission, si vous le souhaitez, vous encaissez la totalité de vos investissements.",
      icon: <GiTakeMyMoney size={60} color={COLORS.warning} />,
    },
    {
      label: "Un envoi gratuit",
      description:
        "Apres votre 5 éme envoi, vous gagnez un envoi gratuit d'une valeur d'un kilo vers votre destination préférée.",
      icon: <MdOutlineDeliveryDining size={60} color={COLORS.warning} />,
    },
    {
      label: "Sécurité Garantie",
      description:
        "Tous les Gp qui transportent vos colis sont identifiés (Passport, appel téléphonique...), les clients aussi sont identifiés pour protéger les GP.",
      icon: <MdSecurity size={60} color={COLORS.warning} />,
    },
  ];
  return (
    <Grid container px={2} py={7} spacing={2}>
      {values.map((value, index) => (
        <Grid
          item
          xs={12}
          sm={12}
          md={4}
          lg={4}
          xl={4}
          textAlign="center"
          key={index}
        >
          <IconButton size="large">{value.icon}</IconButton>
          <Typography fontWeight="bold" color="primary">
            {value.label}
          </Typography>
          <Typography variant="body1" color="GrayText">
            {value.description}
          </Typography>
        </Grid>
      ))}
    </Grid>
  );
};
const FeaturedFlight = () => {
  const [topFlights, settopFlights] = useState([]);
  const [loading, setloading] = useState(true);

  async function getTopFlights() {
    settopFlights(await getFeaturedFlight());
    setloading(false);
  }
  useEffect(() => {
    getTopFlights();
  }, []);
  return (
    <Box my={3}>
      <Typography fontWeight="bold" variant="h5" color={COLORS.black}>
        Dernieres publications
      </Typography>
      <Box my={2} mx={{ xs: 0, sm: 0, md: 10, lg: 10, xl: 10 }}>
        {loading ? (
          <FlightSkeleton />
        ) : (
          <>
            <Carousel
              showArrows={false}
              pagination={true}
              itemPadding={[2]}
              itemsToShow={1}
            >
              {topFlights.length > 0 &&
                topFlights.map((top, index) => (
                  <Flight data={top} key={index} />
                ))}
            </Carousel>
          </>
        )}
      </Box>
    </Box>
  );
};

const HowTo = ({ image, step, title, description, button, flip = 1 }) => {
  return (
    <Grid container p={2} spacing={2}>
      <Grid
        item
        xs={12}
        sm={12}
        md={6}
        lg={6}
        xl={6}
        display="flex"
        alignItems="center"
        justifyContent="center"
        py={2}
      >
        <img src={image} alt="presentation" width="90%" />
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={6}
        lg={6}
        xl={6}
        order={{ xs: -1, sm: -1, md: flip }}
      >
        <Stack spacing={2} my={4}>
          <Typography variant="body1" color={COLORS.warning}>
            {step}
          </Typography>
          <Typography variant="h4" fontWeight="bold" color="primary">
            {title}
          </Typography>
          <Typography variant="body2" color={COLORS.black}>
            {description}
          </Typography>
        </Stack>
        {button}
      </Grid>
    </Grid>
  );
};

const Home = () => {
  const [flights, setflights] = useState([]);
  return (
    <SearchPageContext.Provider value={{ flights, setflights }}>
      <Box bgcolor="white">
        <Container>
          <Grid container>
            <Grid item md={5} lg={6} xl={6} p={{ xs: 2, sm: 2, md: 5 }}>
              <Stack justifyContent="center" spacing={3} flex={1} height="100%">
                <Box>
                  <Typography variant="h4" fontWeight="bold" color="primary">
                    Envoyer vos colis
                  </Typography>
                  <Typography
                    variant="h4"
                    fontWeight="bold"
                    color={COLORS.warning}
                  >
                    partout dans le monde !
                  </Typography>
                </Box>
                <Box
                  display={{
                    xs: "none",
                    sm: "none",
                    md: "block",
                  }}
                >
                  <Typography variant="body1" fontWeight={400} color="GrayText">
                    Fast Gp est un grand réseau de covaliseurs inscrits et
                    identifiés, plus des annonces pris partout dans le web.
                  </Typography>
                  <Stack direction="row" spacing={1} mt={3}>
                    <Button
                      fullWidth
                      variant="contained"
                      endIcon={<FaSuitcase size={15} />}
                    >
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
                </Box>
              </Stack>
            </Grid>
            <Grid
              item
              mt={{ xs: -2, sm: -2, md: 0 }}
              overflow="hidden"
              md={7}
              lg={6}
              xl={6}
              mb={5}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <img src={PresentationImage} alt="presentation" width="90%" />
            </Grid>
          </Grid>
        </Container>
        <Box bgcolor="#F5F5F5" p={2}>
          <Container>
            <SearchPaper />
            <OurValues />
          </Container>
        </Box>
        {/* <Box bgcolor="white">
          <Container>
            <FeaturedFlight />
         
          </Container>
        </Box> */}
        <Box bgcolor="white">
          <Container>
            <HowTo
              image={sendFirstStep}
              step="- Première étape"
              title="Renseigner le départ et la destination"
              description="Vous pouvez effectuer votre recherche sur plusieurs villes du monde
              ou taper le nom du pays et les villes vous seront proposées."
              button={
                <Button
                  variant="contained"
                  href="/search"
                  endIcon={<MdSearch />}
                >
                  Commencer la recherche
                </Button>
              }
            />
          </Container>
        </Box>
        <Box bgcolor="#F5F5F5">
          <Container>
            <HowTo
              image={sendSecondStep}
              step="- Deuxième étape"
              title="Trier et filtrer les résultats"
              description="Vous pouvez filtrer vos résultats pour trouver la date et le prix
              qui vous arrange. Mais aussi, vous pouvez selectionner les
              Transporteurs certifiés ou en fonction de leur expérience."
              button={
                <Button
                  variant="contained"
                  href="/search"
                  endIcon={<MdFilterAlt />}
                >
                  Appliquer les filtres
                </Button>
              }
              flip={-1}
            />
          </Container>
        </Box>
        <Box bgcolor="white">
          <Container>
            <HowTo
              image={sendThirdStep}
              step="- Troisième étape"
              title="Réserver en ligne ou appeler le directement"
              description="Vous avez le choix entre créer un compte pour réserver et suivre
              votre colis ou bien appeler le transporteur directement."
              button={
                <Button
                  variant="contained"
                  href="/profilDetails"
                  endIcon={<GoPackage />}
                >
                  Voir mes colis
                </Button>
              }
            />
          </Container>
        </Box>
        <Box bgcolor="#F5F5F5">
          <Container>
            <HowTo
              image={sendFourthStep}
              step="- Dernière étape"
              title="Suivre le colis"
              description="Apres validation de la part du transporteur, vous avez une page
              dédiée pour suivre l'évolution du statut de votre colis."
              button={
                <Button
                  variant="contained"
                  href="/profilDetails"
                  endIcon={<MdOutlineDeliveryDining />}
                >
                  Suivre un colis
                </Button>
              }
              flip={-1}
            />
          </Container>
        </Box>
      </Box>
    </SearchPageContext.Provider>
  );
};

export default Home;
