const Usuario = require("../models/Usuario")

async function verificarEmailCPF(req, res, next) {
    try {

        const { cpf, email } = req.body

        const cpfExiste = await Usuario.findOne({ where: { cpf } })
        const emailExiste = await Usuario.findOne({ where: { email } })

        if (cpfExiste) {
            return res.status(400).json({ message: `CPF:${cpf}, já foi cadastrado.` })
        }
        if (emailExiste) {
            return res.status(400).json({ message: `Email:${email}, já foi cadastrado.` })
        }

        next()

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: `Erro ao verificar CPF e email.` });
    }
}

module.exports = verificarEmailCPF