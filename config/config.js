const { Sequelize } = require('sequelize');

const connection = new Sequelize("cultura", "root", "NovaSenha123!", {
    host: '127.0.0.1',
    dialect: 'mysql'
});

module.exports = connection;