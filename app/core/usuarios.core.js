const mongoose = require("mongoose");
const Usuario = require("../models/usuario.model");
const Cifrado = require("../tools/cifrados");
exports.create = async (datos) => {
  var hash = "";
 await Cifrado.cifrarPassword(datos.password)
    .then((response) => {
      hash = response;
      console.log(hash);
    })
    .catch((err) => {

        console.error(err);
    });
  const usuario = new Usuario({
    nombre: datos.nombre,
    apellido1: datos.apellido1,
    apellido2: datos.apellido2,
    nacimiento: datos.nacimiento,
    usuario: datos.usuario,
    correo: datos.correo,
    password: hash,
  });
  return usuario.save();
};
exports.update = (datos) => {
  const objectId = new mongoose.Types.ObjectId(datos._id);
  const usuario = {
    nombre: datos.nombre,
    apellido1: datos.apellido1,
    apellido2: datos.apellido2,
    nacimiento: datos.nacimiento,
    usuario: datos.usuario,
    correo: datos.correo,
 
  };
  return Usuario.findByIdAndUpdate(objectId, { $set: usuario });
};
exports.delete = (datos) => {
  const objectId = new mongoose.Types.ObjectId(datos._id);
  return Usuario.findByIdAndDelete(objectId);
};
exports.get = (datos) => {
  const objectId = new mongoose.Types.ObjectId(datos._id);
  return Usuario.findOne(objectId, { reviews: 0 });
};
exports.getAll = () => {
  return Usuario.find({}, { reviews: 0 });
};
