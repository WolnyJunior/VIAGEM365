const { DataTypes } = require("sequelize");
const { connection } = require('../database/connection');

const Usuario = connection.define('usuarios', {
    nome: {
        type: DataTypes.STRING
    },
    sexo: {
        type: DataTypes.STRING
    },
    cpf: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    senha: {
        type: DataTypes.INTEGER
    },
    data_nascimento: {
        type: DataTypes.DATE
    },
    cep_endereco: {
        type: DataTypes.STRING
    },
    rua: {
        type: DataTypes.STRING
    },
    bairro: {
        type: DataTypes.STRING
    },
    cidade: {
        type: DataTypes.STRING
    },
    estado: {
        type: DataTypes.STRING
    }
})

// Usuario.beforeSave(async (usuario) => {
//     usuario.rua = await axios.get(`https://viacep.com.br/ws/${cep_endereco}/json/`)
//     return usuario
// })

module.exports = Usuario