const colheitaModel = require('../models/colheitaModel');
const plantioModel = require('../models/plantioModel');

const gravar = async (req, res) => {
    try {
        const { plantio, data } = req.body;

        // 1️⃣ Grava a colheita
        await colheitaModel.create({
            plantioColheita: plantio,
            dataColheita: data
        });

        // 2️⃣ Atualiza o plantio para inativo
        await plantioModel.update(
            { situacaoPlantio: false },
            { where: { idPlantio: plantio } }
        );

        res.redirect("/colheitas"); // ou rota que quiser atualizar
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erro ao gravar colheita e atualizar plantio." });
    }
};


const listar = async (req, res) => {
    try {
        const plantios = await plantioModel.findAll({ where: { situacaoPlantio: true } });
        const colheitas = await colheitaModel.findAll({
            include: { model: plantioModel, as: "plantio" }
        });
                console.log(colheitas);

        res.render("index", { plantios, colheitas }); // agora passa os dois
    } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao listar plantios e colheitas");
    }
};


module.exports = {
    gravar,
    listar
};