const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/users/";
const User = require("../../src/db/models").User;
const sequelize = require("../../src/db/models/index").sequelize;

describe("routes : users", () => {
  beforeEach(done => {
    sequelize
      .sync({ force: true })
      .then(() => {
        done();
      })
      .catch(err => {
        console.log(err);
        done();
      });
  });

  describe("GET /users/sign_up", () => {
    it("should render a view with a sign up form", done => {
      request.get(`${base}sign_up`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("Sign up");
        done();
      });
    });
  });

  describe("GET /users/sign_in", () => {
    it("should render a view with a sign in form", done => {
      request.get(`${base}sign_in`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("Sign In");
        done();
      });
    });
  });

  describe("POST /users", () => {
    it("should create a new user with valid values and redirect", done => {
      const options = {
        url: base,
        form: {
          firstName: "Clark",
          lastName: "Kent",
          email: "ckent@dailyplanet.com",
          password: "123456789"
        }
      };
      request.post(options, (err, res, body) => {
        User.findOne({ where: { email: "ckent@dailyplanet.com" } })
          .then(user => {
            expect(user.firstName).toBe("Clark");
            expect(user.lastName).toBe("Kent");
            expect(user.email).toBe("ckent@dailyplanet.com");
            expect(user.id).toBe(1);
            done();
          })
          .catch(err => {
            console.log(err);
            done();
          });
      });
    });

    it("should not create a new user with invalid email and redirect", done => {
      request.post(
        {
          url: base,
          form: {
            firstName: "Clark",
            lastName: "Kent",
            email: "not_an_email",
            password: "123456789"
          }
        },
        (err, res, body) => {
          User.findOne({ where: { email: "not_an_email" } })
            .then(user => {
              expect(user).toBeNull();
              done();
            })
            .catch(err => {
              console.log(err);
              done();
            });
        }
      );
    });
  });

  it("should not create a new user with invalid password and redirect", done => {
    request.post(
      {
        url: base,
        form: {
          firstName: "Clark",
          lastName: "Kent",
          email: "ckent@dailyplanet.com",
          password: ""
        }
      },
      (err, res, body) => {
        User.findOne({ where: { password: "" } })
          .then(user => {
            expect(user).toBeNull();
            done();
          })
          .catch(err => {
            console.log(err);
            done();
          });
      }
    );
  });

  it("should not create a new user with invalid firstName and redirect", done => {
    request.post(
      {
        url: base,
        form: {
          firstName: "",
          lastName: "Kent",
          email: "ckent@dailyplanet.com",
          password: "123456789"
        }
      },
      (err, res, body) => {
        User.findOne({ where: { firstName: "" } })
          .then(user => {
            expect(user).toBeNull();
            done();
          })
          .catch(err => {
            console.log(err);
            done();
          });
      }
    );
  });

  it("should not create a new user with invalid lastName and redirect", done => {
    request.post(
      {
        url: base,
        form: {
          firstName: "Clark",
          lastName: "",
          email: "ckent@dailyplanet.com",
          password: "123456789"
        }
      },
      (err, res, body) => {
        User.findOne({ where: { lastName: "" } })
          .then(user => {
            expect(user).toBeNull();
            done();
          })
          .catch(err => {
            console.log(err);
            done();
          });
      }
    );
  });

});
