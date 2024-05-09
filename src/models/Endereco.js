const { DataTypes } = require("sequelize");
const { connection } = require("../database/connection");

const Endereco = connection.define('enderecos', {
    id_usuario: {
        type: DataTypes.INTEGER
    },
    cep: {
        type: DataTypes.STRING
    },
    estado: {
        type: DataTypes.STRING
    },
    cidade: {
        type: DataTypes.STRING
    },
    bairro: {
        type: DataTypes.STRING
    },
    logradouro: {
        type: DataTypes.STRING
    },
    numero: {
        type: DataTypes.INTEGER
    },
    complemento: {
        type: DataTypes.STRING
    }
})

module.exports = Endereco