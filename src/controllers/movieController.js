const movieQueries = require("../db/queries.movies.js");


module.exports = {

  display(req, res, next) {
    res.render("movies/upcoming", {title: "Watch it On TV - Upcoming Home Releases"});
  },


}