const { db } = require("../utils/admin");

exports.GetAllFlights = (request, response) => {
  db.collection("flights")
    .get()
    .then((data) => {
      let results = [];
      data.forEach((doc) => results.push(doc.data()));
      return response.json(results);
    })
    .catch((err) => {
      console.log(`error`, err);
      return response.status(500).json({ error: err });
    });
};

exports.PostAFlight = (request, response) => {
  response.send("adding flight");
};
exports.DeleteAFlight = (request, response) => {
  response.json({ message: "deleting a flight" });
};
exports.EditAFlight = (request, response) => {
  response.json({ message: "editing a flight" });
};
