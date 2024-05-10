const { Router } = require("express");
const Usuario = require("../models/Usuario");
const { sign } = require("jsonwebtoken");

const rotaLogin = new Router()

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