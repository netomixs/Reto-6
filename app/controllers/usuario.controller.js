const usuarioCore = require("../core/usuarios.core");
const Respuesta = require("../models/Respuesta.model");
exports.create = (req, res) => {
  usuarioCore
    .create(req.body)
    .then((response) => {
      const result = new Respuesta(200, "Insercion correcta", response);
      res.status(200).json(result);
    })
    .catch((error) => {
      console.log(error);
      const result = new Respuesta(500, "Error interno", error);
      res.status(500).json(result);
    });
};
exports.update = (req, res) => {
  usuarioCore
    .update(req.body)
    .then((response) => {
      const result = new Respuesta(200, "Actualizacion correcta", response);
      res.status(200).json(result);
    })
    .catch((error) => {
      console.log(error);
      const result = new Respuesta(500, "Error interno", error);
      res.status(500).json(result);
    });
};
exports.delete = (req, res) => {
  usuarioCore
    .delete(req.params)
    .then((response) => {
      const result = new Respuesta(200, "Elimiacion correcta", response);
      res.status(200).json(result);
    })
    .catch((error) => {
      console.log(error);
      const result = new Respuesta(500, "Error interno", error);
      res.status(500).json(result);
    });
};
exports.get = (req, res) => {
  usuarioCore
    .get(req.params)
    .then((response) => {
      const result = new Respuesta(200, "OK", response);
      res.status(200).json(result);
    })
    .catch((error) => {
      console.log(error);
      const result = new Respuesta(500, "Error interno", error);
      res.status(500).json(result);
    });
};

exports.getAll = (req, res) => {
  usuarioCore
    .getAll()
    .then((response) => {
      const result = new Respuesta(200, "OK", response);
      res.status(200).json(result);
    })
    .catch((error) => {
      console.log(error);
      const result = new Respuesta(500, "Error interno", error);
      res.status(500).json(result);
    });
};
