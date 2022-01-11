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

export function postAflight() {}
