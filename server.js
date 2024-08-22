const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
/**
 * COnfiguracion de CORS
 */
var corsOptions = {
  origin: "*",
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Conexion con mongoDB
 */
const mongoString = process.env.DATABASE_URL;
mongoose.connect(mongoString);
const database = mongoose.connection;
/**
 * Prueba de conexion
 */
database.on("error", (error) => {
  console.log(error);
});
database.once("connected", () => {
  console.log("Database Connected");
});

/**
 * Rutas
 */
require("./app/routes")(app);

/**
 * Inizializacion del servidor
 */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
  
});
