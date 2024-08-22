var router = require("express").Router();
const reviewController=require("../controllers/review.controller")
const reviewMiddleware=require("../middleware/review.middleware");
router.post("/",reviewMiddleware.create,reviewController.create);
router.put("/",reviewMiddleware.update,reviewController.update);
module.exports = router