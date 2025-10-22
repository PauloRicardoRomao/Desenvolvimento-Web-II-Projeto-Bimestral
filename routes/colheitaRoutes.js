const express = require("express");
const router = express.Router();
const controller = require("../controllers/colheitaControllers");

router.get("/", controller.listar);
router.post("/add", controller.gravar);

module.exports = router;
 