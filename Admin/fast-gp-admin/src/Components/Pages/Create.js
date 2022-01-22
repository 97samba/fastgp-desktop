import { Typography, Grid, Container, Paper, Stack } from "@mui/material";
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  FaCalendarAlt,
  FaCheckCircle,
  FaCoins,
  FaMoneyBill,
  FaMoneyBillWave,
  FaPlaneArrival,
  FaPlaneDeparture,
  FaRegCircle,
  FaSuitcase,
} from "react-icons/fa";
import { IoAddCircle } from "react-icons/io5";

import {
  verifyContacts,
  VerifyCountries,
  verifyDates,
  verifyNewPost,
  verifySuitcases,
} from "../../Middleware/CreationMiddleware";
import Departure from "../CreationComponents/Departure";
import Destination from "../CreationComponents/Destination";
import Dates from "../CreationComponents/Dates";
import Contacts from "../CreationComponents/Contacts";
import Valises from "../CreationComponents/Valises";
import Prices from "../CreationComponents/Prices";
import moment from "moment";
import LoadingButton from "@mui/lab/LoadingButton";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider";
import StartingDialog from "../CreationComponents/StartingDialog";
import { getUserFlights, userDetails } from "../../firebase/db";

export const CreationContext = createContext();

const SubmitButton = () => {
  const { handleNewPost, state } = useContext(CreationContext);
  return (
    <LoadingButton
      variant="contained"
      loading={state.creating}
      color="success"
      loadingPosition="end"
      endIcon={<IoAddCircle />}
      onClick={handleNewPost}
      disabled={state.created}
    >
      {!state.creating ? "Publier" : "Publication..."}
    </LoadingButton>
  );
};

const Create = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
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
    photoURL: "",
    // "https://firebasestorage.googleapis.com/v0/b/fir-c69a6.appspot.com/o/websiteImage%2Fscooter-delivery-logo.jpg?alt=media&token=37b01f32-6715-4c03-9381-c6378e5495fa",
  });
  const [contacts, setcontacts] = useState([]);
  const [facebookLink, setfacebookLink] = useState("http://www.facebook.fr");
  const [suitcases, setsuitcases] = useState([
    { type: "cabine", weight: 12, id: 0 },
    { type: "soute", weight: 23, id: 1 },
  ]);
  const [paymentMethod, setpaymentMethod] = useState([
    { label: "Espéces", type: "money", supported: true },
    { label: "Paypal", type: "paypal", supported: false },
    { label: "Carte", type: "card", supported: false },
    { type: "transfer", label: "Wave", supported: false },
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
    creating: false,
    created: false,
    createdItemId: "",
  });
  const [errors, seterrors] = useState({
    addError: false,
    addErrorlabel: "Erreur inconnue",
    departureError: false,
    destinationError: false,
    dateError: false,
    contactError: false,
    suitecaseError: false,
    priceError: false,
  });
  const [user, setuser] = useState({});
  const [announceOrigin, setannounceOrigin] = useState("Facebook");
  const [moreInfo, setmoreInfo] = useState("");

  const [finishDialogOpen, setfinishDialogOpen] = useState(false);

  function showFinishDialog(finished) {
    if (finished) {
      errors.addError && seterrors({ ...errors, addError: false });
      setstate({ ...state, created: true });
      setfinishDialogOpen(true);
    } else {
      setfinishDialogOpen(true);
    }
  }

  function hideDialog(redirect) {
    if (state.created) {
      return;
    }
    if (redirect) {
      navigate("/profilDetails" + currentUser.uid + "/myProfile");
    } else {
      setfinishDialogOpen(false);
    }
  }

  function handleAllErrors() {
    var countryError = VerifyCountries(departure, destination);
    var contactError = verifyContacts(publisher);
    var suitecaseError = verifySuitcases(suitcases);
    var dateError = verifyDates(departureDate, distributionDate, acceptJJ);

    seterrors({
      ...errors,
      addError:
        countryError === false ||
        contactError === false ||
        suitecaseError === false ||
        dateError === false,
      departureError: !countryError,
      destinationError: !countryError,
      contactError: !contactError,
      suitecaseError: !suitecaseError,
      dateError: false,
    });
    if (countryError && contactError && suitecaseError && dateError) {
      return true;
    }
    return false;
  }

  async function handleNewPost() {
    setstate({ ...state, creating: true });
    if (handleAllErrors()) {
      var result = await verifyNewPost(
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
        state,
        moreInfo,
        announceOrigin
      );
      if (result !== "") {
        showFinishDialog(true);
        setstate({ ...state, creating: false, created: true, createdItemId: result });
        console.log(`result`, result);
      }
      return;
    }
    setstate({ ...state, creating: false });
  }

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
    setannounceOrigin(model.announceOrigin);
    setpublisher(model.publisher);

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
                <FaMoneyBillWave color="#A5A5A5" />
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
          <SubmitButton />
          {/* <QrCodeAndSummary /> */}
        </Stack>
      </Paper>
    );
  };

  useEffect(() => {
    async function fetchDatas() {
      if (currentUser !== null) {
        console.log("fetching datas", currentUser?.uid);
        if (currentUser?.uid) {
          var flights = await getUserFlights(currentUser?.uid);
          var user = await userDetails(currentUser?.uid);
          console.log(`flights`, flights);
          setstate({ ...state, dialogLoading: false, flights: flights, user: user });
          setpublisher(publisher);
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
        user,
        setuser,
        uploadNewConfiguration,
        finishDialogOpen,
        showFinishDialog,
        errors,
        seterrors,
        hideDialog,
        announceOrigin,
        setannounceOrigin,
        moreInfo,
        setmoreInfo,
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

export default Create;
