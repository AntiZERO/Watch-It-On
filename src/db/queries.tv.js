const request = require("request");
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

const newTv =  { method: 'GET',
url: 'https://api.themoviedb.org/3/discover/tv',
qs: 
 { with_original_language: 'en',
   include_null_first_air_dates: 'false',
   timezone: 'America/New_York',
   page: '1',
   'first_air_date.lte': findSaturday(),
   'first_air_date.gte': findSunday(),
   sort_by: 'first_air_date.asc',
   language: 'en-US',
   api_key: process.env.tmdbAPI },
body: '{}' };

const genreIds = { method: 'GET',
url: 'https://api.themoviedb.org/3/genre/tv/list',
qs: 
 { language: 'en-US',
   api_key: '511cd9bf6e8de2ba8ec1cd641f6ed7ab' },
body: '{}' };


request(newTv, function (error, response, body) {
  if (error) throw new Error(error);
  tvObj = JSON.parse(body);
  tv = tvObj.results;
});

request(genreIds, function (error, response, body) {
  if (error) throw new Error(error);
  genreObj = JSON.parse(body);

  genres = genreObj.genres;

});