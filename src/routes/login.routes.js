const { Router } = require("express");
const LoginController = require("../controllers/LoginController");

const rotaLogin = new Router()

rotaLogin.post('/', LoginController.login)

module.exports = rotaLogin