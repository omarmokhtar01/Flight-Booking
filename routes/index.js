const routeUser = require("./userRoute"),
  routeAuth = require("./authRoute"),
  routeBooking = require('./bookRoute'),
  routePay = require('./payRoute')
  ;

const mountRoute = (app) => {
  app.use("/api/v1/users", routeUser);
  app.use("/api/v1/auth", routeAuth);
  app.use("/api/v1/book", routeBooking);
  app.use("/api/v1/payment", routePay);
};

module.exports = mountRoute;
