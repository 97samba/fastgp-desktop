import { auth } from "../firebase/config";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

export async function logAUser(email, password) {
  var done = false;
  await signInWithEmailAndPassword(auth, email, password)
    .then(() => (done = true))
    .catch(() => console.log("erreur"));
  return done;
}

export async function logoutUser() {
  await signOut(auth);
}
