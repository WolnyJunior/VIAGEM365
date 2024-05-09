const { DataTypes } = require("sequelize");
const { connection } = require("../database/connection");


const Destino = connection.define('destinos', {
    id_usuario: {
        type: DataTypes.INTEGER
    },
    nome: {
        type: DataTypes.STRING
    },
    descricao: {
        type: DataTypes.STRING
    },
    localidade: {
        type: DataTypes.STRING
    },
    coordenadas_geograficas: {
        type: DataTypes.STRING
    }
})