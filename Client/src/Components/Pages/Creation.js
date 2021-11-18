import {
  Box,
  Typography,
  Grid,
  Container,
  TextField,
  Paper,
  Stack,
  FormControl,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Radio,
  Button,
  FormGroup,
  Checkbox,
  Autocomplete,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Select,
} from "@mui/material";
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  FaCheckCircle,
  FaCoins,
  FaFacebook,
  FaMoneyBill,
  FaPhone,
  FaPlaneArrival,
  FaPlaneDeparture,
  FaRegCircle,
  FaSuitcase,
  FaSuitcaseRolling,
  FaTrashAlt,
  FaUserCircle,
  FaWhatsapp,
} from "react-icons/fa";
import { IoAddCircle, IoLocationSharp, IoPersonAddSharp } from "react-icons/io5";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import TimePicker from "@mui/lab/TimePicker";

import data from "../../data/test.json";
import { verifyNewPost } from "../../Middleware/CreationMiddleware";

export const CreationContext = createContext();

const Departure = () => {
  const { depotAddress, setdepotAddress, departure, setdeparture } = useContext(CreationContext);
  const [destinations, setdestinations] = useState([]);
  useEffect(() => {
    let newState = [];
    data.map((doc) => {
      doc.states.map((state) => newState.push({ ...state, country: doc.translations.fr }));
    });
    setdestinations(newState);
  }, []);
  const handleSave = (value) => {
    setdeparture(value);
    setdepotAddress({ ...depotAddress, city: value.name });
  };
  const getLabel = (option) => {
    if (option.name != "") {
      return `${option.name}, ${option.country}`;
    }
    return "";
  };
  return (
    <Stack
      direction={{ xs: "column", sm: "row", md: "row" }}
      flex={1}
      sx={{ borderBottom: 1, pb: 2, borderColor: "lightgray" }}
    >
      <Box flex={2}>
        <Typography gutterBottom>1. Départ</Typography>
      </Box>
      <Grid container flex={3} spacing={2}>
        <Grid item md={12} lg={12} xs={12}>
          <Autocomplete
            value={departure}
            options={destinations}
            noOptionsText="Destination introuvable"
            getOptionLabel={getLabel}
            groupBy={(option) => option.country}
            renderOption={(props, option) => <Typography {...props}>{option.name}</Typography>}
            renderInput={(params) => (
              <TextField {...params} size="small" variant="outlined" label="Départ" fullWidth />
            )}
            onChange={(e, value) => handleSave(value)}
          />
        </Grid>
        <Grid item md={12} lg={12} xs={12}>
          <TextField
            value={depotAddress.address}
            label="Adresse"
            fullWidth
            size="small"
            InputProps={{ endAdornment: <IoLocationSharp size={20} color="#B1B1B1" /> }}
            onChange={(e) => setdepotAddress({ ...depotAddress, address: e.target.value })}
          />
        </Grid>
        <Grid item md={6} lg={6} xs={12}>
          <TextField
            label="Ville"
            fullWidth
            size="small"
            value={depotAddress.city}
            onChange={(e) => setdepotAddress({ ...depotAddress, city: e.target.value })}
          />
        </Grid>
        <Grid item md={6} lg={6} xs={12}>
          <TextField
            label="Code Postal"
            value={depotAddress.postalCode}
            fullWidth
            size="small"
            onChange={(e) => setdepotAddress({ ...depotAddress, postalCode: e.target.value })}
          />
        </Grid>
      </Grid>
    </Stack>
  );
};
const Destination = () => {
  const { retraitAddress, setRetraitAddress, destination, setdestination } =
    useContext(CreationContext);
  const [destinations, setdestinations] = useState([]);
  useEffect(() => {
    let newState = [];
    data.map((doc) => {
      doc.states.map((state) => newState.push({ ...state, country: doc.translations.fr }));
    });
    setdestinations(newState);
  }, []);
  const handleSave = (value) => {
    setdestination(value);
    setRetraitAddress({ ...retraitAddress, city: value.name });
  };
  const getLabel = (option) => {
    if (option.name != "") {
      return `${option.name}, ${option.country}`;
    }
    return "";
  };
  return (
    <Stack
      direction={{ xs: "column", sm: "row", md: "row" }}
      mt={4}
      flex={1}
      sx={{ borderBottom: 1, pb: 2, borderColor: "lightgray" }}
    >
      <Box flex={2}>
        <Typography gutterBottom>2. Destination </Typography>
      </Box>
      <Grid container flex={3} spacing={2}>
        <Grid item md={12} lg={12} xs={12}>
          <Autocomplete
            noOptionsText="Destination introuvable"
            value={destination}
            options={destinations}
            getOptionLabel={getLabel}
            groupBy={(option) => option.country}
            renderOption={(props, option) => <Typography {...props}>{option.name}</Typography>}
            renderInput={(params) => (
              <TextField {...params} size="small" variant="outlined" label="Destination" />
            )}
            onChange={(e, value) => handleSave(value)}
          />
        </Grid>
        <Grid item md={12} lg={12} xs={12}>
          <TextField
            value={retraitAddress.address}
            label="Adresse"
            fullWidth
            size="small"
            InputProps={{ endAdornment: <IoLocationSharp size={20} color="#B1B1B1" /> }}
            onChange={(e) => setRetraitAddress({ ...retraitAddress, address: e.target.value })}
          />
        </Grid>
        <Grid item md={6} lg={6} xs={12}>
          <TextField
            label="Ville"
            fullWidth
            size="small"
            value={retraitAddress.city}
            onChange={(e) => setRetraitAddress({ ...retraitAddress, city: e.target.value })}
          />
        </Grid>
        <Grid item md={6} lg={6} xs={12}>
          <TextField
            value={retraitAddress.postalCode}
            label="Code Postal"
            fullWidth
            size="small"
            onChange={(e) => setRetraitAddress({ ...retraitAddress, postalCode: e.target.value })}
          />
        </Grid>
      </Grid>
    </Stack>
  );
};

