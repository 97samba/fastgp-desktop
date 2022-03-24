// Import the functions you need from the SDKs you need
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
  startAfter,
  setDoc,
} from "firebase/firestore";
import moment from "moment";
import { app } from "./config";

export const db = getFirestore(app);

export const getAFlight = async (id) => {
  var flight;
  await getDoc(doc(db, "flights", id)).then(
    (data) => (flight = { ...data.data(), id: data.id })
  );
  return flight;
};

export const postAflight = async (flight, email) => {
  var newFlightId = "";
  await addDoc(collection(db, "flights"), flight)
    .then(async (data) => {
      await updateDoc(doc(db, "users", email), {
        flights: arrayUnion(data.id),
      }).catch((error) =>
        console.log("erreur lors de l'ajout de l'id du vol", error)
      );
      newFlightId = data.id;
    })
    .then(() => console.log("ajout avec succes"))
    .catch((error) => console.log(`erreur creation post`, error));
  return newFlightId;
};

export const updateAFlight = async (flight, id) => {
  const docRef = doc(db, "flights", id);
  console.log("editing ", id);
  let error = false;

  await updateDoc(docRef, flight)
    .then(() => console.log("done"))
    .catch(() => (error = true));
  return error;
};

export const deleteOneFlight = async (id, email) => {
  const flightRef = await doc(db, "/flights/" + id);
  let error = false;
  await updateDoc(flightRef, { deleted: true })
    .catch((err) => (error = true))
    .then(async () => {
      console.log("ownerId :>> ", email);
      const userRef = await doc(db, "/users/" + email);
      await updateDoc(userRef, { flights: arrayRemove(id) }).catch(
        (err) => (error = true) && console.log(err)
      );
    });
  return error;
};
/**
 * permet à un user authentifié de suivre un GP
 * @param {string} emailGP
 * @param {string} followerId ID de la personne qui suit le GP
 * @returns {boolean} followed
 */
export async function FollowGP(emailGP, followerId) {
  const ref = doc(db, "users", emailGP);
  var followed = false;
  await updateDoc(ref, {
    followers: arrayUnion(followerId),
  })
    .then(() => (followed = true))
    .then(() => console.log("follow done"))
    .catch(() => console.log("erreur lors de l'abonnement"));
  return followed;
}
/**
 * Permet supprime un GP de la liste des followers
 * @param {String} email
 * @param {String} followerId
 * @returns
 */
