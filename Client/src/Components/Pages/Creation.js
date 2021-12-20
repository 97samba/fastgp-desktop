import { Typography, Grid, Container, Paper, Stack, Button } from "@mui/material";
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  FaCalendarAlt,
  FaCheckCircle,
  FaCoins,
  FaEuroSign,
  FaMoneyBill,
  FaPlaneArrival,
  FaPlaneDeparture,
  FaRegCircle,
  FaSuitcase,
} from "react-icons/fa";
import { IoAddCircle } from "react-icons/io5";

import { verifyNewPost } from "../../Middleware/CreationMiddleware";
import { useAuth } from "../../firebase/auth";
import Departure from "../CreationComponents/Departure";
import Destination from "../CreationComponents/Destination";
import Dates from "../CreationComponents/Dates";
import Contacts from "../CreationComponents/Contacts";
import Valises from "../CreationComponents/Valises";
import Prices from "../CreationComponents/Prices";
import StartingDialog from "../CreationComponents/StartingDialog";
import { useHistory } from "react-router";
import { getUserFlights, userDetails } from "../../firebase/db";
import moment from "moment";
import Contribution from "../CreationComponents/Contribution";

export const CreationContext = createContext();

const PaymentButton = () => {
  const { handleNewPost } = useContext(CreationContext);
  return (
    <Button variant="contained" color="success" endIcon={<IoAddCircle />} onClick={handleNewPost}>
      Publier
    </Button>
  );
};

