const { DataTypes } = require("sequelize");
const sequelize = require("../config/config");
const insumo = require("./insumoModel");

const DadoInsumo = sequelize.define("dadoInsumo", {
    idDadoInsumo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    insumoDadoInsumo: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    descricaoDadoInsumo: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    marcaDadoInsumo: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    dataValidadeInsumo: {
        type: DataTypes.DATE,
        allowNull: true
    },
    quantidadeRecomendadaDadoInsumo: {
        type: DataTypes.DECIMAL(10,3),
        allowNull: true
    },
    unidadeDadoInsumo: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    carimboDataHoraDadoInsumo: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    situacaoDadoInsumo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    tableName: "dadoInsumo",
    freezeTableName: true,
    timestamps: false
});

DadoInsumo.belongsTo(insumo, {
    foreignKey: "insumoDadoInsumo",
    as: "insumo"
});

insumo.hasMany(DadoInsumo, {
    foreignKey: "insumoDadoInsumo",
    as: "dadoInsumo"
});

module.exports = DadoInsumo;
