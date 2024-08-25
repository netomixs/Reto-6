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
exports.searchByfilter = async (datos) => {
  const pipeline = [];
  const lantitud =Number( datos.latitud); // Longitud de referencia
  const longitud = Number(datos.longitud);

 
  pipeline.push({
    $geoNear: {
      near: {
        type: "Point", // Asegúrate de usar el tipo correcto
        coordinates: [longitud, lantitud], // Las coordenadas deben estar en formato [longitud, latitud]
      },
      distanceField: "distancia",
      spherical: true, // Asegúrate de que sea esférico si usas un índice 2dsphere
    },
  });
  pipeline.push({
    $unwind: {
      path: "$reviews",
      preserveNullAndEmptyArrays: true,
    },
  });
  pipeline.push({
    $group: {
      _id: "$_id",
      nombre: { $first: "$nombre" },
      codigo_restaurante: { $first: "$codigo_restaurante" },
      direccion: { $first: "$direccion" },
      distrito: { $first: "$distrito" },
      tipo_cocina: { $first: "$tipo_cocina" },
      reviews: { $push: "$reviews" },
      promedioCalificacion: {
        $avg: {
          $cond: [
            { $ne: ["$reviews.calificacion", null] }, // Considera solo calificaciones que no sean null
            "$reviews.calificacion",
            null, // Ignora los comentarios sin calificación
          ],
        },
      },
      totalComentarios: {
        $sum: {
          $cond: [{ $ne: ["$reviews.calificacion", null] }, 1, 0],
        },
      },
      distancia: { $first: "$distancia" }
     // Cuenta los comentarios válidos
    },
  });
  pipeline.push({
    $addFields: {
      promedioCalificacion: {
        $ifNull: ["$promedioCalificacion", 0], // Si no hay calificaciones válidas, establece 0
      },
    },
  });

  if (datos.distrito) {
    pipeline.push({ $match: { distrito: datos.distrito } });
  }

  if (datos.tipo_cocina) {
    pipeline.push({ $match: { tipo_cocina: datos.tipo_cocina } });
  }

  if (datos.nombre) {
    pipeline.push({
      $match: { nombre: { $regex: datos.nombre, $options: "i" } },
    });
  }
  const restaurantes = await Restaurante.aggregate(pipeline);
  if (datos.calificacion) {
    restaurantes= restaurantes.filter(
      (restaurante) => restaurante.promedioCalificacion >= datos.calificacion
    );
  }
  restaurantes.sort((a, b)=> a.distancia - b.distancia)
  return restaurantes;
};
