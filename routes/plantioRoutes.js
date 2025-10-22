const express = require("express");
const router = express.Router();
const controller = require("../controllers/plantioControllers");

router.post("/create", controller.gravar);
router.post("/update/:id", controller.alterar);
router.get("/delete/:id", controller.remover);

module.exports = router;
