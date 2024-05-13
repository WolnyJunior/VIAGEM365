const { Router } = require("express");
const UsuarioController = require("../controllers/UsuarioController");
const verificarDestinoDoUsuario = require("../middlewares/verificarDestinoDoUsuario");
const verificarEmailCPF = require("../middlewares/verificarEmailCPF");
const { isAdmin } = require("../middlewares/isAdmin");
const { auth } = require("../middlewares/auth");

const usuarioRoutes = new Router()

usuarioRoutes.get('/', auth, UsuarioController.listar)
usuarioRoutes.put('/:id', auth, isAdmin, verificarEmailCPF, UsuarioController.atualizar)
usuarioRoutes.patch('/:id', auth, isAdmin, UsuarioController.atualizarCep)
usuarioRoutes.delete('/:id', auth, isAdmin, verificarDestinoDoUsuario, UsuarioController.deletar)

module.exports = usuarioRoutes