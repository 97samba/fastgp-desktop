import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import {
  Autocomplete,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState, useEffect, createContext, useContext } from "react";
import { AiOutlineSwap } from "react-icons/ai";
import data from "../../data/test.json";
import { useHistory, useParams } from "react-router-dom";
import { SearchPageContext } from "../Pages/Search";
import { Box } from "@mui/system";
import COLORS from "../../colors";
import { MdSearch } from "react-icons/md";
import { GoDash } from "react-icons/go";
import moment from "moment";

const SearchContext = createContext();

const Departure = ({ size }) => {
  const { departure, setdeparture, departureError, handleError } = useContext(SearchContext);
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
    handleError();
  };
  const getLabel = (option) => {
    if (option.name != "") {
      return `${option.name}, ${option.country}`;
    }
    return "";
  };
  return (
    <Autocomplete
      value={departure}
      options={destinations}
      noOptionsText="Destination introuvable"
      getOptionLabel={getLabel}
      groupBy={(option) => option.country}
      renderOption={(props, option) => <Typography {...props}>{option.name}</Typography>}
      renderInput={(params) => (
        <TextField
          {...params}
          size={size}
          variant="outlined"
          label="Départ"
          fullWidth
          error={departureError}
        />
      )}
      onBlur={handleError}
      onChange={(e, value) => handleSave(value)}
    />
  );
};
const Destination = ({ size }) => {
  const { destination, setdestination, destinationError, handleError } = useContext(SearchContext);
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
    handleError();
  };
  const getLabel = (option) => {
    if (option.name != "") {
      return `${option.name}, ${option.country}`;
    }
    return "";
  };
  return (
    <Autocomplete
      noOptionsText="Destination introuvable"
      value={destination}
      options={destinations}
      getOptionLabel={getLabel}
      groupBy={(option) => option.country}
      renderOption={(props, option) => <Typography {...props}>{option.name}</Typography>}
      renderInput={(params) => (
        <TextField
          {...params}
          size={size}
          variant="outlined"
          label="Destination"
          error={destinationError}
        />
      )}
      onBlur={handleError}
      onChange={(e, value) => handleSave(value)}
    />
  );
};
const SearchSummaryMobile = ({
  displaySearchingBar,
  departure,
  destination,
  departureDate,
  switchDestinations,
}) => {
  return (
    <Paper elevation={0}>
      <Stack
        px={3}
        bgcolor={COLORS.primary}
        sx={{ borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}
      >
        <Stack
          direction="row"
          flex={1}
          alignItems="center"
          color="white"
          justifyContent="space-between"
        >
          <IconButton onClick={displaySearchingBar}>
            <MdSearch color="white" />
          </IconButton>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="h6">{departure?.name}</Typography>
            <GoDash color={COLORS.warning} />
            <Typography variant="h6">{destination?.name}</Typography>
          </Stack>
          <IconButton>
            <AiOutlineSwap color="white" onClick={switchDestinations} />
          </IconButton>
        </Stack>
        <Box flex={1} textAlign="center" color="whitesmoke" pb={1}>
          <Typography variant="body2">{moment(departureDate).format("dddd, D MMMM")}</Typography>
        </Box>
      </Stack>
    </Paper>
  );
};

const DynamicSearchBar = ({ size = "small" }) => {
  const history = useHistory();
  const { departureCity, departureCountry, destinationCity, destinationCountry, date } =
    useParams();
  const { getSomeFlights } = useContext(SearchPageContext);
  const [departure, setdeparture] = useState({ name: "", country: "" });
  const [destination, setdestination] = useState({ name: "", country: "" });
  const [departureDate, setDepartureDate] = useState(new Date());
  const [departureError, setdepartureError] = useState(false);
  const [destinationError, setdestinationError] = useState(false);
  const [dateOpen, setdateOpen] = useState(false);
  const [searching, setSearching] = useState(false);

  const switchDestinations = () => {
    var newDep = departure;
    history.replace(
      `/search/${destination.name}/${destination.country}/${departure.name}/${
        departure.country
      }/${departureDate.toJSON()}`,
      {
        departure: destination,
        destination: departure,
        date: departureDate,
      }
    );
    setdestination(newDep);
    setdeparture(destination);
  };

  const handleError = () => {
    setdepartureError(departure == null);
    setdestinationError(destination == null);
  };

  const handleSearch = () => {
    if (departure == null || departure.name == "") {
      setdepartureError(true);
      return;
    }
    if (destination == null || destination.name == "") {
      setdestinationError(true);
      return;
    }
    if (departure != null && destination != null) {
      if (departure.name != "" && destination.name != "") {
        departureError && setdepartureError(false);
        destinationError && setdestinationError(false);
        getSomeFlights(departure, destination, departureDate.toJSON());
        displaySearchingBar();
        history.replace({
          pathname: `/search/${departure.name}/${departure.country}/${destination.name}/${
            destination.country
          }/${departureDate.toJSON()}`,
        });
      }
    }
  };
  function displaySearchingBar() {
    setSearching(!searching);
  }
  function getCity(cityName, country) {
    var result = data
      .filter((value) => value.name == country)[0]
      .states.filter((city) => city.name === cityName)[0];
    return { ...result, country };
  }
  useEffect(() => {
    console.log(`number of params`);
    if (departureCity) {
      setdeparture(getCity(departureCity, departureCountry));
      setdestination(getCity(destinationCity, destinationCountry));
      setDepartureDate(new Date(date));
      getSomeFlights(
        getCity(departureCity, departureCountry),
        getCity(destinationCity, destinationCountry),
        date
      );
    } else {
      setSearching(true);
    }
  }, []);

  return (
    <SearchContext.Provider
      value={{
        departure,
        setdeparture,
        destination,
        setdestination,
        departureDate,
        setDepartureDate,
        departureError,
        destinationError,
        handleError,
      }}
    >
      <Box
        mt={-1}
        sx={{ background: "white" }}
        px={2}
        py={3}
        display={{
          xs: searching ? "block" : "none",
          sm: searching ? "block" : "none",
          md: "block",
          lg: "block",
          xl: "block",
        }}
      >
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
              <Departure size={size} />
            </Grid>
            <Grid
              item
              xs={12}
              sm={1}
              md={1}
              lg={1}
              xl={1}
              sx={{ display: { sm: "none", xs: "none", md: "block" } }}
            >
              <Button
                fullWidth
                variant="outlined"
                sx={{ height: "100%", color: "gray" }}
                onClick={switchDestinations}
              >
                <AiOutlineSwap size={20} />
              </Button>
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
              <Destination size={size} />
            </Grid>
            <Grid item xs={6} sm={6} md={3} lg={3} xl={3}>
              <DesktopDatePicker
                type="date"
                value={departureDate}
                label="Date de départ"
                renderInput={(params) => (
                  <TextField {...params} fullWidth size={size} onClick={() => setdateOpen(true)} />
                )}
                onChange={(value) => setDepartureDate(value)}
                open={dateOpen}
                onOpen={() => setdateOpen(true)}
                onClose={() => setdateOpen(false)}
              />
            </Grid>
            <Grid item xs={6} sm={6} md={2} lg={2} xl={2}>
              <Button
                fullWidth
                size="small"
                color="primary"
                variant="contained"
                sx={{ height: "100%" }}
                onClick={handleSearch}
              >
                Rechercher
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box
        mt={-2}
        display={{
          xs: searching ? "none" : "block",
          sm: searching ? "none" : "block",
          md: "none",
          lg: "none",
          xl: "none",
        }}
      >
        <SearchSummaryMobile
          departure={departure}
          destination={destination}
          displaySearchingBar={displaySearchingBar}
          departureDate={departureDate}
          switchDestinations={switchDestinations}
        />
      </Box>
    </SearchContext.Provider>
  );
};

export default DynamicSearchBar;
