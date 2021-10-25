const functions = require("firebase-functions");

const express = require("express");

const cors = require("cors");

const app = express();

app.use(cors());

app.use(require("./routes/FlightsRoute"));

app.use(require("./routes/AuthRoute"));

exports.api = functions.https.onRequest(app);
