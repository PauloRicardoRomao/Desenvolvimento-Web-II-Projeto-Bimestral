// models/plantioModel.js
const { DataTypes } = require("sequelize");
const Sequelize = require("../config/config"); // ajuste conforme seu projeto

const Plantio = Sequelize.define("Plantio", {
    idPlantio: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    descricaoPlantio: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    quantidadePlantio: {
        type: DataTypes.DECIMAL(13, 3), // numeric(13,3) -> DECIMAL
        allowNull: false
    },
    unidadePlantio: {
        type: DataTypes.ENUM("m²", "ha", "Alqueire", "Acre"),
        allowNull: false
    },
    dataInicioPlantio: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    duracaoPlantio: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    carimboDataHoraPlantio: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    situacaoPlantio: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    tableName: "plantio",
    freezeTableName: true,
    timestamps: false
});


module.exports = Plantio;