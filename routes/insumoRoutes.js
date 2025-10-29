const express = require("express");
const router = express.Router();
const controller = require("../controllers/insumoController");

router.post("/all-insumos", controller.listar);
router.post("/create-insumo", controller.gravar);
router.post("/update-insumo/:id", controller.alterar);
router.get("/delete-insumo/:id", controller.remover);

module.exports = router;
