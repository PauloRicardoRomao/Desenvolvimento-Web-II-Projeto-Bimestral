const { DataTypes } = require("sequelize");
const sequelize = require("../config/config");
const Plantio = require("./plantioModel");

const Colheita = sequelize.define("Colheita", {
    idColheita: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    plantioColheita: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Plantio,
            key: "idPlantio"
        }
    },
    dataColheita: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    carimboDataHoraColheita: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: "colheita",
    freezeTableName: true,
    timestamps: false
});

// Associação com Plantio
Colheita.belongsTo(Plantio, {
    foreignKey: "plantioColheita",
    as: "plantio"
});

Plantio.hasMany(Colheita, {
    foreignKey: "plantioColheita",
    as: "colheitas"
});

module.exports = Colheita;
