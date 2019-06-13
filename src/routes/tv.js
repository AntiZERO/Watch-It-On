const express = require("express");
const router = express.Router();
const tvController = require("../controllers/tvController");

router.get("/tv/new_tv", tvController.display);

module.exports = router;