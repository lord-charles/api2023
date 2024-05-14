const router = require("express").Router();
const { createVouchers } = require("../controller/bulkVouchers");

router.post("/", createVouchers);

module.exports = router;
