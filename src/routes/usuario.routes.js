const { Router } = require("express");
const UsuarioController = require("../controllers/UsuarioController");
const verificarDestinoDoUsuario = require("../middlewares/verificarDestinoDoUsuario");
const { auth } = require("../middlewares/auth");
const verificarEmailCPF = require("../middlewares/verificarEmailCPF");
const verficarPermissao = require("../middlewares/verificarPermissao");

const usuarioRoutes = new Router()

usuarioRoutes.get('/', auth, UsuarioController.listar)
usuarioRoutes.put('/:id', auth, verficarPermissao, verificarEmailCPF, UsuarioController.atualizar)
usuarioRoutes.patch('/:id', auth, verficarPermissao, UsuarioController.atualizarCep)
usuarioRoutes.delete('/:id', auth, verficarPermissao, verificarDestinoDoUsuario, UsuarioController.deletar)

module.exports = usuarioRoutes