const { Router } = require("express");
const UsuarioController = require("../controllers/UsuarioController");

const usuarioRoutes = new Router()

usuarioRoutes.get('/', UsuarioController.listar)
usuarioRoutes.put('/:id', UsuarioController.atualizar)
usuarioRoutes.patch('/:id', UsuarioController.atualizarCep)
usuarioRoutes.delete('/:id', UsuarioController.deletar)

module.exports = usuarioRoutes