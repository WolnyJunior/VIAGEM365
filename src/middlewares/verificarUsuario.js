const Destino = require("../models/Destino")

async function verficarUsuario(req, res, next){
    try {
        const {id}= req.params
        const destino = await Destino.findByPk(id)

        if(!destino){
            return res.status(404).json({message: `Destino com ID:'${id}', não encontrado.`})
        }

        if(destino.id_usuario !== req.id_usuario){
            return res.status(403).json({message:`Você não tem permissão para modificar ou deletar esse destino.`})
        }

        next()
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:`Erro ao verificar o proprietário do destino com ID:'${id}'.`})
    }
}

module.exports = verficarUsuario