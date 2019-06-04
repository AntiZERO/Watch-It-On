const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/users/";
const User = require("../../src/db/models").User;
const sequelize = require("../../src/db/models/index").sequelize;

describe("routes : users", () => {

  beforeEach((done) => {

    sequelize.sync({force: true})
    .then(() => {
      done();
    })
    .catch((err) => {
      console.log(err);
      done();
    });

  });

  describe("GET /users/sign_up", () => {

    it("should render a view with a sign up form", (done) => {
      request.get(`${base}sign_up`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("Sign up");
        done();
      });
    });

  });

  describe("POST /users", () => {

        it("should create a new user with valid values and redirect", (done) => {
          const options = {
            url: base,
            form: {
              firstName: "Clark",
              lastName: "Kent",
              email: "ckent@example.com",
              password: "123456789"
            }
          }
          request.post(options,
            (err, res, body) => {
              User.findOne({where: {email: "ckent@example.com"}})
              .then((user) => {
                console.log(user.firstName);
                expect(user.firstName).toBe("Clark")
                expect(user.lastName).toBe("Kent")
                expect(user.email).toBe("ckent@example.com");
                expect(user.id).toBe(1);
                done();
              })
              .catch((err) => {
                console.log(err);
                done();
              });
            }
          );
        });
    
        it("should not create a new user with invalid attributes and redirect", (done) => {
          request.post(
            {
              url: base,
              form: {
                firstName: "Clark",
                lastName: "Kent",
                email: "no",
                password: "123456789"
              }
            },
            (err, res, body) => {
              User.findOne({where: {email: "no"}})
              .then((user) => {
                expect(user).toBeNull();
                done();
              })
              .catch((err) => {
                console.log(err);
                done();
              });
            }
          );
        });
    
      });

});