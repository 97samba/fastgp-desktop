const { db, admin } = require("../utils/admin");
const config = require("../utils/config");

const app = require("firebase/app");

const auth = require("firebase/auth");
const { async } = require("@firebase/util");

app.initializeApp(config);

exports.LoginUser = async (request, response) => {
  auth

    .signInWithEmailAndPassword(auth.getAuth(), request.body.email, request.body.password)
    .then((data) => {
      return data.user.getIdToken();
    })
    .then((token) => {
      return response.json({ token });
    })
    .catch((error) => {
      console.error("erreur authentification", error);
      return response.status(403).json("bad credentials, please try again");
    });
};

exports.SignUpUser = async (request, response) => {
  const newUser = request.body;
  var token, userId;
  db.doc(`/users/${newUser.email}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return response.status(401).json("L'utilisateur existe déja");
      } else {
        auth
          .createUserWithEmailAndPassword(auth.getAuth(), newUser.email, newUser.password1)
          .then((data) => {
            userId = data.user.uid;
            return data.user.getIdToken();
          })
          .then((tokenId) => {
            token = tokenId;
            const credentials = {
              firstName: newUser.firstName.charAt(0).toUpperCase() + newUser.firstName.slice(1),
              lastName: newUser.lastName,
              email: newUser.email,
              phone: newUser.phone,
              country: newUser.country,
              sex: newUser.sex,
              birthday: newUser.birthday,
              followers: [],
              flights: [],
              packages: [],
              createdAt: new Date().toISOString(),
              userId,
            };
            return db.doc(`/users/${newUser.email}`).set(credentials);
          })
          .then(() => response.status(201).json({ token }))
          .catch((err) => {
            console.log(`error`, err);
            if (err.code === "auth/email-already-in-use") {
              return response.status(400).json("Email already in use");
            } else {
              return response.status(500).json("Something went wrong, please try again");
            }
          });
      }
    })
    .catch((error) => response.status(500).json("Something went wrong, please try again"));
};

exports.GetUserDetails = async (request, response) => {
  db.collection("users")
    .where("userId", "==", request.user.uid)
    .limit(1)
    .get()
    .then((data) => {
      if (data.size < 1) {
        return response.status(403).json("Forbiden");
      }
      const user = data.docs[0].data();
      return response.json({ user: user });
    })
    .catch((error) => {
      return response.status(500).json("server error");
    });
};
