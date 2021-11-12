import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import { Autocomplete, Button, Grid, Stack, TextField, Typography } from "@mui/material";
import React, { useState, useEffect, createContext, useContext } from "react";
import { AiOutlineSwap } from "react-icons/ai";
import data from "../data/test.json";
import { SearchPageContext } from "./Pages/Search";
import { useHistory } from "react-router-dom";

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
          helperText={departureError ? "Veuillez renseigner le départ" : ""}
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
          helperText={destinationError ? "Veuillez rensigner la destination" : ""}
        />
      )}
      onBlur={handleError}
      onChange={(e, value) => handleSave(value)}
    />
  );
};

const SearchBar = ({ size = "medium", gotoPage = true }) => {
  const history = useHistory();
  const { flights, getFlights, getSomeFlights } = useContext(SearchPageContext);
  const [departure, setdeparture] = useState({ name: "", country: "" });
  const [destination, setdestination] = useState({ name: "", country: "" });
  const [departureDate, setDepartureDate] = useState(new Date());
  const [departureError, setdepartureError] = useState(false);
  const [destinationError, setdestinationError] = useState(false);

  const switchDestinations = () => {
    var newDep = departure;
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
    if (!gotoPage) {
      console.log(`flights`, flights.length);
      if (departure != null && destination != null) {
        if (departure.name != "" && destination.name != "") {
          departureError && setdepartureError(false);
          destinationError && setdestinationError(false);
          getSomeFlights(departure, destination, departureDate.toJSON());
          return;
        }
      }
    } else {
      history.push({
        pathname: "/search",
        state: { departure: departure, destination: destination, date: departureDate },
      });
    }
  };
  useEffect(() => {
    console.log(`history`, history.location);
    if (history.location.state) {
      setdeparture(history.location.state.departure);
      setdestination(history.location.state.destination);
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
      <Grid container spacing={2}>
        <Grid item md={3} lg={3} xl={3}>
          <Departure size={size} />
        </Grid>
        <Grid item md={1} lg={1} xl={1}>
          <Button
            fullWidth
            variant="outlined"
            sx={{ height: "100%", color: "gray" }}
            onClick={switchDestinations}
          >
            <AiOutlineSwap size={20} />
          </Button>
        </Grid>
        <Grid item md={3} lg={3} xl={3}>
          <Destination size={size} />
        </Grid>
        <Grid item md={3} lg={3} xl={3}>
          <DesktopDatePicker
            type="date"
            value={departureDate}
            label="Date de départ"
            renderInput={(params) => <TextField {...params} fullWidth size={size} />}
            onChange={(value) => setDepartureDate(value)}
          />
        </Grid>
        <Grid item md={2} lg={2} xl={2}>
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
    </SearchContext.Provider>
  );
};

export default SearchBar;
