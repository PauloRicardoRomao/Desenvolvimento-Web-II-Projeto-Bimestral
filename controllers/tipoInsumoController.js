const tipoInsumo = require('../models/tipoInsumoModel');

const gravar = async (req, res) => {
    try{
        const {descricao, definicao} = req.body;
        const novoTipoInsumo = await tipoInsumo.create({
            descricaoTipoInsumo: descricao,
            definicaoTipoInsumo: definicao
        });

        res.redirect("/");
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erro ao gravar tipo de insumo." });
    }
};

const alterar = async (req, res) => {
    try{
        const {id} = req.params;
        const {descricao, definicao} = req.body;
        const tipoInsumoAtualizado = await tipoInsumo.update({
            descricaoTipoInsumo: descricao,
            definicaoTipoInsumo: definicao
        }, { 
            where: { idTipoInsumo: id } 
        });

        res.redirect("/");
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erro ao gravar tipo de insumo." });
    }
};

const listar = async (req, res) => {
    try {
        const tiposInsumo = await tipoInsumo.findAll();

        let tipoSelecionado = null;
        if (req.query.id) {
            tipoSelecionado = await tipoInsumo.findByPk(req.query.id);
        }

        res.render("index", { 
            tiposInsumo, tipoInsumo: tipoSelecionado || {}
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erro ao listar tipos de insumos." });
    }
};

const remover = async(req, res) => {
    const { id } = req.params;
    await tipoInsumo.destroy({ where: { idTipoInsumo: id } });
    res.redirect("/");
};

module.exports = {
    gravar,
    alterar,
    listar,
    remover
};