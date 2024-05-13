const { Router } = require("express");
const DestinoController = require("../controllers/DestinoController");
const { auth } = require("../middlewares/auth");
const verficarUsuario = require("../middlewares/verificarUsuario");

const destinoRoutes = new Router()

destinoRoutes.get('/', auth, DestinoController.listar)
destinoRoutes.post('/', auth, DestinoController.cadastrar)
destinoRoutes.put('/:id', auth, verficarUsuario, DestinoController.atualizar)
destinoRoutes.delete('/:id', auth, verficarUsuario, DestinoController.deletar)

module.exports = destinoRoutes