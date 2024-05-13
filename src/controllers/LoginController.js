const { sign } = require("jsonwebtoken")
const Usuario = require("../models/Usuario")
const { default: axios } = require("axios")

class LoginController {

    async login(req, res) {
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

            const payload = { sub: usuario.id, id: usuario.id, email: usuario.id, nome: usuario.id }

            const token = sign(payload, process.env.SECRET_JWT)

            res.status(200).json({ token: token, id: usuario.id, nome: usuario.id })
        } catch (error) {
            return res.status(500).json({ error: error, message: 'Erro ao fazer o login!' })
        }
    }

    async cadastrar(req, res) {
        try {
            const nome = req.body.nome
            const sexo = req.body.sexo
            const cpf = req.body.cpf
            const email = req.body.email
            const senha = req.body.senha
            const data_nascimento = req.body.data_nascimento
            const cep_endereco = req.body.cep_endereco

            if (!nome || !sexo || !cpf || !email || !senha || !data_nascimento || !cep_endereco) {
                return res.status(400).json({ message: `Necessário preencher todos os dados.` })
            }
            if (!data_nascimento.match(/\d{4}-\d{2}-\d{2}/gm)) {
                return res.status(400).json({ message: 'A data de nascimento é não está no formato correto' })
            }

            //variável para fazer uma requisição na API viaCep com o CEP digitado durante o cadastro do usuário.
            const endereco = await axios.get(`https://viacep.com.br/ws/${cep_endereco}/json/`)

            //variáveis que retornam da API viaCEP os dados desejados
            const rua = endereco.data.logradouro
            const bairro = endereco.data.bairro
            const cidade = endereco.data.localidade
            const estado = endereco.data.uf

            const usuario = await Usuario.create({
                nome: nome,
                sexo: sexo,
                cpf: cpf,
                email: email,
                senha: senha,
                data_nascimento: data_nascimento,
                cep_endereco: cep_endereco,
                rua: rua,
                bairro: bairro,
                cidade: cidade,
                estado: estado
            })

            res.status(201).json(usuario)
        } catch (error) {
            res.status(500).json({ error: `Erro ao criar novo usuário.` })
        }
    }

}

module.exports = new LoginController()