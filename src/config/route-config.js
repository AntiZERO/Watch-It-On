module.exports = {
  init(app){
    const staticRoutes = require("../routes/static");
    const userRoutes = require("../routes/users");
    const movieRoutes = require("../routes/movies");
    const tvRoutes = require("../routes/tv");


    app.use(staticRoutes);
    app.use(userRoutes);
    app.use(movieRoutes);
    app.use(tvRoutes);
  }
}