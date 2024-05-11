const { Router } = require("express");
const LoginController = require("../controllers/LoginController");

const loginRoutes = new Router()

loginRoutes.post('/', LoginController.login)
loginRoutes.post('/cadastro', LoginController.cadastrar)


module.exports = loginRoutes