import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import {
  Autocomplete,
  Button,
  Divider,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState, useEffect, createContext, useContext } from "react";
import { AiOutlineSwap } from "react-icons/ai";
import data from "../data/test.json";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { Box } from "@mui/system";
import { IoSwapVerticalOutline } from "react-icons/io5";
import COLORS from "../colors";

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
    if (option.name !== "") {
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
          margin="none"
          size={size}
          variant="standard"
          label="Départ"
          fullWidth
          error={departureError}
          inputProps={{
            ...params.inputProps,
            style: { ...params.inputProps.style, fontWeight: 600, color: COLORS.black },
          }}
          InputProps={{
            disableUnderline: true,
            ...params.InputProps,
          }}
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
    if (option.name !== "") {
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
          variant="standard"
          label="Destination"
          error={destinationError}
          InputProps={{ disableUnderline: true, ...params.InputProps }}
          inputProps={{
            ...params.inputProps,
            style: { ...params.inputProps.style, fontWeight: 600, color: COLORS.black },
          }}
        />
      )}
      onBlur={handleError}
      onChange={(e, value) => handleSave(value)}
    />
  );
};

const SearchBar = ({ size = "medium", gotoPage = true }) => {
  const history = useHistory();
  const [departure, setdeparture] = useState({ name: "", country: "" });
  const [destination, setdestination] = useState({ name: "", country: "" });
  const [departureDate, setDepartureDate] = useState(new Date());
  const [departureError, setdepartureError] = useState(false);
  const [destinationError, setdestinationError] = useState(false);
  const [dateOpen, setdateOpen] = useState(false);
  const switchDestinations = () => {
    var newDep = departure;

    setdestination(newDep);
    setdeparture(destination);
  };

  const handleError = () => {
    setdepartureError(departure === null);
    setdestinationError(destination === null);
  };

  const handleSearch = () => {
    if (departure == null || departure.name === "") {
      setdepartureError(true);
      return;
    }
    if (destination == null || destination.name === "") {
      setdestinationError(true);
      return;
    }

    history.push({
      pathname: `/search/${departure.name}/${departure.country}/${destination.name}/${
        destination.country
      }/${departureDate.toJSON()}`,
    });
  };
  useEffect(() => {
    if (history.location.state) {
      setdeparture(history.location.state.departure);
      setdestination(history.location.state.destination);
    }
  }, []);
  const MobileMenu = () => {
    return (
      <Paper
        elevation={0}
        sx={{
          borderRadius: 2,
          border: { xs: "1px solid #E5E5E5", sm: 0, md: 0 },
          boxShadow: {
            xs: "1px 1px 3px 1px #494aa225",
            sm: "1px 1px 3px 1px #494aa225",
            md: "none",
          },
        }}
      >
        <Grid container rowGap={2} columnSpacing={2} p={{ xs: 2, sm: 3, md: 0 }}>
          <Grid item xs={12} sm={12} md={5} lg={5} xl={5} mb={{ xs: 0.5 }}>
            <Departure size={size} />
          </Grid>
          <Grid
            item
            xs={12}
            sm={1}
            md={2}
            lg={2}
            xl={2}
            sx={{ display: { sm: "none", xs: "none", md: "block" } }}
          >
            <Button
              fullWidth
              // variant="outlined"
              sx={{ height: "100%", color: "gray" }}
              onClick={switchDestinations}
            >
              <AiOutlineSwap size={20} />
            </Button>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={1}
            lg={1}
            xl={1}
            sx={{ display: { sm: "block", xs: "block", md: "none" } }}
          >
            <Stack direction="row" alignItems="center" position="relative">
              <Divider variant="fullWidth" sx={{ borderStyle: "dashed", flex: 1, flexFlow: 1 }} />
              <Box position="absolute" right={0} bgcolor="white">
                <Button
                  fullWidth
                  variant="outlined"
                  sx={{ height: "100%", color: "gray", backgroundColor: "white" }}
                  onClick={switchDestinations}
                >
                  <IoSwapVerticalOutline size={20} />
                </Button>
              </Box>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
            <Destination size={size} />
          </Grid>
        </Grid>
      </Paper>
    );
  };

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
      <Grid container columnSpacing={2} rowGap={2} px={2} py={1}>
        <Grid item xs={12} sm={12} md={7} lg={7} xl={7}>
          <Box>
            <MobileMenu />
          </Box>
        </Grid>

        <Grid item xs={6} sm={6} md={3} lg={3} xl={3}>
          <Box
            flex={1}
            border={{ xs: "1px solid lightGray", md: "none" }}
            py={{ xs: 0.5 }}
            px={{ xs: 1 }}
            borderRadius={{ xs: 1 }}
          >
            <DesktopDatePicker
              type="date"
              value={departureDate}
              label="Date de départ"
              minDate={moment()}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  size="small"
                  variant="standard"
                  onClick={() => setdateOpen(true)}
                  InputProps={{ disableUnderline: true, ...params.InputProps }}
                  inputProps={{
                    ...params.inputProps,
                    style: { ...params.inputProps.style, fontWeight: 500, color: COLORS.black },
                  }}
                />
              )}
              onChange={(value) => setDepartureDate(value)}
              open={dateOpen}
              onOpen={() => setdateOpen(true)}
              onClose={() => setdateOpen(false)}
            />
          </Box>
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
    </SearchContext.Provider>
  );
};

export default SearchBar;
