const restauranteCore = require("../core/restaurante.core");
const Respuesta = require("../models/Respuesta.model");
exports.create = (req, res) => {
  restauranteCore
    .create(req.body)
    .then((response) => {
      const result = new Respuesta(200, "Insercion correcta", response);
      res.status(200).json(result);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
};
exports.update = (req, res) => {
  restauranteCore
    .update(req.body)
    .then((response) => {
      const result = new Respuesta(200, "Actualizacion correcta", response);
      res.status(200).json(result);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
};
exports.delete = (req, res) => {
  restauranteCore
    .delete(req.params)
    .then((response) => {
      const result = new Respuesta(200, "Elimiacion correcta", response);
      res.status(200).json(result);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
};
exports.get = (req, res) => {
  restauranteCore
    .get(req.params)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};
exports.getCodeRestaurant = (req, res) => {
  restauranteCore
    .getByCodeRestaurant(req.params)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};
exports.getAll = (req, res) => {
  restauranteCore
    .getAll()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};
