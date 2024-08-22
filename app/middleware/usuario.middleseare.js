const Joi = require("joi");
exports.create = (req, res, next) => {
  const usuario = Joi.object({
    nombre: Joi.string().min(1).max(50).required(),
    apellido1: Joi.string().min(1).max(100).required(),
    apellido2: Joi.string().min(1).max(100).empty(),
    nacimiento: Joi.date(),
    usuario: Joi.string().min(1).max(25).required(),
    correo: Joi.string().email().required(),
    password: Joi.string().min(1).max(100).required(),
  });
  const error = usuario.validate(req.body, { abortEarly: false });
  if (error.error !== undefined) {
    return res
      .status(400)
      .json({ error: "Errores de validacion", details: error.error.details });
  }
  next();
};
exports.update = (req, res, next) => {
  const usuario = Joi.object({
    _id: Joi.string().required(),
    nombre: Joi.string().min(1).max(50).required(),
    apellido1: Joi.string().min(1).max(100).required(),
    apellido2: Joi.string().min(1).max(100).empty(),
    nacimiento: Joi.date(),
    usuario: Joi.string().min(1).max(25).required(),
    correo: Joi.string().email().required(),
 
  });
  const error = usuario.validate(req.body, { abortEarly: false });
  if (error.error !== undefined) {
    return res
      .status(400)
      .json({ error: "Errores de validacion", details: error.error.details });
  }
  next();
};
exports.delete = (req, res, next) => {
    const usuario = Joi.object({
      _id: Joi.string().required(),
    });
    const error = usuario.validate(req.params, { abortEarly: false });
    if (error.error !== undefined) {
      return res
        .status(400)
        .json({ error: "Errores de validacion", details: error.error.details });
    }
    next();
  };
  exports.get = (req, res, next) => {
    const usuario = Joi.object({
      _id: Joi.string().required(),
    });
    const error = usuario.validate(req.params, { abortEarly: false });
    if (error.error !== undefined) {
      return res
        .status(400)
        .json({ error: "Errores de validacion", details: error.error.details });
    }
    next();
  };