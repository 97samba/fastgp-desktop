// Import the functions you need from the SDKs you need
import { async } from "@firebase/util";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  query,
  doc,
  getDoc,
  where,
  getDocs,
  collection,
  orderBy,
  limit,
  addDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  Timestamp,
} from "firebase/firestore";
import moment from "moment";
import { app } from "./config";

export const db = getFirestore(app);

export const getAFlight = async (id) => {
  var flight;
  await getDoc(doc(db, "flights", id)).then((data) => (flight = { ...data.data(), id: data.id }));
  return flight;
};

export const postAflight = async (flight, email) => {
  addDoc(collection(db, "flights"), flight)
    .then(async (data) => {
      await updateDoc(doc(db, "users", email), { flights: arrayUnion(data.id) }).catch((error) =>
        console.log("erreur lors de l'ajout de l'id du vol", error)
      );
    })
    .then(() => console.log("ajout avec succes"))
    .catch((error) => console.log(`erreur creation post`, error));
};

export async function FollowGP(email, followerId) {
  const ref = doc(db, "users", email);
  var followed = false;
  await updateDoc(ref, {
    followers: arrayUnion(followerId),
  })
    .then(() => (followed = true))
    .then(() => console.log("follow done"))
    .catch(() => console.log("erreu lors de l'abonnement"));
  return followed;
}
export async function UnFollowGP(email, followerId) {
  const ref = doc(db, "users", email);
  var unfollowed = false;
  await updateDoc(ref, {
    followers: arrayRemove(followerId),
  })
    .then(() => (unfollowed = true))
    .then(() => console.log("follow done"))
    .catch(() => console.log("erreu lors de l'abonnement"));
  return unfollowed;
}

export async function userDetails(id) {
  const q = query(collection(db, "users"), where("userId", "==", id));
  let user;
  await getDocs(q)
    .then((data) => {
      user = data.docs[0].data();
    })
    .catch((erreur) => console.log("erreur", erreur));
  return user;
}
export const getUserFlights = async (userId) => {
  let flights = [];
  const q = query(
    collection(db, "flights"),
    where("ownerId", "==", userId)
    // orderBy("createdAt", "asc")
  );
  await getDocs(q).then((data) => {
    data.docs.forEach((doc) => flights.push({ ...doc.data(), id: doc.id }));
  });
  return flights;
};

export async function GetAllFlights() {
  const q = query(collection(db, "flights"), orderBy("createdAt"), limit(5));
  const all = [];
  await getDocs(q)
    .then((snap) => {
      snap.docs.forEach((doc) => all.push({ ...doc.data(), id: doc.id }));
    })
    .catch((error) => console.log(`error`, error));
  return all;
}

export async function QueryFlights(departure, destination, date) {
  var exactResults = await getExactResults(departure.name, destination.name, date);
  var nearResults = await getNearResults(departure.name, destination.name, departure.country, date);

  // console.log(`exactResults`, exactResults.length);
  // console.log(`nearResults`, nearResults.length);
  return { exact: exactResults, near: nearResults };
}
const getExactResults = async (departureCity, destinationCity, departureDate) => {
  var exacts = [];
  // var errors;
  const q = query(
    collection(db, "flights"),
    where("departure.name", "==", departureCity),
    where("destination.name", "==", destinationCity),
    where("departureDate", ">=", departureDate)
  );
  await getDocs(q)
    .then((snap) => {
      snap.docs.forEach((doc) => exacts.push({ ...doc.data(), id: doc.id }));
    })
    .catch((error) => console.log(`error`, error));

  return exacts;
};
const getNearResults = async (departureCity, destinationCity, departureCountry, departureDate) => {
  var nearResults = [];
  const q = query(
    collection(db, "flights"),
    where("departure.name", "==", departureCity),
    where("departure.country", "==", departureCountry)
  );
  await getDocs(q)
    .then((snap) => {
      snap.docs.forEach(
        (doc) =>
          doc.data().departure.name != departureCity &&
          nearResults.push({ ...doc.data(), id: doc.id })
      );
    })
    .catch((error) => console.log(`error`, error));

  return nearResults;
};

/*
  user details
*/

export const UpdateUserDetails = async (firstName, lastName, email, address) => {
  const docRef = doc(db, "users/" + email);

  await updateDoc(docRef, { firstName, lastName, address }).catch((error) =>
    console.log(`error`, error)
  );
};

export async function savePhotoUrl(photoUrl, email) {
  const docRef = doc(db, "users", email);

  await updateDoc(docRef, { photoUrl });
}

/**
 * Reservations
 */

export const getUserReservations = async (id) => {
  const q = query(collection(db, "reservations"), where("owner", "==", id));
  var reservations = [];
  await getDocs(q)
    .then((datas) => {
      if (datas.size > 0) {
        datas.forEach((data) => reservations.push({ ...data.data(), id: data.id }));
      }
    })
    .catch((error) => console.log(`error while retrieving reservations`, error));
  return reservations;
};
export const getGPReservations = async (id) => {
  const q = query(collection(db, "reservations"), where("gpId", "==", id));
  var reservations = [];
  await getDocs(q)
    .then((datas) => {
      if (datas.size > 0) {
        datas.forEach((data) => reservations.push({ ...data.data(), id: data.id }));
      }
    })
    .catch((error) => console.log(`error while retrieving reservations`, error));
  return reservations;
};

export const postUserReservation = async (sender, reciever, flight, reservationInfo, owner) => {
  const docRef = collection(db, "reservations");
  const reservation = {
    sender,
    reciever,
    flightId: flight.id,
    gpId: flight.ownerId,
    itemDescription: reservationInfo.itemDescription,
    payer: reservationInfo.payer,
    itemType: reservationInfo.itemType,
    owner,
    departure: flight.departure,
    destination: flight.destination,
    publisher: flight.publisher,
    distributionDate: flight.distributionDate,
    status: "pending",
    reservationDate: new Date().toJSON(),
    shipping: flight.destination.name === "Dakar" ? true : false,
  };
  var next = false;
  await addDoc(docRef, reservation)
    .then(() => (next = true))
    .catch(() => console.log("Erreur lors de la reservation"));
  return next;
};

export const changeReservationStatus = async (id, status) => {
  const docRef = doc(db, "reservations", id);

  await updateDoc(docRef, { status: status });
};

/**
 * flights
 */
export const getFeaturedFlight = async () => {
  const q = query(collection(db, "flights"), orderBy("createdAt"), limit(5));
  var results = [];
  await getDocs(q).then((datas) => datas.forEach((data) => results.push(data.data())));
  return results;
};
export const getUserRecentFlights = async (userId) => {
  let flights = [];
  const q = query(
    collection(db, "flights"),
    // where("departureDate", ">=", Timestamp.fromDate(new Date())),
    where("ownerId", "==", userId)
  );
  await getDocs(q).then((data) => {
    data.docs.forEach(
      (doc) =>
        moment(doc.data().departureDate).isAfter(moment()) &&
        flights.push({ ...doc.data(), id: doc.id })
    );
  });
  return flights;
};
