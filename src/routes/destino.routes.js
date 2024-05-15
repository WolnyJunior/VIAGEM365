const { Router } = require("express");
const DestinoController = require("../controllers/DestinoController");
const { authDestinos } = require("../middlewares/authDestino");

const destinoRoutes = new Router()

destinoRoutes.get('/', authDestinos, DestinoController.listar)
destinoRoutes.post('/', authDestinos, DestinoController.cadastrar)
destinoRoutes.put('/:id', authDestinos, DestinoController.atualizar)
destinoRoutes.delete('/:id', authDestinos, DestinoController.deletar)

module.exports = destinoRoutes