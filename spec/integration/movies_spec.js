const request = require("request");
const server = require("../../src/server.js");
const base = "http://localhost:3000/movies/";


describe("routes: movies", () => {
    
  describe("GET /movies/upcoming", () => {

    it("should return status code 200", (done) => {
      request.get(`${base}/upcoming`, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        done();
      });
    });

  });

})