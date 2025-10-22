const { DataTypes } = require("sequelize");
const sequelize = require("../config/config");

const TipoInsumo = sequelize.define("tipoInsumo", {
    idTipoInsumo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    descricaoTipoInsumo: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    definicaoTipoInsumo: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    carimboDataHoraTipoInsumo: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    situacaoTipoInsumo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    tableName: "tipoInsumo",
    freezeTableName: true,
    timestamps: false
});


module.exports = TipoInsumo;
