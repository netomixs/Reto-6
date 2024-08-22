
const mongoose = require('mongoose');
const usuarioReview = new mongoose.Schema({
    restaurante_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'restaurante',  
      required: true,
    },
    review_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'review', 
      required: true,
    },
  });
  const usuario = new mongoose.Schema({
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    apellido1: {
      type: String,
      required: true,
      trim: true,
    },
    apellido2: {
      type: String,
      trim: true,
    },
    nacimiento: {
      type: Date,
      required: true,
    },
    usuario: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    correo: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    favoritos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'restaurante',  
      },
    ],
    reviews: [usuarioReview], 
  });
  const Usuario = mongoose.model('usuario', usuario);

module.exports = Usuario;