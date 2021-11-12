import React, { createContext, useContext, useEffect, useState } from "react";

import {
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Slider,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/material";
import { Box } from "@mui/system";
import Flight from "../Flight";
import axios from "axios";
import FlightSkeleton from "../FlightSkeleton";
import SignUpDialog from "../SignUpDialog";
import SearchBar from "../SearchBar";
import { FaArrowDown } from "react-icons/fa";
import moment from "moment";

import AdImage from "../../Images/online_ad.svg";
import { useHistory } from "react-router";
const Header = () => {
  return (
    // <Box style={{ background: "#494aa2" }}>
    <Box sx={{ background: "white", borderBottom: 1, borderColor: "#D2D2D2" }} p={2}>
      <Container>
        <SearchBar size="small" gotoPage={false} />
      </Container>
    </Box>
  );
};

const Body = () => {
  const { flights, loading, filteredFlight, nearFlights } = useContext(SearchPageContext);

  const getCheapest = () => {
    if (flights.length > 0) {
      let cheapest = flights[0].prices.filter((price) => price.type === "pricePerKG")[0].price;
      flights.map((flight) => {
        if (flight.prices[0].price < cheapest) {
          cheapest = flight.prices[0].price;
        }
      });
      console.log("The cheapest is ", cheapest);
      return 8;
    }
  };

  const getTheFastest = () => {
    if (flights.length > 0) {
      let fastest = flights[0];
      flights.map((flight) => {
        if (moment(flight.departureDate).isBefore(fastest.departureDate)) {
          fastest = flight;
        }
      });

      console.log(`fastest.departureDate`, fastest.departureDate, "price ", fastest.prices[0]);
      return fastest.prices.filter((price) => price.type === "pricePerKG")[0].price;
    }
  };

  const bests = [
    {
      label: "Le moins cher",
      date: "16 sept",
      // price: getCheapest(),
      price: 9,
    },
    {
      label: "Le meilleur",
      date: "18 sept",
      price: 12,
    },
    {
      label: "Le plus rapide",
      date: "demain",
      // price: getTheFastest(),
      price: 8,
    },
    {
      label: "Le plus proche",
      date: "20 sept",
      price: 11,
    },
  ];
  const Left = () => {
    const { orderBy, setorderBy, filters, setfilters, maxPrice, setmaxPrice, flights } =
      useContext(SearchPageContext);

    const handleOderChange = (e) => {
      setorderBy(e.target.value);
    };

    const handlePaymentChange = (e) => {
      var newState = {};
      if (e.target.value) {
        newState = {
          ...filters,
          paymentMethods: filters.paymentMethods.map((method) => {
            if (method.type == e.target.value) {
              return {
                ...method,
                supported: e.target.checked,
              };
            } else {
              return method;
            }
          }),
        };
        setfilters(newState);
      }
    };

    const handleShipping = (e) => {
      if (e.target.value) {
        setfilters({ ...filters, FreeshippingOnly: e.target.checked });
      }
    };

    const changePriceRange = (e, newValue) => {
      setmaxPrice(newValue);
    };
    return (
      <Paper
        elevation={0}
        sx={{
          px: 2,
          py: 2,
          minHeight: "30%",
          border: 1,
          borderColor: "#E2E2E2",
        }}
      >
        <Stack divider={<Divider orientaion="horizontal" />} spacing={1}>
          <Typography>Résultats ({flights.length})</Typography>
          <Box>
            <FormControl sx={{ width: "100%", my: 1 }}>
              <InputLabel>Trier par</InputLabel>
              <Select
                value={orderBy}
                placeholder="Trier par"
                fullWidth
                label="Trier par"
                size="small"
                onChange={handleOderChange}
              >
                {["Date", "Prix"].map((filter, index) => (
                  <MenuItem value={filter} key={index}>
                    {filter}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box py={1}>
            <Typography fontWeight="bold" fontSize={13}>
              Moyens de transport
            </Typography>
            <FormGroup sx={{ pt: 1 }}>
              <FormControlLabel
                sx={{ height: 25 }}
                control={<Checkbox defaultChecked size="small" disabled />}
                label={<Typography fontSize={13}>Avion</Typography>}
              />
              <FormControlLabel
                sx={{ height: 25 }}
                control={<Checkbox size="small" disabled />}
                label={
                  <Typography fontSize={13} color="GrayText">
                    Bateau (Bientot)
                  </Typography>
                }
              />
            </FormGroup>
          </Box>
          <Box py={1}>
            <Typography fontWeight="bold" fontSize={13}>
              Prix
            </Typography>
            <Box pt={1}>
              <Stack direction="row" justifyContent="space-between">
                <Typography fontSize={11}>{filters.minPrice} € </Typography>
                <Typography fontSize={11}>{filters.maxPrice} € </Typography>
              </Stack>
              <Box px={1}>
                <Slider
                  min={filters.minPrice}
                  value={maxPrice}
                  max={filters.maxPrice}
                  marks
                  step={1}
                  valueLabelDisplay="auto"
                  onChange={changePriceRange}
                />
              </Box>
            </Box>
          </Box>
          <Box py={1}>
            <Typography fontWeight="bold" fontSize={13}>
              Paiements acceptés
            </Typography>
            <FormGroup sx={{ pt: 1 }}>
              {filters.paymentMethods.map((method, index) => (
                <FormControlLabel
                  key={index}
                  onClick={handlePaymentChange}
                  onChange={handleShipping}
                  sx={{ height: 25 }}
                  checked={method.supported}
                  value={method.type}
                  control={<Checkbox disableRipple size="small" />}
                  label={<Typography fontSize={13}>{method.label}</Typography>}
                />
              ))}
            </FormGroup>
          </Box>
          <Box py={1}>
            <Typography fontWeight="bold" fontSize={13}>
              Livraison
            </Typography>
            <FormControl>
              <FormControlLabel
                sx={{ height: 25 }}
                checked={filters.FreeshippingOnly}
                onChange={handleShipping}
                control={<Checkbox disableRipple size="small" />}
                label={<Typography fontSize={13}>Gratuite</Typography>}
              />
            </FormControl>
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
          {bests.map((best, index) => (
            <BestPrice best={best} key={index} />
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
            {filteredFlight.map((data, index) => (
              <Box display={data.display !== false}>
                <Flight data={data} key={index} />
              </Box>
            ))}
          </Box>
        )}
        <Stack
          my={3}
          border={0.5}
          borderColor="lightgray"
          py={0.5}
          justifyContent="center"
          alignItems="center"
          spacing={1}
          borderRadius={1}
          direction="row"
        >
          <Typography fontSize={14} color="GrayText">
            Plus de résultats proches
          </Typography>
          <FaArrowDown size={12} color="gray" />
        </Stack>
        {nearFlights.map((data, index) => (
          <Flight data={data} key={index} />
        ))}
      </Box>
    );
  };

  const Right = () => {
    return (
      <Paper
        elevation={0}
        sx={{
          p: 2,
          border: 1,
          borderColor: "#E2E2E2",
        }}
      >
        <Typography gutterBottom>Publicités</Typography>
        <img src={AdImage} alt={AdImage} width="100%" />
        <Divider sx={{ my: 3 }} />
        <img src={AdImage} alt={AdImage} width="100%" />
      </Paper>
    );
  };

  return (
    <Grid container spacing={2} p={1}>
      <Grid
        item
        md={2}
        lg={2}
        sx={{ display: { sm: "none", xs: "none", lg: "block", xl: "block" } }}
      >
        <Left />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={7}>
        <Middle />
      </Grid>
      <Grid
        item
        md={3}
        lg={3}
        sx={{ display: { sm: "none", xs: "none", lg: "block", xl: "block" } }}
      >
        <Right />
      </Grid>
    </Grid>
  );
};
export const SearchPageContext = createContext();
const Search = () => {
  const proxy = "http://localhost:5001/fir-c69a6/us-central1/api/";
  const [flights, setflights] = useState([]);
  const [filteredFlight, setfilteredFlight] = useState(flights);
  const [nearFlights, setnearFlights] = useState([]);
  const [loading, setloading] = useState(true);
  const [maxPrice, setmaxPrice] = useState(15);
  const [filters, setfilters] = useState({
    transports: ["plane", "boat"],
    minPrice: 8,
    maxPrice: maxPrice,
    paymentMethods: [
      { label: "Espéces", type: "money", supported: true },
      { label: "Paypal", type: "paypal", supported: true },
      { label: "Carte", type: "card", supported: true },
      { type: "transfer", label: "Wave...", supported: true },
    ],
    FreeshippingOnly: false,
    filtered: false,
  });
  const [orderBy, setorderBy] = useState("Date");
  const history = useHistory();

  const applyFilter = () => {
    var newFlights = flights.map((flight) => {
      return { ...flight, display: true };
    });
    if (filters.filtered) {
      newFlights = flights.map((flight) => {
        if (flight.prices[0].price > maxPrice) {
          return { ...flight, display: false };
        }
        return flight;
      });

      if (filters.FreeshippingOnly) {
        newFlights = newFlights.map((flight) => {
          if (flight.canShip === false) {
            return { ...flight, display: false };
          }
          return flight;
        });
      }

      if (orderBy === "Date") {
        newFlights = newFlights.sort((a, b) => a.prices[0].price - b.prices[0].price);
      } else {
        newFlights = newFlights.sort((a, b) => moment(a.departureDate).diff(b.departureDate));
      }
    } else {
      return flights;
    }
  };
  const getFlights = () => {
    !loading && setloading(true);
    axios.get(`${proxy}GetAllFlights`).then((result) => {
      console.log(`result`, result.length);
      setflights(result.data);
      setloading(false);
    });
  };

  const getSomeFlights = (departure, destination, date) => {
    !loading && setloading(true);
    axios
      .get(
        `${proxy}GetSomeFlights?depart=${departure.name}&pays=${departure.country}&destination=${destination.name}&date=${date}`
      )
      .then((result) => {
        setfilteredFlight(result.data.exact);
        if (orderBy === "price") {
          setflights(result.data.exact.sort((a, b) => a.prices[0].price - b.prices[0].price));
          setnearFlights(result.data.near.sort((a, b) => a.prices[0].price - b.prices[0].price));
        } else {
          setflights(result.data.exact);
          setnearFlights(result.data.near);
        }
        setloading(false);
      });
  };

  const displaySearch = (state) => {
    getSomeFlights(state.departure, state.destination, state.date.toJSON());
  };
  const startSearch = () => {
    getFlights();
  };

  const viewFlight = (flight) => {
    history.push("view", flight);
  };

  useEffect(() => {
    if (history.location.state) {
      displaySearch(history.location.state);
    } else {
      startSearch();
    }
  }, []);

  useEffect(async () => {
    setloading(true);
    await new Promise((res) => setTimeout(res, 200));
    ChangeOrder();
    setloading(false);
  }, [orderBy]);
  const ChangeOrder = () => {
    if (orderBy === "Date") {
      setfilteredFlight(
        filteredFlight.sort((a, b) => moment(a.departureDate).diff(b.departureDate))
      );
    } else {
      setfilteredFlight(filteredFlight.sort((a, b) => a.prices[0].price - b.prices[0].price));
    }
  };

  useEffect(() => {
    // if (filters.FreeshippingOnly) {
    //   console.log("filtering for shipping");
    //   setfilteredFlight(
    //     filteredFlight.map((flight) => {
    //       if (!flight.canShip) {
    //         return { ...flight, display: false };
    //       }
    //       return flight;
    //     })
    //   );
    // }
  }, [filters.FreeshippingOnly]);

  useEffect(async () => {
    setloading(true);
    await new Promise((res) => setTimeout(res, 200));
    console.log("filtering for price");
    var newState = flights.filter((flight) => flight.prices[0].price <= maxPrice);
    setfilteredFlight(newState);
    // ChangeOrder();
    setloading(false);
  }, [maxPrice]);

  return (
    <div style={{ background: "#F6F6F9" }}>
      <SearchPageContext.Provider
        value={{
          flights,
          setflights,
          loading,
          setloading,
          getFlights,
          getSomeFlights,
          nearFlights,
          filters,
          setfilters,
          orderBy,
          setorderBy,
          maxPrice,
          setmaxPrice,
          viewFlight,
          applyFilter,
          filteredFlight,
          setfilteredFlight,
        }}
      >
        <Header />
        <Container style={{ minWidth: "90%" }}>
          <Body />
          <SignUpDialog />
        </Container>
      </SearchPageContext.Provider>
    </div>
  );
};

export default Search;
