const usuarioMiddlewsre = require("../middleware/usuario.middleseare");
const usuarioControlller = require("../controllers/usuario.controller");
const router = require("express").Router();
 
router.get("/all", usuarioControlller.getAll);
router.get("/id/:_id", usuarioMiddlewsre.get, usuarioControlller.get);
router.post("/", usuarioMiddlewsre.create, usuarioControlller.create);
router.put("/", usuarioMiddlewsre.update, usuarioControlller.update);
router.delete("/:_id", usuarioMiddlewsre.delete, usuarioControlller.delete);
module.exports = router;
