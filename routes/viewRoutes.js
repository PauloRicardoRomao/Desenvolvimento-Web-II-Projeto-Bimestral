const express = require("express");
const router = express.Router();
const plantiosController = require("../controllers/plantioControllers");
const colheitaController = require("../controllers/colheitaControllers");


router.get("/", plantiosController.listar);
/*router.get("/colheitas", colheitaController.listar);*/
router.get("/plantios/:id", plantiosController.listarPlantio);
router.post("/plantio/create", plantiosController.gravar);
router.post('/plantio/update/:id', plantiosController.alterar);
router.get('/plantio/delete/:id', plantiosController.remover);

router.get('/colheitas', colheitaController.listar);
router.post('/colheita/add', colheitaController.gravar);


module.exports = router;