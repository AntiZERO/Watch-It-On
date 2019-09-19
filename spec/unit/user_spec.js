const sequelize = require("../../src/db/models/index").sequelize;
const User = require("../../src/db/models").User;

describe("User", () => {

  beforeEach((done) => {
    sequelize.sync({force: true})
    .then(() => {
      done();
    })
    .catch((err) => {
      done();
    });

  });

  describe("#create()", () => {

    it("should create a User object with a valid email and password", (done) => {
      User.create({
        firstName: "Clark",
        lastName: "Kent",
        email: "ckent@dailyplanet.com",
        password: "1234567890"
      })
      .then((user) => {
        expect(user.email).toBe("ckent@dailyplanet.com");
        expect(user.id).toBe(1);
        done();
      })
      .catch((err) => {
        done();
      });
    });

    it("should not create a user with invalid email", (done) => {
      User.create({
        firstName: "Clark",
        lastName: "Kent",
        email: "This is not an email",
        password: "1234567890"
      })
      .then((user) => {
        done();
      })
      .catch((err) => {
        expect(err.message).toContain("Validation error: Must be a valid email");
        done();
      });
    });

    it("should not create a user with invalid password", (done) => {
      User.create({
        firstName: "Clark",
        lastName: "Kent",
        email: "ckent@dailyplanet.com",
        password: ""
      })
      .then((user) => {
        done();
      })
      .catch((err) => {
        expect(err.message).toContain("Validation error: Password cannot be empty");
        done();
      });
    });

    it("should not create a user with a null firstName", (done) => {
      User.create({
        firstName: null,
        lastName: "Kent",
        email: "ckent@dailyplanet.com",
        password: "1234567890"
      })
      .then((user) => {
        done();
      })
      .catch((err) => {
        expect(err.message).toContain("User.firstName cannot be null");
        done();
      });
    });

    it("should not create a user with a null lastName", (done) => {
      User.create({
        firstName: "Clark",
        lastName: null,
        email: "ckent@dailyplanet.com",
        password: "1234567890"
      })
      .then((user) => {
        done();
      })
      .catch((err) => {
        expect(err.message).toContain("User.lastName cannot be null");
        done();
      });
    });


    it("should not create a user with an email already taken", (done) => {

      User.create({
        firstName: "Clark",
        lastName: "Kent",
        email: "ckent@dailyplanet.com",
        password: "1234567890"
      })
      .then((user) => {

        User.create({
          firstName: "Lois",
          lastName: "Lane",
          email: "ckent@test.com",
          password: "0987654321"
        })
        .then((user) => {
          done();
        })
        .catch((err) => {
          expect(err.message).toContain("An account with that email already exists, please try another.");
          done();
        });

        done();
      })
      .catch((err) => {
        done();
      });
    });

  });

});