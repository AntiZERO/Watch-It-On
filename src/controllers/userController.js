const userQueries = require("../db/queries.users.js");
const passport = require("passport");

module.exports = {

  // Views
  signUp(req, res, next) {
    res.render("users/sign_up", { title: "Watch it On TV - Sign Up" });
  },

  signInForm(req, res, next) {
    res.render("users/sign_in", { title: "Watch it On TV - Sign In" });
  },

  // Actions
  create(req, res, next) {
    let newUser = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      passwordConfirmation: req.body.passwordConfirmation
    };

    userQueries.createUser(newUser, (err, user) => {
      if (err) {
        req.flash("error", err);
        res.redirect("/users/sign_up");
      } else {
        passport.authenticate("local")(req, res, () => {
          req.flash("notice", "You've successfully signed in!");
          res.redirect("/");
        })
      }
    });
  },

  signIn(req, res, next) {
    passport.authenticate('local')(req, res, function () {
      if(!req.user) {
        req.flash("notice", "Sign in has failed. Please try again.")
        res.redirect("/users/sign_in");
      } else {
        req.flash("notice", "You have been signed in!");
        res.redirect("/");
      }
    })
  },

  signOut(req, res, next) {
    req.logout();
    req.flash("notice", "You've been signed out. See you soon!");
    res.redirect("/");
  }

}