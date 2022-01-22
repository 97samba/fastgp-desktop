import { app } from "./config";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
  doc,
  deleteDoc,
  where,
  addDoc,
  updateDoc,
  arrayUnion,
  limit,
} from "firebase/firestore";

export const db = getFirestore(app);

export const getAllUsers = async () => {
  const q = query(collection(db, "users"));
  var users = [];
  await getDocs(q).then((data) => {
    data.docs.forEach((doc) => doc.data().role === "GP" && users.push(doc.data()));
  });
  return users;
};

export async function getAllFlights() {
  const q = query(collection(db, "flights"), orderBy("createdAt"));
  var flights = [];
  await getDocs(q).then((datas) =>
    datas.docs.forEach((doc) => flights.push({ ...doc.data(), id: doc.id }))
  );
  return flights;
}

export async function removeAFlight(id) {
  const docRef = doc(db, "flights", id);

  await deleteDoc(docRef);
}

export async function getAllReservations() {
  const q = query(collection(db, "reservations"), where("shipping", "==", true));

  var reservations = [];
  await getDocs(q).then((datas) =>
    datas.docs.forEach((doc) => reservations.push({ ...doc.data(), id: doc.id }))
  );
  return reservations;
}

export const getUserFlights = async (userId) => {
  let flights = [];
  const q = query(
    collection(db, "flights"),
    where("ownerId", "==", userId),
    limit(5)
    // orderBy("createdAt", "asc")
  );
  await getDocs(q).then((data) => {
    data.docs.forEach((doc) => flights.push({ ...doc.data(), id: doc.id }));
  });
  return flights;
};

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

export const postAflight = async (flight, email) => {
  var newFlightId = "";
  await addDoc(collection(db, "flights"), flight)
    .then(async (data) => {
      await updateDoc(doc(db, "users", email), { flights: arrayUnion(data.id) }).catch((error) =>
        console.log("erreur lors de l'ajout de l'id du vol", error)
      );
      newFlightId = data.id;
    })
    .then(() => console.log("ajout avec succes"))
    .catch((error) => console.log(`erreur creation post`, error));
  return newFlightId;
};
