const plantioModel = require('../models/plantioModel');

const gravar = async (req, res) => {
    try{
        const {descricao, quantidade, unidade, dataInicio, duracao} = req.body;
        const novoPlantio = await plantioModel.create({
            descricaoPlantio: descricao,
            quantidadePlantio: quantidade,
            unidadePlantio: unidade,
            dataInicioPlantio: dataInicio,
            duracaoPlantio: duracao
        });

        res.redirect("/colheitas");
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erro ao gravar plantio." });
    }
};

const alterar = async (req, res) => {
    try{
        const {id} = req.params;
        const {descricao, quantidade, unidade, dataInicio, duracao} = req.body;
        const plantioAtualizado = await plantioModel.update({
            descricaoPlantio: descricao,
            quantidadePlantio: quantidade,
            unidadePlantio: unidade,
            dataInicioPlantio: dataInicio,
            duracaoPlantio: duracao}, {where: {idPlantio: id} }
        );

        res.redirect("/colheitas");
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erro ao gravar plantio." });
    }
};

const listar = async (req, res) => {
    try {
        const plantios = await plantioModel.findAll();

        let plantioSelecionado = null;
        if (req.query.id) {
            plantioSelecionado = await plantioModel.findByPk(req.query.id);
        }

        res.render("index", { plantios, plantio: plantioSelecionado || {}
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erro ao listar plantios." });
    }
};

const listarPlantio = async (req, res) => {
    try {
        const { id } = req.params;
        
        const plantio = await plantioModel.findByPk(id); // um só
        res.render("plantioDetalhe", { plantio }); // ou pode usar o mesmo index com modal
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erro ao buscar plantio." });
    }
};

const remover = async(req, res) => {
    const { id } = req.params;
    await plantioModel.destroy({ where: { idPlantio: id } });
    res.redirect("/colheitas");
};

module.exports = {
    gravar,
    alterar,
    listar,
    listarPlantio,
    remover
};