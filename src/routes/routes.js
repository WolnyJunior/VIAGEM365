const { Router } = require("express");
const rotaLogin = require("./login.routes");

const routes = Router()

routes.use('/login', rotaLogin)

module.exports = routes