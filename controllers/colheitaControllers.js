const colheitaModel = require('../models/colheitaModel');
const plantioModel = require('../models/plantioModel');


const gravar = async (req, res) => {
    try {
        const { plantio, data } = req.body;
        if (!plantio || !data) {
            return res.status(400).json({ message: "Plantio ou data inválidos." });
        }
        //  Grava a colheita
        await colheitaModel.create({
            plantioColheita: plantio,
            dataColheita: data
        });
        //  Atualiza o plantio para inativo
        await plantioModel.update(
            { situacaoPlantio: false },
            { where: { idPlantio: plantio } }
        );
        //  Retorna sucesso
        res.status(200).json({ message: "Colheita gravada e plantio inativado!" });
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

        res.render("index", { plantios, colheitas });
    } catch (error) {
        console.error(error);
        res.status(500).send("Erro ao listar plantios e colheitas");
    }
};


module.exports = {
    gravar,
    listar
};