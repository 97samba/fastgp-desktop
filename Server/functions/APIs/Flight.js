const { db } = require("../utils/admin");

exports.GetAllFlights = (request, response) => {
  db.collection("flights")
    .where("version", "==", "2.0")
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
exports.GetSomeFlights = async (request, response) => {
  var departureCity = request.query.depart;
  var departureCountry = request.query.pays;
  var destinationCity = request.query.destination;
  var departureDate = request.query.date;

  var exactResults = await getExactResults(departureCity, destinationCity, departureDate);
  var nearResults = await getNearResults(
    departureCity,
    destinationCity,
    departureCountry,
    departureDate
  );

  console.log(`exactResults`, exactResults.length);
  console.log(`nearResults`, nearResults.length);
  return response.json({ exact: exactResults, near: nearResults });
};

const getExactResults = async (departureCity, destinationCity, departureDate) => {
  var exacts = [];
  await db
    .collection("flights")
    .where("departure.name", "==", departureCity)
    .where("destination.name", "==", destinationCity)
    .where("departureDate", ">=", departureDate)
    .get()
    .then((datas) => datas.forEach((data) => exacts.push(data.data())));
  console.log("finish exact");
  return exacts;
};
const getNearResults = async (departureCity, destinationCity, departureCountry, departureDate) => {
  var nearResults = [];

  await db
    .collection("flights")
    .where("destination.name", "==", destinationCity)
    .where("departure.country", "==", departureCountry)
    // .where("departureDate", ">=", departureDate)
    .get()
    .then((docs) =>
      docs.forEach(
        (doc) => doc.data().departure.name != departureCity && nearResults.push(doc.data())
      )
    );
  return nearResults;
};

exports.PostAFlight = (request, response) => {
  var flight = request.body;
  console.log("Adding flight");
  db.collection("flights")
    .add(flight)
    .then((doc) => {
      console.log("flight added");
      response.send("done");
    })
    .catch((err) => {
      console.log("error while adding flight", err);
      response.status(500).json({ error: "error while adding flight" });
    });
};
exports.DeleteAFlight = (request, response) => {
  response.json({ message: "deleting a flight" });
};
exports.EditAFlight = (request, response) => {
  response.json({ message: "editing a flight" });
};
