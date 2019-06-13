const tvQueries = require("../db/queries.tv.js");


module.exports = {

  display(req, res, next) {
    res.render("tv/new_tv", {title: "Watch it On TV - New TV This Week"});
  },


}