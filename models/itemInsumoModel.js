const { DataTypes } = require("sequelize");
const sequelize = require("../config/config");
const insumo = require("./insumoModel");

const ItemInsumo = sequelize.define("itemInsumo", {
    idItemInsumo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    insumoItemInsumo: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    quantidadeItemInsumo: {
        type: DataTypes.DECIMAL(10,3),
        allowNull: false
    },
    unidadeItemInsumo: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    validadeItemInsumo: {
        type: DataTypes.DATE,
        allowNull: true
    },
    carimboDataHoraItemInsumo: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    situacaoItemInsumo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    tableName: "itemInsumo",
    freezeTableName: true,
    timestamps: false
});

ItemInsumo.belongsTo(insumo, {
    foreignKey: "insumoItemInsumo",
    as: "insumo"
});

insumo.hasMany(ItemInsumo, {
    foreignKey: "insumoItemInsumo",
    as: "itemInsumo"
});

module.exports = ItemInsumo;
