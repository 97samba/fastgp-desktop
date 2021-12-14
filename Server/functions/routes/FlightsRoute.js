const router = require("express").Router();
const {
  GetAllFlights,
  GetSomeFlights,
  PostAFlight,
  DeleteAFlight,
  EditAFlight,
} = require("../APIs/Flight");

router.get("/GetAllFlights", GetAllFlights);

router.get("/GetSomeFlights", GetSomeFlights);

router.post("/PostAFlight", PostAFlight);

router.delete("/DeleteAFlight", DeleteAFlight);

router.put("/EditAFlight", EditAFlight);

module.exports = router;
