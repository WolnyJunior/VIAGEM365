const { Router } = require("express");
const rotaLogin = require("./login.routes");
const usuarioRoutes = require("./usuario.routes");

const routes = Router()

routes.use('/login', rotaLogin)
routes.use('/usuarios', usuarioRoutes)

module.exports = routes