export async function UnFollowGP(email, followerId) {
  const ref = doc(db, "users", email);
  var unfollowed = false;
  await updateDoc(ref, {
    followers: arrayRemove(followerId),
  })
    .then(() => (unfollowed = true))
    .then(() => console.log("unfollow done"))
    .catch(() => console.log("erreur lors de l'abonnement"));
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
export const getUserFlights = async (userId, limitiation) => {
  let flights = [];
  limitiation === 5 ? (limitiation = 5) : (limitiation = 100);
  const q = query(
    collection(db, "flights"),
    // where("deleted", "not-in", [true]),
    where("ownerId", "==", userId),
    orderBy("departureDate", "desc"),
    limit(limitiation)
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

export async function queryNextFlights(departure, destination, date, lastDoc) {
  console.log("lastDoc.id :>> ", lastDoc.id);

  const nextDocuments = [];

  const lastSnapshotRef = await doc(db, "flights/" + lastDoc.id);

  let lastSnapshot = await getDoc(lastSnapshotRef);

  const q = query(
    collection(db, "flights"),
    where("departure.name", "==", departure),
    where("destination.name", "==", destination),
    where("departureDate", ">=", date),
    orderBy("departureDate", "asc"),
    startAfter(lastSnapshot),
    limit(10)
  );

  await getDocs(q).then((datas) =>
    datas.docs.forEach((doc) => {
      nextDocuments.push({ ...doc.data(), id: doc.id });
    })
  );

  console.log("nextDocuments.length :>> ", nextDocuments.length);
  return nextDocuments;
}

export async function QueryFlights(departure, destination, date) {
  var exactResults = await getExactResults(
    departure.name,
    destination.name,
    date
  );
  var transitFlights = [];

  if (exactResults.length === 0) {
    console.log("fetching transit");
    transitFlights = await SearchForTransit(departure, destination, date);
  }

  // console.log(`exactResults`, exactResults.length);
  return { exact: exactResults, transit: transitFlights };
}
const getExactResults = async (
  departureCity,
  destinationCity,
  departureDate
) => {
  var exacts = [];
  const q = query(
    collection(db, "flights"),
    where("departure.name", "==", departureCity),
    where("destination.name", "==", destinationCity),
    where("departureDate", ">=", departureDate),
    orderBy("departureDate", "asc"),
    limit(10)
  );
  await getDocs(q)
    .then((snap) => {
      snap.docs.forEach((doc) => exacts.push({ ...doc.data(), id: doc.id }));
    })
    .catch((error) => console.log(`error`, error));

  return exacts;
};
const getNearResults = async (
  departureCity,
  destinationCity,
  departureCountry,
  departureDate
) => {
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
/**
 * Transit
 */

const SearchForTransit = async (departure, destination, date) => {
  let results1 = [];
  let results2 = [];
  let transitFlights = [];

  const query1 = query(
    collection(db, "flights"),
    where("departure.name", "==", departure.name),
    where("destination.name", "==", "Dakar"),
    where("departureDate", ">=", date),
    orderBy("departureDate", "asc"),
    limit(20)
  );
  // where("destination.name", "in", ["Dakar", "Paris"]),
  await getDocs(query1).then((datas) =>
    datas.docs.forEach((doc) => results1.push({ ...doc.data(), id: doc.id }))
  );

  console.log("resultats ", departure.name, " :>> ", "Dakar", results1.length);

  if (results1.length === 0) {
    return transitFlights;
  }

  //la plus date minimum
  let minimalDate = results1[0]?.departureDate;

  console.log("minimalDate :>> ", minimalDate);

  const query2 = query(
    collection(db, "flights"),
    where("departure.name", "==", "Dakar"),
    where("destination.name", "==", destination.name),
    where("distributionDate", ">=", minimalDate),
    orderBy("distributionDate", "asc"),
    limit(20)
  );

  await getDocs(query2).then((datas) =>
    datas.docs.forEach((doc) => results2.push({ ...doc.data(), id: doc.id }))
  );

  console.log(
    "resultats 2:>> ",
    "Dakar",
    " :>> ",
    destination.name,
    results2.length
  );

  //Comparaison des dates
  results2.forEach((result2) => {
    results1.forEach((result1) => {
      let delay = Math.abs(
        moment(result2.departureDate).diff(
          moment(result1.departureDate),
          "days"
        )
      );
      if (delay <= 10 && delay > 0) {
        console.log("One transit found");

        transitFlights.push({ first: result1, second: result2 });
      }
    });
  });

  return transitFlights;
};

/*
  user details
*/

export const UpdateUserDetails = async (
  firstName,
  lastName,
  email,
  address
) => {
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
        datas.forEach((data) =>
          reservations.push({ ...data.data(), id: data.id })
        );
      }
    })
    .catch((error) =>
      console.log(`error while retrieving reservations`, error)
    );
  return reservations;
};
export const getGPReservations = async (id) => {
  const q = query(collection(db, "reservations"), where("gpId", "==", id));
  var reservations = [];
  await getDocs(q)
    .then((datas) => {
      if (datas.size > 0) {
        datas.forEach((data) =>
          reservations.push({ ...data.data(), id: data.id })
        );
      }
    })
    .catch((error) =>
      console.log(`error while retrieving reservations`, error)
    );
  return reservations;
};

export const postUserReservation = async (
  sender,
  reciever,
  flight,
  reservationInfo,
  owner
) => {
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
  console.log("after docref ", reservation, "state ", reservationInfo);

  var next = false;
  await addDoc(docRef, reservation)
    .then(() => (next = true))
    .then(() => console.log("reservation done"))
    .catch(() => console.log("Erreur lors de la reservation"));

  console.log("after addDoc");

  return next;
};

export const changeReservationStatus = async (id, status, email) => {
  const docRef = doc(db, "reservations", id);

  await updateDoc(docRef, { status: status }).then(() => {
    if (status === "ok") {
      const docRef = doc(db, "users", email);
      updateDoc(docRef, { reservations: arrayUnion(id) });
    }
  });
};

/**
 * flights
 */
export const getFeaturedFlight = async () => {
  const q = query(
    collection(db, "flights"),
    where("departureDate", ">=", new Date().toJSON()),
    orderBy("departureDate", "asc"),
    limit(5)
  );
  var results = [];
  await getDocs(q).then((datas) =>
    datas.forEach((data) => results.push(data.data()))
  );
  return results;
};
export const getUserRecentFlights = async (userId) => {
  let flights = [];
  const q = query(
    collection(db, "flights"),
    // where("departureDate", ">=", Timestamp.fromDate(new Date())),
    where("ownerId", "==", userId),
    orderBy("departureDate", "asc")
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
