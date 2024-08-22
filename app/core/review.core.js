const Restaurante = require("../models/restaurante.model");
const Usuario = require("../models/usuario.model");
const mongoose = require("mongoose");
exports.create = async (datos) => {
  const objectIdRestaurante = new mongoose.Types.ObjectId(datos.restaurante_id);
  const objectIdUsuario = new mongoose.Types.ObjectId(datos.usuario_id);

  try {
    const restauranteResponse = await Restaurante.findById(objectIdRestaurante);
    const usuarioResponse = await Usuario.findById(objectIdUsuario);
    const reviewData = {
      calificacion: datos.calificacion,
      comentario: datos.comentario,
      usuario_id: usuarioResponse,
    };
    const dataUsusarioReview = {
      review_id: "",
      restaurante_id: objectIdRestaurante,
    };
    if (!restauranteResponse) {
      return null;
    }

    restauranteResponse.reviews.push(reviewData);
    await restauranteResponse.save();
    const reviewRecienAgregada =
      restauranteResponse.reviews[restauranteResponse.reviews.length - 1];
    dataUsusarioReview.review_id = reviewRecienAgregada._id;
    usuarioResponse.reviews.push(dataUsusarioReview);
    const esGuardado = usuarioResponse.save();
    if (esGuardado) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return err;
  }
};
exports.update = async (datos) => {
  const objectIdRestaurante = new mongoose.Types.ObjectId(datos.restaurante_id);
  const restauranteResponse = await Restaurante.findById(objectIdRestaurante);
  const objectIdComentario= new mongoose.Types.ObjectId(datos._id);
  if (!restauranteResponse) {
    return null;
  }
  const review = restauranteResponse.reviews.id(objectIdComentario);
  if (datos.calificacion) {
    review.calificacion = datos.calificacion;
  }

  if (datos.comentario) {
    review.comentario = datos.comentario;
  }
  const esGuardado = await restauranteResponse.save();
  if (esGuardado) {
    return true;
  } else {
    return false;
  }
};
exports.delete = (datos) => {
  const objectId = new mongoose.Types.ObjectId(datos._id);
  return Restaurante.findByIdAndDelete(objectId);
};
exports.get = (datos) => {
  const objectId = new mongoose.Types.ObjectId(datos._id);
  return Restaurante.findOne(objectId, { reviews: 0 });
};
exports.getByCodeRestaurant = (datos) => {
  console.log(datos.code);

  return Restaurante.findOne(
    { codigo_restaurante: datos.code },
    { reviews: 0 }
  );
};
exports.getAll = () => {
  return Restaurante.find({}, { reviews: 0 });
};
