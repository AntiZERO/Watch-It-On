const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movieController");

router.get("/movies/upcoming", movieController.display);

module.exports = router;