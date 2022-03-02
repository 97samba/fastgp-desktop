import moment from "moment";
import { postAflight, updateAFlight } from "../firebase/db";

export const verifyNewPost = async (
    departure,
    destination,
    departureDate,
    distributionDate,
    lastDepot,
    acceptJJ,
    depotAddress,
    retraitAddress,
    ownerId,
    email,
    prices,
    publisher,
    contribution,
    contributionPaymentMethod,
    contacts,
    facebookLink,
    suitcases,
    paymentMethod,
    state,
    pageMode,
    id
) => {
    let newPost = {
        version: "2.0",
        byFastGp: false,
        departure,
        destination,
        departureDate: departureDate.toJSON(),
        distributionDate: distributionDate.toJSON(),
        lastDepot,
        acceptJJ: acceptJJ === "oui",
        depotAddress,
        retraitAddress,
        ownerId,
        prices: transformPrices(prices),
        publisher,
        contribution,
        contributionPaymentMethod,
        contacts,
        facebookLink,
        suitcases,
        paymentMethod,
        canShip: canShip(destination),
        currency: state.currency,
        contribution: state.contribution,
        contributionPaymentMethod: state.contributionPaymentMethod,
        createdAt: new Date().toJSON(),
    };
    if (pageMode === "edit") {
        var result = await updateAFlight(newPost, id);
        return result;
    } else {
        var result = await postAflight(newPost, email);
        return result;
    }
};

const transformPrices = (prices) => {
    var prix = {};
    prices.map((price) => {
        prix = { ...prix, [price.type]: price.price };
    });
    return prix;
};

export const VerifyCountries = (departure, destination) => {
    if (
        departure.name === undefined ||
        destination.name === undefined ||
        departure.name === "" ||
        destination.name === ""
    ) {
        console.log("erreur villes");
        return false;
    } else {
        if (departure.name === destination.name) {
            console.log("depart = destination");
            return false;
        }
        console.log(`destination`, "good");
        return true;
    }
};

export const verifyDates = (departureDate, distributionDate, acceptJJ) => {
    if (moment(departureDate).isAfter(distributionDate)) {
        return false;
    }

    return true;
};

export const verifyContacts = (publisher) => {
    return (
        publisher.phone !== "" &&
        (publisher.firstName !== "" || publisher.lastName !== "")
    );
};

export const verifySuitcases = (suitcases) => {
    let good = true;
    suitcases.map((suitcase) => {
        if (suitcase.weight === "" || suitcase.weight === "0") {
            console.log("valise poids 0");
            good = false;
        }
    });
    return good;
};

const canShip = (destination) => {
    return destination.name === "Dakar";
};
