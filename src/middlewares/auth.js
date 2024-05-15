const { verify } = require("jsonwebtoken");
const Usuario = require("../models/Usuario");

//Verificar a autenticidade do Token informado
async function auth(req, res, next) {
    try {
        const { authorization } = req.headers

        const decoded = verify(authorization, process.env.SECRET_JWT);
        const usuario = await Usuario.findByPk(decoded.sub);
        if(!usuario){
            return res.status(404).json({message:`Não foi possível encontrar o usuário com ID informado.`})
        }
        req.usuario = usuario
        next()

    } catch (error) {
        return res.status(401).json({
            message: 'Falha na Autenticação: Autorização inválida',
            cause: error.message
        })
    }
}

module.exports = { auth }