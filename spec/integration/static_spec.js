const request = require("request");
const server = require("../../src/server.js");
const base = "http://localhost:3000/";


describe("routes: static", () => {
    
  describe("GET /", () => {

    it("should return status code 200", (done) => {
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(res.body).toBe("Test Controller Routing (Static) Succeeded");
        console.log(res.body + " Line 14 = spec/integration/static_spec.js");
        done();
      });
    });

  });

})
