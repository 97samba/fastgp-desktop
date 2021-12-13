import { app } from "./config";
import { getFirestore, collection, getDocs, query } from "firebase/firestore";

export const db = getFirestore(app);

export const getAllUsers = async () => {
  const q = query(collection(db, "users"));
  var users = [];
  await getDocs(q).then((data) => {
    data.docs.forEach((doc) => doc.data().role === "GP" && users.push(doc.data()));
  });
  return users;
};
