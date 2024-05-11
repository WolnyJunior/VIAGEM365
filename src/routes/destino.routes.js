const { Router } = require("express");
const DestinoController = require("../controllers/DestinoController");

const destinoRoutes = new Router()

destinoRoutes.get('/', DestinoController.listar)
destinoRoutes.post('/', DestinoController.cadastrar)
destinoRoutes.put('/:id', DestinoController.atualizar)
destinoRoutes.delete('/:id', DestinoController.deletar)

module.exports = destinoRoutes