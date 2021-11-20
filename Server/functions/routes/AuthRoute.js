const router = require("express").Router();

const { LoginUser, SignUpUser, GetUserDetails } = require("../APIs/users");
const auth = require("../utils/auth");

router.post("/login", LoginUser);
router.post("/register", SignUpUser);
router.get("/userDetails", auth, GetUserDetails);

module.exports = router;
