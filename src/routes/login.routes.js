const { Router } = require("express");
const Usuario = require("../models/Usuario");
const { sign } = require("jsonwebtoken");
const { default: axios } = require("axios");

const rotaLogin = new Router()

rotaLogin.get('/:cep', async (req, res) => {
    try {
        const cep = req.params.cep

        // const resultado = await axios.get(`https://nominatim.openstreetmap.org/search.php?country=br&postalcode=${cep}&format=jsonv2`)

        // const dadosEndereco = resultado.data.map(item => ({
        //     latitude: item.lat,
        //     longitude: item.lon,
        //     cep: cep,
        // }))

        const endereco = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)

        const dadosEndereco = {
            cep: endereco.data.cep,
            rua: endereco.data.logradouro
        }

        res.status(200).json(dadosEndereco)
    } catch (error) {
        res.json({ error })
    }
})

rotaLogin.post('/', async (req, res) => {
    try {
        const email = req.body.email
        const senha = req.body.senha

        if (!email || !senha) {
            return res.status(400).json({ message: `Todos os campos são obrigatórios.` })
        }

        const usuario = await Usuario.findOne({
            where: {
                email: email,
                senha: senha
            }
        })

        if (!usuario) {
            return res.status(404).json({ message: `Usuário não encontrado. Email e/ou senha Incorreto(s)` })
        }

        const payload = { sub: usuario.id, email: usuario.id, nome: usuario.id }

        const token = sign(payload, process.env.SECRET_JWT)

        res.status(200).json({ Token: token })
    } catch (error) {

    }
})

module.exports = rotaLogin