const { Router } = require("express");
const LoginController = require("../controllers/LoginController");
const verificarEmailCPF = require("../middlewares/verificarEmailCPF");

const loginRoutes = new Router()

loginRoutes.post('/', LoginController.login)
loginRoutes.post('/cadastro', verificarEmailCPF, LoginController.cadastrar)


module.exports = loginRoutes