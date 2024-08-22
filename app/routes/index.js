module.exports = (app) => {
  const restaurante = require("./restaurante.route");
  const usuario = require("./usuario.route");
  const reviewRestaurante = require("./review.route");
  app.use("/api/usuario", usuario);
  app.use("/api/restaurante", restaurante);
  app.use("/api/review", reviewRestaurante);
};
