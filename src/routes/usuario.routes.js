const { Router } = require("express");
const UsuarioController = require("../controllers/UsuarioController");
const verificarDestinoDoUsuario = require("../middlewares/verificarDestinoDoUsuario");
const { auth } = require("../middlewares/auth");

const usuarioRoutes = new Router()

usuarioRoutes.get('/', auth, UsuarioController.listar)
usuarioRoutes.put('/:id', auth, UsuarioController.atualizar)
usuarioRoutes.patch('/:id', auth, UsuarioController.atualizarCep)
usuarioRoutes.delete('/:id', auth, verificarDestinoDoUsuario, UsuarioController.deletar)

module.exports = usuarioRoutes