const Dates = () => {
  const {
    departureDate,
    setdepartureDate,
    distributionDate,
    setdistributionDate,
    lastDepot,
    setlastDepot,
    acceptJJ,
    setacceptJJ,
  } = useContext(CreationContext);
  return (
    <Stack
      direction={{ xs: "column", sm: "row", md: "row" }}
      mt={4}
      flex={1}
      sx={{ borderBottom: 1, pb: 2, borderColor: "lightgray" }}
    >
      <Box flex={2}>
        <Typography gutterBottom>3. Dates </Typography>
      </Box>
      <Grid container flex={3} spacing={2}>
        <Grid item md={6} lg={6} xs={12}>
          <DesktopDatePicker
            type="date"
            value={departureDate}
            label="Date de départ"
            renderInput={(params) => <TextField {...params} size="small" fullWidth />}
            onChange={(value) => setdepartureDate(value)}
          />
        </Grid>
        <Grid item md={6} lg={6} xs={12}>
          <DesktopDatePicker
            value={distributionDate}
            type="date"
            label="Date de d'arrivée"
            renderInput={(params) => <TextField {...params} size="small" fullWidth />}
            onChange={(value) => setdistributionDate(value)}
          />
        </Grid>
        <Grid item md={12} lg={12} xs={12}>
          <FormControl>
            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
              <FormLabel>Acceptez-vous des colis le jour-j ?</FormLabel>
              <RadioGroup row value={acceptJJ}>
                <FormControlLabel
                  value="oui"
                  label="Oui"
                  control={<Radio size="small" />}
                  onChange={(e) => setacceptJJ(e.target.value)}
                />
                <FormControlLabel
                  value="non"
                  label="Non"
                  control={<Radio size="small" />}
                  onChange={(e) => setacceptJJ(e.target.value)}
                />
              </RadioGroup>
            </Stack>
          </FormControl>
        </Grid>
        <Grid item md={6} lg={6} xs={12}>
          {acceptJJ == "oui" ? (
            <TimePicker
              type="date"
              value={lastDepot}
              label="Dernier délai"
              renderInput={(params) => <TextField {...params} size="small" />}
              onChange={(date) => setlastDepot(date)}
            />
          ) : null}
        </Grid>
      </Grid>
    </Stack>
  );
};

