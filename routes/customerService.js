const router = require("express").Router();
const { tidioCs } = require("../controller/customerService");

router.get("/tidio", tidioCs);

module.exports = router;
