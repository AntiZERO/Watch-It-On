//Date Utility Functions BEGIN
function findSunday() {
  let currentDate = new Date();
  let currentDay = currentDate.getDay();
  let findPrevSunday = new Date();

  findPrevSunday.setDate(findPrevSunday.getDate() - currentDay);

  let date = findPrevSunday.getDate();
  let day = findPrevSunday.getDay();
  let month = findPrevSunday.getMonth();
  month++; //increment month to account for zero-index
  let year = findPrevSunday.getFullYear();

  if (date.toString().length <= 1) {  // prepend with 0 for single digit dates.
    date = '0' + date;
  }

  if (month.toString().length <= 1) { // prepend with 0 for single digit months.
    month = '0' + month;
  }

  return year + '-' + month + '-' + date;

}

function findSaturday() {
  let currentDate = new Date();
  let currentDay = currentDate.getDay();
  let findNextSat = new Date();

  findNextSat.setDate(findNextSat.getDate() + currentDay);

  let date = findNextSat.getDate();
  let day = findNextSat.getDay();
  let month = findNextSat.getMonth();
  month++; //increment month to account for zero-index
  let year = findNextSat.getFullYear();

  if (date.toString().length <= 1) {  // prepend with 0 for single digit dates.
    date = '0' + date;
  }

  if (month.toString().length <= 1) { // prepend with 0 for single digit months.
    month = '0' + month;
  }

  return year + '-' + month + '-' + date;

}
//Utility Function END

const request = require("request");
const upcomingReleases = {
  method: 'GET',
  url: 'https://api.themoviedb.org/3/discover/movie',
  qs:
  {
    with_original_language: 'en',
    with_release_type: '5|4',
    'release_date.lte': findSaturday(), 
    'release_date.gte': findSunday(), 
    include_video: 'false',
    include_adult: 'false',
    sort_by: 'release_date.asc',
    region: 'US',
    language: 'en-US',
    api_key: process.env.tmdbAPI
  },
  body: '{}'
};
const genreIds = {
  method: 'GET',
  url: 'https://api.themoviedb.org/3/genre/movie/list',
  qs:
  {
    language: 'en-US',
    api_key: process.env.tmdbAPI
  },
  body: '{}'
};


request(upcomingReleases, function (error, response, body) {
  if (error) throw new Error(error);
  movieObj = JSON.parse(body);
  movies = movieObj.results;
});

request(genreIds, function (error, response, body) {
  if (error) throw new Error(error);
  genreObj = JSON.parse(body);
  genres = genreObj.genres;

});