const Usuario = require("../models/Usuario")

//Esta função vai verificar se o usuário tem permissão para alterar dados do usuário.
async function verficarPermissao(req, res, next){
    try {
        const {id}= req.params
        const usuario = await Usuario.findByPk(id)

        if(!usuario){
            return res.status(404).json({message: `Usuário com ID:'${id}', não encontrado.`})
        }

        if(usuario.id !== req.id){
            return res.status(403).json({message:`Você não tem permissão para modificar dados ou deletar esse usuário.`})
        }

        next()
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:`Erro ao verificar usuário com ID:'${id}'.`})
    }
}

module.exports = verficarPermissao