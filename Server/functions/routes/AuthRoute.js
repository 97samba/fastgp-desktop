const router = require("express").Router();

const { LoginUser, SignUpUser } = require("../APIs/users");

router.post("/login", LoginUser);
router.post("/signUp", SignUpUser);

module.exports = router;