const Contacts = () => {
  const { facebookLink, setfacebookLink, contacts, setcontacts, publisher, setpublisher } =
    useContext(CreationContext);
  const [state, setstate] = useState({});
  const [open, setopen] = useState(false);

  const handleAdd = () => {
    setcontacts([...contacts, { ...state, id: contacts.length }]);
    setopen(false);
  };

  const handleDelete = (id) => {
    let newState = contacts.filter((contact) => contact.id !== id);
    setcontacts(newState);
  };

  return (
    <Stack
      direction={{ xs: "column", sm: "row", md: "row" }}
      mt={4}
      flex={1}
      sx={{ borderBottom: 1, pb: 2, borderColor: "lightgray" }}
    >
      <Box flex={2}>
        <Typography gutterBottom>4. Contacts</Typography>
      </Box>
      <Grid container flex={3} spacing={2}>
        <Grid item md={6} lg={6} xs={12}>
          <TextField
            label="Prénom"
            value={publisher.firstName}
            fullWidth
            size="small"
            InputProps={{ endAdornment: <FaUserCircle color="gray" /> }}
            onChange={(e) => setpublisher({ ...publisher, firstName: e.target.value })}
          />
        </Grid>
        <Grid item md={6} lg={6} xs={12}>
          <TextField
            value={publisher.lastName}
            label="Nom"
            fullWidth
            size="small"
            onChange={(e) => setpublisher({ ...publisher, lastName: e.target.value })}
          />
        </Grid>
        <Grid item md={6} lg={6} xs={12}>
          <TextField
            value={publisher.phone}
            label="Numéro de téléphone"
            fullWidth
            size="small"
            type="tel"
            InputProps={{ endAdornment: <FaPhone color="gray" /> }}
            onChange={(e) => setpublisher({ ...publisher, phone: e.target.value })}
          />
        </Grid>
        <Grid item md={6} lg={6} xs={12}>
          <TextField
            value={publisher.whatsapp}
            label="Numéro whatsapp"
            fullWidth
            size="small"
            type="tel"
            InputProps={{ endAdornment: <FaWhatsapp color="gray" /> }}
            onChange={(e) => setpublisher({ ...publisher, whatsapp: e.target.value })}
          />
        </Grid>
        <Grid item md={12} lg={12} xs={12}>
          <TextField
            value={facebookLink}
            label="lien groupe ou annonce Facebook"
            fullWidth
            size="small"
            type="url"
            InputProps={{ endAdornment: <FaFacebook color="gray" /> }}
            onChange={(e) => setfacebookLink(e.target.value)}
          />
        </Grid>
        {contacts.map((contact) => (
          <Grid item md={12} lg={12} xs={12}>
            <Paper sx={{ p: 1 }}>
              <Grid container alignItems="center" spacing={1}>
                <Grid item xs={6} md={6} lg={6} sm={6}>
                  <Stack direction="row" spacing={1}>
                    <FaUserCircle color="gray" />
                    <Typography noWrap variant="body2">
                      {contact.firstName} {contact.lastName}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={5} md={5} lg={5} sm={5}>
                  <Stack direction="row" spacing={1}>
                    <FaPhone color="gray" />
                    <Typography variant="body2" noWrap>
                      {contact.phone}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={1} md={1} lg={1} sm={1}>
                  <FaTrashAlt color="red" onClick={() => handleDelete(contact.id)} />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        ))}

        <Grid item md={12} lg={12} xs={12}>
          <Dialog open={open} onClose={() => setopen(false)}>
            <DialogTitle>Ajouter un contact</DialogTitle>
            <DialogContent>
              <DialogContentText>Saississer les informations</DialogContentText>
              <Grid container spacing={1} pt={2}>
                <Grid item md={6} lg={6} xs={12}>
                  <TextField
                    value={state.firstName}
                    fullWidth
                    placeholder="Prénom"
                    size="small"
                    InputProps={{ endAdornment: <FaUserCircle color="gray" /> }}
                    onChange={(e) => setstate({ ...state, firstName: e.target.value })}
                  />
                </Grid>
                <Grid item md={6} lg={6} xs={12}>
                  <TextField
                    value={state.lastName}
                    fullWidth
                    placeholder="Nom"
                    size="small"
                    InputProps={{ endAdornment: <FaUserCircle color="gray" /> }}
                    onChange={(e) => setstate({ ...state, lastName: e.target.value })}
                  />
                </Grid>
                <Grid item md={6} lg={6} xs={12}>
                  <TextField
                    value={state.phone}
                    fullWidth
                    sx={{ flex: 2 }}
                    placeholder="Numéro téléphone"
                    size="small"
                    type="tel"
                    InputProps={{ endAdornment: <FaPhone color="gray" /> }}
                    onChange={(e) => setstate({ ...state, phone: e.target.value })}
                  />
                </Grid>
                <Grid item md={6} lg={6} xs={12}>
                  <TextField
                    value={state.whatsapp}
                    fullWidth
                    sx={{ flex: 2 }}
                    placeholder="Numéro whatsapp"
                    size="small"
                    type="tel"
                    InputProps={{ endAdornment: <FaWhatsapp color="gray" /> }}
                    onChange={(e) => setstate({ ...state, whatsapp: e.target.value })}
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleAdd}>Valider</Button>
            </DialogActions>
          </Dialog>
          <Button
            fullWidth
            variant="contained"
            endIcon={<IoPersonAddSharp size={15} />}
            onClick={() => setopen(true)}
          >
            Ajouter un contact
          </Button>
        </Grid>
      </Grid>
    </Stack>
  );
};

