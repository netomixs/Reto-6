const mongoose = require("mongoose");
const reviewSchema = new mongoose.Schema({
  fecha: {
    type: Date,
    default: Date.now,
  },
  calificacion: {
    type: Number,
    min: 0,
    max: 5, 
  },
  comentario: {
    type: String,
    trim: true,
  },
  usuario_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "usuario",  
    required: true,
  },
});
const restaurante = new mongoose.Schema({
  codigo_restaurante: {
    type: String,
    trim: true,
    unique: true, 
  },
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  direccion: {
    coordenadas: {
      type: [Number],
      index: "2dsphere",
    },
    numero: {
      type: String,
      trim: true,
    },
    calle: {
      type: String,
      trim: true,
    },
    cp: {
      type: String,
      trim: true,
    },
  },
  distrito: {
    type: String,
    trim: true,
  },
  tipo_cocina: {
    type: String,
    trim: true,
  },
  reviews: [reviewSchema], 
});
const Restaurante=mongoose.model("restaurante", restaurante);
module.exports = Restaurante
