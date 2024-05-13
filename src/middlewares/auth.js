const { verify } = require("jsonwebtoken")

//Verificar a autenticidade do Token informado
async function auth(req, res, next) {
    try {
        const { authorization } = req.headers

        const decoded = verify(authorization, process.env.SECRET_JWT);
        req.id_usuario = decoded.sub; // Adiciona o ID do usuário ao objeto req

        next()

    } catch (error) {
        return res.status(401).json({
            message: 'Falha na Autenticação: Autorização inválida',
            cause: error.message
        })
    }
}

module.exports = { auth }