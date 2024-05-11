const { Router } = require("express");
const LoginController = require("../controllers/LoginController");

const rotaLogin = new Router()

rotaLogin.post('/', LoginController.login)
rotaLogin.post('/cadastro', LoginController.cadastrar)


module.exports = rotaLogin