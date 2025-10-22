const express = require("express");
const router = express.Router();

const plantioModel = require("../models/plantioModel");
const colheitaModel = require("../models/colheitaModel");

//Rota principal do sistema (carrega tudo)
router.get("/", async (req, res) => {
    try {
        const plantios = await plantioModel.findAll({ where: { situacaoPlantio: true } });
        const colheitas = await colheitaModel.findAll({
            include: { model: plantioModel, as: "plantio" }
        });

        res.render("index", { plantios, colheitas });
    } catch (error) {
        console.error(error);
        res.status(500).send("Erro ao carregar dashboard.");
    }
});

module.exports = router;
