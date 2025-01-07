const express = require("express");
const router = express.Router();
const entries = require("../controllers/entries.controller");

router.get("/", entries.get);
router.post("/", entries.create);

module.exports = router;
