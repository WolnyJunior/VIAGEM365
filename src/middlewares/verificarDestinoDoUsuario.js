const Destino = require("../models/Destino")

async function verificarDestinoDoUsuario(req, res, next) {
    try {
        const { id } = req.params
        //Verificar se o usuário tem destinos cadastrados
        const destinosDoUsuario = await Destino.findAll({ where: { id_usuario: id } })

        if(destinosDoUsuario.length>0){
            return res.status(400).json({message:`Não é possível deletar usuário. Há destinos cadastrados com esse ID.`})
        }
        next()
    } catch (error) {
        return res.status(500).json({message:`Erro ao verificar os destinos do usuário.`})
    }
}

module.exports = verificarDestinoDoUsuario