const Creation = () => {
  const currentUser = useAuth();
  const history = useHistory();
  const [departure, setdeparture] = useState({ name: "", country: "" });
  const [destination, setdestination] = useState({ name: "", country: "" });
  const [depotAddress, setdepotAddress] = useState({
    address: "110 rue samba",
    postalCode: "75000",
    city: "",
  });
  const [retraitAddress, setRetraitAddress] = useState({
    address: "53 Barbes Rochechoir",
    postalCode: "78900",
    city: "",
  });

  const [departureDate, setdepartureDate] = useState(new Date());
  const [distributionDate, setdistributionDate] = useState(new Date());
  const [lastDepot, setlastDepot] = useState(new Date());

  const [prices, setprices] = useState([
    {
      type: "pricePerKG",
      price: 10,
      label: "Prix par kilo",
      icon: <FaCoins style={{ flex: 1 }} color="A5A5A5" />,
    },
    {
      type: "pricePerSuitcase",
      price: 200,
      label: "Prix par valise",
      icon: <FaMoneyBill style={{ flex: 1 }} color="A5A5A5" />,
    },
  ]);

  const [publisher, setpublisher] = useState({
    id: "1",
    firstName: "",
    lastName: "",
    phone: "",
    whatsapp: "",
  });
  const [contacts, setcontacts] = useState([
    {
      firstName: "Samba",
      lastName: "Ndiaye",
      phone: "0612345632",
      whatsapp: "774708967",
      id: 0,
    },
    {
      firstName: "Abdou",
      lastName: "Diop",
      phone: "0612345632",
      whatsapp: "774708967",
      id: 1,
    },
  ]);
  const [facebookLink, setfacebookLink] = useState("http://www.facebook.fr");
  const [suitcases, setsuitcases] = useState([
    { type: "cabine", weight: 12, id: 0 },
    { type: "soute", weight: 23, id: 1 },
  ]);
  const [paymentMethod, setpaymentMethod] = useState([
    { label: "Espéces", type: "money", supported: true },
    { label: "Paypal", type: "paypal", supported: false },
    { label: "Carte", type: "card", supported: false },
    { type: "transfer", label: "Wave", supported: true },
  ]);
  const [canShip, setcanShip] = useState(true);
  const [acceptJJ, setacceptJJ] = useState("non");
  const [state, setstate] = useState({
    openDialog: true,
    roundTrip: false,
    dialogPage: "start",
    dialogLoading: true,
    flights: [],
    contribution: 5,
    contributionPaymentMethod: "money",
    currency: "€",
  });
  const [user, setuser] = useState({});

  const handleNewPost = () => {
    verifyNewPost(
      departure,
      destination,
      departureDate,
      distributionDate,
      lastDepot,
      acceptJJ,
      depotAddress,
      retraitAddress,
      currentUser.uid,
      currentUser.email,
      prices.map((price) => {
        return { type: price.type, price: price.price };
      }),
      publisher,
      state.contribution,
      state.contributionPaymentMethod,
      contacts,
      facebookLink,
      suitcases,
      paymentMethod,
      state
    );
  };
  function uploadNewConfiguration(id) {
    setstate({ ...state, dialogLoading: true });

    var model = state.flights[id];

    setdeparture(model.departure);
    setdestination(model.destination);
    setdepotAddress(model.depotAddress);
    setRetraitAddress(model.retraitAddress);
    setsuitcases(model.suitcases);
    setcontacts(model.contacts);
    setfacebookLink(model.facebookLink);

    setstate({ ...state, dialogLoading: false, openDialog: false });
  }

  const Summary = () => {
    const calculateWeight = () => {
      let weight = 0;
      suitcases.map((suitecase) => (weight += suitecase.weight));
      return weight;
    };
    return (
      <Paper
        sx={{
          p: 2,
          position: { xs: "inherit", sm: "inherit", md: "fixed" },
          width: { md: "20%" },
        }}
      >
        <Typography variant="subtitle1">Résumé</Typography>
        <Stack spacing={1}>
          <Paper elevation={0} sx={{ border: 1, borderColor: "#D5D5D5" }}>
            <Stack direction="row" p={1} alignItems="center" justifyContent="space-between">
              <Stack direction="row" alignItems="center">
                <FaPlaneDeparture color="#A5A5A5" />
                <Typography ml={2}>{departure?.name}</Typography>
              </Stack>
              {departure?.name ? <FaCheckCircle color="green" /> : <FaRegCircle color="gray" />}
            </Stack>
          </Paper>
          <Paper elevation={0} sx={{ border: 1, borderColor: "#D5D5D5" }}>
            <Stack direction="row" p={1} alignItems="center" justifyContent="space-between">
              <Stack direction="row" alignItems="center">
                <FaPlaneArrival color="#A5A5A5" />
                <Typography ml={2}>{destination?.name}</Typography>
              </Stack>
              {destination?.name ? <FaCheckCircle color="green" /> : <FaRegCircle color="gray" />}
            </Stack>
          </Paper>
          <Paper elevation={0} sx={{ border: 1, borderColor: "#D5D5D5" }}>
            <Stack direction="row" p={1} alignItems="center" justifyContent="space-between">
              <Stack direction="row" alignItems="center">
                <FaCalendarAlt color="#A5A5A5" />
                <Typography ml={2}>{moment(departureDate).format("DD/M/Y")}</Typography>
              </Stack>
              {destination?.name ? <FaCheckCircle color="green" /> : <FaRegCircle color="gray" />}
            </Stack>
          </Paper>
          <Paper elevation={0} sx={{ border: 1, borderColor: "#D5D5D5" }}>
            <Stack direction="row" p={1} alignItems="center" justifyContent="space-between">
              <Stack direction="row" alignItems="center">
                <FaEuroSign color="#A5A5A5" />
                <Typography ml={2}>
                  {prices.filter((price) => price.type === "pricePerKG")[0].price}
                </Typography>
              </Stack>
              {prices.filter((price) => price.type === "pricePerKG")[0].price > 0 ? (
                <FaCheckCircle color="green" />
              ) : (
                <FaRegCircle color="gray" />
              )}
            </Stack>
          </Paper>
          <Paper elevation={0} sx={{ border: 1, borderColor: "#D5D5D5" }}>
            <Stack direction="row" p={1} alignItems="center" justifyContent="space-between">
              <Stack direction="row" alignItems="center">
                <FaSuitcase color="#A5A5A5" />
                <Typography ml={2}>
                  {calculateWeight()}
                  {" kg"}
                </Typography>
              </Stack>
              {calculateWeight() > 0 ? (
                <FaCheckCircle color="green" />
              ) : (
                <FaRegCircle color="gray" />
              )}
            </Stack>
          </Paper>
          <PaymentButton />
        </Stack>
      </Paper>
    );
  };

  useEffect(() => {
    async function fetchDatas() {
      if (currentUser === null) {
        history.push("/login");
      } else {
        if (currentUser?.uid) {
          var flights = await getUserFlights(currentUser.uid);
          var user = await userDetails(currentUser.uid);
          setstate({ ...state, dialogLoading: false, flights: flights, user: user });
          var whatshappNumber = user.whatsapp2 === "oui" ? user.phone2 : user.phone;
          setpublisher({
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
            whatsapp: whatshappNumber,
          });
        }
      }
    }
    fetchDatas();
  }, [currentUser]);

  return (
    <CreationContext.Provider
      value={{
        departure,
        setdeparture,
        destination,
        setdestination,
        depotAddress,
        setdepotAddress,
        retraitAddress,
        setRetraitAddress,
        departureDate,
        setdepartureDate,
        distributionDate,
        setdistributionDate,
        lastDepot,
        setlastDepot,
        prices,
        setprices,
        publisher,
        setpublisher,
        contacts,
        setcontacts,
        facebookLink,
        setfacebookLink,
        suitcases,
        setsuitcases,
        paymentMethod,
        setpaymentMethod,
        canShip,
        setcanShip,
        acceptJJ,
        setacceptJJ,
        handleNewPost,
        currentUser,
        state,
        setstate,
        history,
        user,
        setuser,
        uploadNewConfiguration,
      }}
    >
      <Container sx={{ minWidth: "90%" }}>
        <Grid container p={{ xs: 0, sm: 0, md: 2 }} spacing={2}>
          <Grid item xs={12} sm={12} md={9} lg={9} xl={9}>
            <Paper sx={{ p: 3 }}>
              <Departure />
              <Destination />
              <Dates />
              <Contacts />
              <Valises />
              <Prices />
              <Contribution />
              <StartingDialog />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
            <Summary />
          </Grid>
        </Grid>
      </Container>
    </CreationContext.Provider>
  );
};

export default Creation;
