const { db, admin } = require("../utils/admin");
const config = require("../utils/config");

const app = require("firebase/app");

const auth = require("firebase/auth");

app.initializeApp(config);

exports.LoginUser = async (request, response) => {
  auth
    .signInWithEmailAndPassword(auth.getAuth(), request.body.login, "testtest")
    .then((data) => {
      return data.user.getIdToken();
    })
    .then((token) => {
      return response.json({ token });
    })
    .catch((error) => {
      console.error("erreur authentification", error);
      return response.status(403).json({ general: "bad credentials, please try again" });
    });
};

exports.SignUpUser = (request, response) => {
  // auth.createUserWithEmailAndPassword()
};