const Valises = () => {
  const [open, setopen] = useState(false);
  const [state, setstate] = useState({ type: "soute", weight: 23, added: true });

  const { suitcases, setsuitcases } = useContext(CreationContext);

  const changeWeight = (id, newWeight) => {
    var newSuitcase = suitcases.map((suitcase) => {
      if (suitcase.id === id) {
        return { ...suitcase, weight: parseInt(newWeight) };
      }
      return suitcase;
    });
    setsuitcases(newSuitcase);
  };
  const handleAdd = () => {
    let newState = suitcases;
    newState.push({ ...state, id: newState.length, added: true });
    setopen(false);
  };
  const handleDelete = (id) => {
    let newState = suitcases.filter((suitcase) => suitcase.id !== id);
    setsuitcases(newState);
  };
  const Suitcase = ({ suitcase }) => {
    return (
      <Paper key={suitcase.id}>
        <Stack direction="row" alignItems="center">
          {suitcase.type === "soute" ? (
            <FaSuitcase style={{ flex: 1 }} color="A5A5A5" />
          ) : (
            <FaSuitcaseRolling style={{ flex: 1 }} color="A5A5A5" />
          )}

          <Typography color="GrayText" flex={4}>
            {suitcase.type}
          </Typography>
          {suitcase.added ? (
            <FaTrashAlt onClick={() => handleDelete(suitcase.id)} style={{ flex: 1 }} color="red" />
          ) : (
            <FaTrashAlt style={{ flex: 1 }} color="#C5C5C5" />
          )}
          <TextField
            sx={{ flex: 2 }}
            value={suitcase.weight}
            placeholder="Kilo"
            size="small"
            type="number"
            InputProps={{
              endAdornment: (
                <Typography fontSize={12} ml={1}>
                  kg
                </Typography>
              ),
            }}
            onChange={(e) => changeWeight(suitcase.id, e.target.value)}
          />
        </Stack>
      </Paper>
    );
  };
  return (
    <Stack
      direction={{ xs: "column", sm: "row", md: "row" }}
      mt={4}
      flex={1}
      sx={{ borderBottom: 1, pb: 2, borderColor: "lightgray" }}
    >
      <Box flex={2}>
        <Typography gutterBottom>5. Valises</Typography>
      </Box>
      <Grid container flex={3} spacing={2}>
        <Grid item md={12} lg={12} xs={12}>
          <Stack spacing={1}>
            {suitcases
              .sort((a, b) => a.type.localeCompare(b.type))
              .map((suitcase) => (
                <Suitcase suitcase={suitcase} />
              ))}
          </Stack>
        </Grid>
        <Dialog open={open} onClose={() => setopen(false)}>
          <DialogTitle>Ajouter une valise</DialogTitle>
          <DialogContent>
            <DialogContentText>Selectionner un type et un poids</DialogContentText>
            <Grid container spacing={1} pt={2}>
              <Grid item md={6} lg={6} xs={12}>
                <Select
                  value={state.type}
                  fullWidth
                  label="Type"
                  size="small"
                  placeholder="Type"
                  onChange={(e) => setstate({ ...state, type: e.target.value })}
                >
                  <MenuItem value="cabine">Cabine</MenuItem>
                  <MenuItem value="soute">Soute</MenuItem>
                </Select>
              </Grid>
              <Grid item md={6} lg={6} xs={12}>
                <TextField
                  value={state.weight}
                  fullWidth
                  sx={{ flex: 2 }}
                  placeholder="Kilo"
                  size="small"
                  type="number"
                  InputProps={{
                    endAdornment: (
                      <Typography fontSize={12} ml={1}>
                        kg
                      </Typography>
                    ),
                  }}
                  onChange={(e) => setstate({ ...state, weight: e.target.value })}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleAdd}>Valider</Button>
          </DialogActions>
        </Dialog>

        <Grid item md={12} lg={12} xs={12}>
          <Button
            fullWidth
            variant="contained"
            endIcon={<FaSuitcase size={15} />}
            onClick={() => setopen(true)}
          >
            Ajouter une valise
          </Button>
        </Grid>
      </Grid>
    </Stack>
  );
};
const Prices = () => {
  const { paymentMethod, setpaymentMethod, prices, setprices } = useContext(CreationContext);

  const changePrice = (type, newPrice) => {
    var newPrice = prices.map((price) => {
      if (price.type === type) {
        return { ...price, price: newPrice };
      }
      return price;
    });
    setprices(newPrice);
  };
  const checkPaymentMethod = (type, check) => {
    var newPaymentMethods = paymentMethod.map((payment) => {
      if (payment.type === type) {
        return { ...payment, supported: check };
      }
      return payment;
    });
    setpaymentMethod(newPaymentMethods);
  };
  return (
    <Stack direction={{ xs: "column", sm: "row", md: "row" }} flex={1} mt={4}>
      <Box flex={2}>
        <Typography gutterBottom>6. Prix et moyens de paiement</Typography>
      </Box>
      <Grid container flex={3} spacing={2}>
        <Grid item md={12} lg={12} xs={12}>
          <Stack spacing={1}>
            {prices.map((price, index) => (
              <Paper>
                <Stack direction="row" alignItems="center">
                  {price.icon}
                  <Typography color="GrayText" flex={4}>
                    {price.label}
                  </Typography>
                  <TextField
                    sx={{ flex: 2 }}
                    placeholder="Prix"
                    size="small"
                    type="number"
                    value={price.price}
                    InputProps={{
                      endAdornment: (
                        <Typography fontSize={12} ml={1}>
                          €
                        </Typography>
                      ),
                    }}
                    onChange={(e) => changePrice(price.type, e.target.value)}
                  />
                </Stack>
              </Paper>
            ))}
          </Stack>
        </Grid>

        <Grid item md={12} lg={12} xs={12}>
          <Button fullWidth variant="contained" endIcon={<FaCoins size={15} />}>
            Ajouter un prix
          </Button>

          <Stack my={2}>
            <Typography gutterBottom>Methode de paiments acceptées</Typography>
            <FormGroup row>
              {paymentMethod.map((method, index) => (
                <Paper sx={{ flex: 1, px: 1, mr: 1, mt: 1 }} key={index}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        defaultChecked
                        size="small"
                        checked={method.supported}
                        onChange={(e) => checkPaymentMethod(method.type, e.target.checked)}
                      />
                    }
                    label={method.label}
                  />
                </Paper>
              ))}
            </FormGroup>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
};

