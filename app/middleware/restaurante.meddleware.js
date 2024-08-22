const Joi = require("joi");
exports.create = (req, res, next) => {
  const userSchema = Joi.object({
    codigo_restaurante: Joi.string().length(6).required(),
    nombre: Joi.string().min(1).max(100).required(),
    distrito: Joi.string().min(1).max(100).required(),
    tipo_cocina: Joi.string().min(1).max(100).required(),
    latitud: Joi.number().min(-90).max(90).required(),
    longitud: Joi.number().min(-180).max(180).required(),
    nombre_calle: Joi.string().min(5).max(100).required(),
    numero_calle: Joi.string().min(1).max(6),
    cp: Joi.string().alphanum().length(5).required(), //89930
  });
  const error = userSchema.validate(req.body, { abortEarly: false });
  if (error.error !== undefined) {
    return res
      .status(400)
      .json({ error: "Errores de validacion", details: error.error.details });
  }
  next();
};
exports.update = (req, res, next) => {
  const userSchema = Joi.object({
    _id: Joi.string().required(),
    codigo_restaurante: Joi.string().length(6).required(),
    nombre: Joi.string().min(1).max(100).required(),
    distrito: Joi.string().min(1).max(100).required(),
    tipo_cocina: Joi.string().min(1).max(100).required(),
    latitud: Joi.number().min(-90).max(90).required(),
    longitud: Joi.number().min(-180).max(180).required(),
    nombre_calle: Joi.string().min(5).max(100).required(),
    numero_calle: Joi.string().min(1).max(6),
    cp: Joi.string().alphanum().length(5).required(), //89930
  });
  const error = userSchema.validate(req.body, { abortEarly: false });
  if (error.error !== undefined) {
    return res
      .status(400)
      .json({ error: "Errores de validacion", details: error.error.details });
  }
  next();
};
exports.delete = (req, res, next) => {
  const userSchema = Joi.object({
    _id: Joi.string().required(),
    //89930
  });
  const error = userSchema.validate(req.params, { abortEarly: false });
  if (error.error !== undefined) {
    return res
      .status(400)
      .json({ error: "Errores de validacion", details: error.error.details });
  }
  next();
};
exports.get = (req, res, next) => {
  const userSchema = Joi.object({
    _id: Joi.string().required(),
  });
  const error = userSchema.validate(req.params, { abortEarly: false });
  if (error.error !== undefined) {
    return res
      .status(400)
      .json({ error: "Errores de validacion", details: error.error.details });
  }
  next();
};
exports.getByCodeRestaurant = (req, res, next) => {
  const userSchema = Joi.object({
    code: Joi.string().required(),
 
  });
  const error = userSchema.validate(req.params, { abortEarly: false });
  if (error.error !== undefined) {
    return res
      .status(400)
      .json({ error: "Errores de validacion", details: error.error.details });
  }
  next();
};
exports.getAll = (req, res, next) => {
  next();
};
