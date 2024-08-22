const Joi = require("joi");
exports.create = (req, res, next) => {
  const review = Joi.object({
    calificacion: Joi.number().min(1).max(5),
    comentario: Joi.string().min(1).max(255),
    usuario_id: Joi.string().min(1).max(100).required(),
    restaurante_id: Joi.string().required(),
  });
  const error = review.validate(req.body, { abortEarly: false });
  if (error.error !== undefined) {
    return res
      .status(400)
      .json({ error: "Errores de validacion", details: error.error.details });
  }
  next();
};
exports.update = (req, res, next) => {
  const review = Joi.object({
    calificacion: Joi.number().min(1).max(5),
    comentario: Joi.string().min(1).max(255),
    usuario_id: Joi.string().min(1).max(100).required(),
    restaurante_id: Joi.string().required(),
    _id: Joi.string().required(),
  });
  const error = review.validate(req.body, { abortEarly: false });
  if (error.error !== undefined) {
    return res
      .status(400)
      .json({ error: "Errores de validacion", details: error.error.details });
  }
  next();
};