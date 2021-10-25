const router = require("express").Router();
const { GetAllFlights, PostAFlight, DeleteAFlight, EditAFlight } = require("../APIs/Flight");

router.get("/GetAllFlights", GetAllFlights);

router.post("/PostAFlight", PostAFlight);

router.delete("/DeleteAFlight", DeleteAFlight);

router.put("/EditAFlight", EditAFlight);

module.exports = router;
