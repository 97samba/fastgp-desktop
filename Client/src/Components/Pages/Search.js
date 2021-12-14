import React, { createContext, useEffect, useState } from "react";

import { Container } from "@mui/material";
import SignUpDialog from "../SignUpDialog";
import moment from "moment";

import { useHistory, useParams } from "react-router";
import FlightList from "../SearchComponents/FlightList";
import { GetAllFlights, QueryFlights } from "../../firebase/db";
import DynamicSearchBar from "../SearchComponents/DynamicSearchBar";

export const SearchPageContext = createContext();
const Search = () => {
  const [flights, setflights] = useState([]);
  const [filteredFlight, setfilteredFlight] = useState(flights);
  const [nearFlights, setnearFlights] = useState([]);
  const [loading, setloading] = useState(true);
  const [superlatives, setsuperlatives] = useState({
    best: {},
    cheapest: {},
    fastest: {},
    nearest: {},
  });
  const [initializing, setinitializing] = useState(true);

  const [filters, setfilters] = useState({
    transports: ["plane", "boat"],
    minPrice: 4,
    maxPrice: 15,
    price: 15,
    wave: false,
    money: false,
    paypal: false,
    card: false,
    FreeshippingOnly: false,
    filtered: false,
  });
  const [orderBy, setorderBy] = useState("Date");
  const history = useHistory();
  const { departureCity, destinationCity, date } = useParams();

  const getFlights = async () => {
    !loading && setloading(true);
    !initializing && setinitializing(true);
    var all = await GetAllFlights();
    setflights(all);
    setfilteredFlight(all);
    setloading(false);
    setinitializing(false);
  };

  const getSomeFlights = async (departure, destination, date) => {
    !initializing && setinitializing(true);
    !loading && setloading(true);
    const results = await QueryFlights(departure, destination, date);
    setfilteredFlight(results?.exact);
    setflights(results?.exact);
    setnearFlights(results?.near);
    setsuperlatives(getSuperlatives(results?.exact));
    getTheMinAndMaxPrice(results?.exact);
    setloading(false);
    setinitializing(false);
  };

  const displaySearch = (state) => {
    getSomeFlights(state.departure, state.destination, state.date.toJSON());
  };
  const startSearch = () => {
    getFlights();
  };

  const getSuperlatives = (datas) => {
    let cheapest, best, fastest, nearest;
    cheapest = best = fastest = nearest = datas.length > 0 ? datas[0] : null;

    if (datas.length > 1) {
      cheapest = datas.sort((a, b) => a.prices.pricePerKG - b.prices.pricePerKG)[0];
      fastest = datas.sort((a, b) => moment(a.departureDate).diff(b.departureDate))[0];

      let half = Math.ceil(datas.length / 2);

      // filtre date croissante, prendre la moitié puis voir le moins cher
      best = datas
        .sort((a, b) => moment(a.departureDate).diff(b.departureDate))
        .slice(0, half)
        .sort((a, b) => a.prices.pricePerKG - b.prices.pricePerKG)[0];
    }
    return {
      best: best,
      cheapest: cheapest,
      fastest: fastest,
      nearest: nearest,
    };
  };

  const getTheMinAndMaxPrice = (datas) => {
    if (datas.length > 0) {
      var newState = datas.sort((a, b) => a.prices.pricePerKG - b.prices.pricePerKG);
      setfilters({
        ...filters,
        maxPrice: Number(newState[datas.length - 1].prices.pricePerKG),
        minPrice: Number(newState[0].prices.pricePerKG - 1),
        price: Number(newState[datas.length - 1].prices.pricePerKG),
      });
    } else {
      console.log("pas de vol");
    }
  };

  useEffect(() => {
    console.log(`departureCity`, departureCity);
    console.log(`destinationCity`, destinationCity);
    console.log(`date`, date);
  }, [departureCity]);
  useEffect(() => {
    if (history.location.state) {
      displaySearch(history.location.state);
    } else {
      startSearch();
    }
  }, []);

  //filtre par date ou par prix
  useEffect(async () => {
    setloading(true);
    console.log("ordering by", orderBy);
    !initializing && (await new Promise((res) => setTimeout(res, 500)));
    setfilteredFlight(ChangeOrder(filteredFlight));
    setloading(false);
  }, [orderBy]);

  const ChangeOrder = (datas) => {
    if (orderBy === "Date") {
      return datas.sort((a, b) => moment(a.departureDate).diff(b.departureDate));
    } else {
      return datas.sort((a, b) => a.prices.pricePerKG - b.prices.pricePerKG);
    }
  };

  //adapte les filtres
  useEffect(async () => {
    if (!initializing) {
      setloading(true);
      console.log("filtering");

      var newState = flights;
      //prix
      newState = newState.filter((state) => state.prices.pricePerKG <= filters.price);

      //paiements
      if (filters.money) {
        newState = newState.filter((flight) => flight.paymentMethod[0].supported === true);
      }

      if (filters.paypal) {
        newState = newState.filter((flight) => flight.paymentMethod[1].supported === true);
      }
      if (filters.card) {
        newState = newState.filter((flight) => flight.paymentMethod[2].supported === true);
      }
      if (filters.wave) {
        newState = newState.filter((flight) => flight.paymentMethod[3].supported === true);
      }

      //shipping
      if (filters.FreeshippingOnly) {
        newState = newState.filter((flight) => flight.canShip === true);
      }
      !initializing && (await new Promise((res) => setTimeout(res, 500)));
      setfilteredFlight(ChangeOrder(newState));
      setloading(false);
    }
  }, [filters]);

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

          filteredFlight,
          setfilteredFlight,
          superlatives,
          initializing,
          setinitializing,
        }}
      >
        <DynamicSearchBar />
        <Container style={{ minWidth: "90%" }}>
          <FlightList />
          <SignUpDialog />
        </Container>
      </SearchPageContext.Provider>
    </div>
  );
};

export default Search;
