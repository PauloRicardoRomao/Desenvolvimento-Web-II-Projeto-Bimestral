const { DataTypes } = require("sequelize");
const sequelize = require("../config/config");
const tipo = require("./tipoInsumoModel");

const Insumo = sequelize.define("insumo", {
    idInsumo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    descricaoInsumo: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    tipoInsumo: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    carimboDataHoraInsumo: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    situacaoInsumo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    tableName: "insumo",
    freezeTableName: true,
    timestamps: false
});

Insumo.belongsTo(tipo, {
    foreignKey: "tipoInsumo",
    as: "tipo"
});

tipo.hasMany(Insumo, {
    foreignKey: "tipoInsumo",
    as: "insumo"
});

module.exports = Insumo;
 