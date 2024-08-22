var router = require("express").Router();
const restauranteController=require("../controllers/restaurante.controller")
const restauranteMiddleware=require("../middleware/restaurante.meddleware");
router.get("/all",restauranteMiddleware.getAll,restauranteController.getAll);
router.get("/code/:code",restauranteMiddleware.getByCodeRestaurant,restauranteController.getCodeRestaurant);
router.get("/id/:_id",restauranteMiddleware.get,restauranteController.get);
router.post("/",restauranteMiddleware.create,restauranteController.create);
router.put("/",restauranteMiddleware.update,restauranteController.update);
router.delete("/:_id",restauranteMiddleware.delete,restauranteController.delete);
module.exports = router
 