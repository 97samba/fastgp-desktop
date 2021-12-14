import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  fetchSignInMethodsForEmail,
  updatePhoneNumber,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { getDoc, doc, setDoc } from "firebase/firestore";
import { db } from "./db";
import { app } from "./config";

export const auth = getAuth(app);

export const login = async (email, password) => {
  await signInWithEmailAndPassword(auth, email, password).catch((error) =>
    console.log(`error`, error)
  );
};

export const register = async (state) => {
  const document = getDoc(doc(db, "users", state.email));

  var user = undefined;

  await document.then(async (doc) => {
    if (doc.exists()) {
      throw "erreur utilisateur existe";
    } else {
      await createUserWithEmailAndPassword(auth, state.email, state.password1)
        .then((user_) => {
          user = user_;
        })
        .catch((error) => console.log(`error`, error));
    }
  });
  user &&
    (await updateProfile(user.user, {
      displayName:
        state.firstName.charAt(0).toUpperCase() + state.firstName.slice(1) + " " + state.lastName,
    }));

  const credentials = {
    firstName: state.firstName.charAt(0).toUpperCase() + state.firstName.slice(1),
    lastName: state.lastName,
    email: state.email,
    phone: state.phone,
    country: state.country,
    sex: state.sex,
    birthday: state.birthday.toJSON(),
    followers: [],
    flights: [],
    packages: [],
    reviews: [],
    role: "client",
    createdAt: new Date().toISOString(),
    userId: user.user.uid,
  };

  setDoc(doc(db, "users", state.email), credentials).then((data) => console.log(`data`, data));
};

export const registerGP = async (state, identityUrl) => {
  const document = getDoc(doc(db, "users", state.email));

  var user = undefined;

  await document.then(async (doc) => {
    if (doc.exists()) {
      throw "erreur utilisateur existe";
    } else {
      await createUserWithEmailAndPassword(auth, state.email, state.password1)
        .then((user_) => {
          user = user_;
        })
        .catch((error) => console.log(`error`, error));
    }
  });
  user &&
    (await updateProfile(user.user, {
      displayName:
        state.firstName.charAt(0).toUpperCase() + state.firstName.slice(1) + " " + state.lastName,
    }));

  const credentials = {
    firstName: state.firstName.charAt(0).toUpperCase() + state.firstName.slice(1),
    lastName: state.lastName,
    email: state.email,
    phone: state.phone,
    country: state.country,
    sex: state.sex,
    birthday: state.birthday.toJSON(),
    followers: [],
    flights: [],
    packages: [],
    reviews: [],
    reservations: [],
    role: "GP",
    identityUrl,
    documentIdentity: state.documentIdentity,
    whatsapp1: state.whatsapp1,
    identityNumber: state.identityNumber,
    phone2: state?.phone2,
    whatsapp2: state.whatsapp2,
    createdAt: new Date().toISOString(),
    userId: user.user.uid,
  };

  await setDoc(doc(db, "users", state.email), credentials);
};

export const logout = () => {
  signOut(auth).catch((error) => console.log(`error`, error));
};

export async function verifyIfUserExists(email) {
  var exists = false;
  await fetchSignInMethodsForEmail(auth, email)
    .then((methods) => (exists = methods.length > 0))
    .catch((error) => {
      throw "erreur lors de la verification";
    });
  console.log(
    `exists
      `,
    exists
  );

  return exists;
}

export function useAuth() {
  const [currentUser, setCurrentUser] = useState(undefined);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => setCurrentUser(user));

    return unsubscribe;
  }, []);

  return currentUser;
}