const PaymentButton = () => {
  const { handleNewPost } = useContext(CreationContext);
  return (
    <Button variant="contained" color="success" endIcon={<IoAddCircle />} onClick={handleNewPost}>
      Publier
    </Button>
  );
};

const Creation = () => {
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
    firstName: "Samba",
    lastName: "Ndiaye",
    phone: "0612345632",
    whatsapp: "774708967",
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
      prices.map((price) => {
        return { type: price.type, price: price.price };
      }),
      publisher,
      contacts,
      facebookLink,
      suitcases,
      paymentMethod
    );
  };
  const Summary = () => {
    const calculateWeight = () => {
      let weight = 0;
      suitcases.map((suitecase) => (weight += suitecase.weight));
      return weight;
    };
    return (
      <Paper sx={{ p: 2, position: "fixed", width: "20%" }}>
        <Typography variant="subtitle1">Résumé</Typography>
        <Stack spacing={1}>
          <Paper elevation={0} sx={{ border: 1, borderColor: "#D5D5D5" }}>
            <Stack direction="row" p={1} alignItems="center" justifyContent="space-between">
              <Stack direction="row" alignItems="center">
                <FaPlaneDeparture color="#A5A5A5" />
                <Typography ml={2}>{departure && departure.name}</Typography>
              </Stack>
              {departure && departure.name ? (
                <FaCheckCircle color="green" />
              ) : (
                <FaRegCircle color="gray" />
              )}
            </Stack>
          </Paper>
          <Paper elevation={0} sx={{ border: 1, borderColor: "#D5D5D5" }}>
            <Stack direction="row" p={1} alignItems="center" justifyContent="space-between">
              <Stack direction="row" alignItems="center">
                <FaPlaneArrival color="#A5A5A5" />
                <Typography ml={2}>{destination && destination.name}</Typography>
              </Stack>
              {destination && destination.name ? (
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
              {destination.name ? <FaCheckCircle color="green" /> : <FaRegCircle color="gray" />}
            </Stack>
          </Paper>
          <PaymentButton />
        </Stack>
      </Paper>
    );
  };
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
      }}
    >
      <Container sx={{ minWidth: "80%" }}>
        <Grid container p={2} spacing={2}>
          <Grid item md={9} lg={9}>
            <Paper sx={{ p: 3 }}>
              <Departure />
              <Destination />
              <Dates />
              <Contacts />
              <Valises />
              <Prices />
            </Paper>
          </Grid>
          <Grid item md={3} lg={3} sx={{ display: { xs: "none", md: "block" } }}>
            <Summary />
          </Grid>
        </Grid>
      </Container>
    </CreationContext.Provider>
  );
};

export default Creation;
