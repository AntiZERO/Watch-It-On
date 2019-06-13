const request = require("request");
const server = require("../../src/server.js");
const base = "http://localhost:3000/tv/";


describe("routes: tv", () => {

  describe("GET /tv/new_tv", () => {

    beforeEach(function (done) {
      setTimeout(done, 500);
    });

    it("should return status code 200", (done) => {
      request.get(`${base}new_tv`, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        done();
      });
    });

  });

})