import moment from "moment";
import axios from "axios";

export const verifyNewPost = (
  departure,
  destination,
  departureDate,
  distributionDate,
  lastDepot,
  acceptJJ,
  depotAddress,
  retraitAddress,
  prices,
  publisher,
  contacts,
  facebookLink,
  suitcases,
  paymentMethod
) => {
  VerifyCountries(departure, destination);
  verifyContacts(publisher) &&
    verifySuitcases(suitcases) &&
    verifyDates(departureDate, distributionDate, acceptJJ) &&
    postFlight({
      version: "2.0",
      departure: departure,
      destination: destination,
      departureDate: departureDate,
      distributionDate: distributionDate,
      lastDepot: lastDepot,
      acceptJJ: acceptJJ === "oui",
      depotAddress: depotAddress,
      retraitAddress: retraitAddress,
      prices: transformPrices(prices),
      publisher: publisher,
      contacts: contacts,
      facebookLink: facebookLink,
      suitcases: suitcases,
      paymentMethod: paymentMethod,
      canShip: canShip(destination),
      createdAt: new Date(),
    });
};

const transformPrices = (prices) => {
  var prix = {};
  prices.map((price) => {
    prix = { ...prix, [price.type]: price.price };
  });
  return prix;
};

const VerifyCountries = (departure, destination) => {
  if (departure.name === undefined || destination.name === undefined) {
    console.log("erreur villes");
    return false;
  } else {
    if (departure.name === destination.name) {
      console.log("depart = destination");
      return false;
    }
    console.log(`destination`, "good");
  }
};

const verifyDates = (departureDate, distributionDate, acceptJJ) => {
  if (
    moment(departureDate).isSame(distributionDate) ||
    moment(departureDate).isAfter(distributionDate)
  ) {
    console.log("erreur date");
    return false;
  }
  console.log("dates good");

  return true;
};

const verifyContacts = (publisher) => {
  return publisher.phone !== "" && (publisher.firstName !== "" || publisher.lastName !== "");
};

const verifySuitcases = (suitcases) => {
  let good = true;
  suitcases.map((suitcase) => {
    if (suitcase.weight === "" || suitcase.weight === "0") {
      console.log("valise poids 0");
      good = false;
    }
  });
  return good;
};

const postFlight = (flight) => {
  axios
    .post("http://localhost:5001/fir-c69a6/us-central1/api/PostAFlight", flight)
    .then((result) => {
      console.log(`result`, result.data);
    });
};

const canShip = (destination) => {
  return destination.name === "Dakar";
};
