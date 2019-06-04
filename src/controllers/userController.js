const userQueries = require("../db/queries.users.js");
const passport = require("passport");

module.exports = {


  signUp(req, res, next){
    res.render("users/sign_up", {title: "Watch it On TV - Sign Up"});
  },

  create(req, res, next){
         let newUser = {
           firstName: req.body.firstName,
           lastName: req.body.lastName,
           email: req.body.email,
           password: req.body.password,
           passwordConfirmation: req.body.passwordConfirmation
         };

         userQueries.createUser(newUser, (err, user) => {
           if(err){
             req.flash("error", err);
             res.redirect("/users/sign_up");
           } else {
             passport.authenticate("local")(req, res, () => {
               req.flash("notice", "You've successfully signed in!");
               res.redirect("/");
             })
           }
         });
       }


}