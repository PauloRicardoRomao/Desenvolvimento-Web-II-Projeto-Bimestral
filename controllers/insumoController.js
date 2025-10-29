const tipoInsumo = require('../models/tipoInsumoModel');
const insumo = require('../models/insumoModel');

const gravar = async (req, res) => {
    try{
        const {descricao, idTipoInsumo} = req.body;

        const selecionaTipoInsumo = await tipoInsumo.findOne({
            where: {
                tipoInsumo: idTipoInsumo,
                situacaoTipoInsumo: true
            }
        });

        const novoInsumo = await insumo.create({
            descricaoInsumo: descricao,
            tipoInsumo: selecionaTipoInsumo
        });

        res.redirect("/");
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erro ao gravar insumo." });
    }
};

const alterar = async (req, res) => {
    try{
        const {id} = req.params;
        const {descricao, idTipoInsumo} = req.body;

        const selecionaTipoInsumo = await tipoInsumo.findOne({
            where: {
                tipoInsumo: idTipoInsumo,
                situacaoTipoInsumo: true
            }
        });

        const insumoAtualizado = await insumo.update({
            descricaoInsumo: descricao,
            tipoInsumo: selecionaTipoInsumo
        }, { 
            where: { 
                idInsumo: id, 
                situacaoInsumo: true
            } 
        });

        res.redirect("/");
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erro ao gravar insumo." });
    }
};

// CONTROLLER CORRIGIDO
const listar = async (req, res) => {
    try {
        const { tipo } = req.body; 

        const insumos = await insumo.findAll({
            where: { tipoInsumo: tipo }, 
            include: { model: dadoInsumoModel, as: "dadoInsumo" }
        });
      
        
       /* let insumoSelecionado = null;
        if (req.query.id) {
            insumoSelecionado = await insumo.findByPk(req.query.id);
        }
        
        res.render("index", { 
            insumos, insumo: insumoSelecionado || {}
        });*/

        // Retorna a lista de insumos em JSON (API)
        res.json(insumos); // Envia o array de insumos diretamente

    } catch (err) {
        console.error("ERRO NO CONTROLLER LISTAR:", err);
        res.status(500).json({ 
            message: "Erro ao listar insumos.",
            error: err.message || "Erro interno." 
        });
    }
};


const remover = async(req, res) => {
    const { id } = req.params;
    await insumo.destroy({ 
        where: { 
            idInsumo: id, 
            situacaoInsumo: true 
        } 
    });
    res.redirect("/");
};

module.exports = {
    gravar,
    alterar,
    listar,
    remover
};