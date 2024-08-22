const Restaurante = require("../models/restaurante.model");
const mongoose = require("mongoose");
exports.create = (datos) => {
  console.log();

  const restaurante = new Restaurante({
    codigo_restaurante: datos.codigo_restaurante,
    nombre: datos.nombre,
    direccion: {
      coordenadas: [datos.latitud, datos.longitud],
      numero: datos.numero_calle,
      calle: datos.nombre_calle,
      cp: datos.cp,
    },
    reviews: [],
    distrito: datos.distrito,
    tipo_cocina: datos.tipo_cocina,
  });
  return restaurante.save();
};
exports.update = (datos) => {
  const objectId = new mongoose.Types.ObjectId(datos._id);

  const restaurante = {
    codigo_restaurante: datos.codigo_restaurante,
    nombre: datos.nombre,
    direccion: {
      coordenadas: [datos.latitud, datos.longitud],
      numero: datos.numero_calle,
      calle: datos.nombre_calle,
      cp: datos.cp,
    },

    distrito: datos.distrito,
    tipo_cocina: datos.tipo_cocina,
  };
  return Restaurante.findByIdAndUpdate(objectId, { $set: restaurante });
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
