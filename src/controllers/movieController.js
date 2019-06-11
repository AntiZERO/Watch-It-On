const request = require("request");

const apiQuery = { method: 'GET',
  url: 'https://api.themoviedb.org/3/discover/movie',
  qs: 
   { with_original_language: 'en',
     with_release_type: '5|4',
     'release_date.lte': '2019-06-16', // SUNDAY EACH WEEK
     'release_date.gte': '2019-06-10', // FOLLOWING SATURDAY EACH WEEK
     include_video: 'false',
     include_adult: 'false',
     sort_by: 'release_date.desc',
     region: 'US',
     language: 'en-US',
     api_key: '511cd9bf6e8de2ba8ec1cd641f6ed7ab' },
  body: '{}' };

request(apiQuery, function (error, response, body) {
  if (error) throw new Error(error);
  dataObj = JSON.parse(body);
});



module.exports = {

  display(req, res, next) {
    res.render("movies/upcoming", {title: "Watch it On TV - Upcoming Home Releases"});
    console.log("Display Here");
  },


}