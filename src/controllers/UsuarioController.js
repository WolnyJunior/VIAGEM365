const { default: axios } = require("axios");
const Usuario = require("../models/Usuario");

class UsuarioController {
    async listar(req, res) {
        const usuarios = await Usuario.findAll()
        res.json(usuarios)
    }

    async atualizar(req, res) {
        try {
            const { id } = req.params

            const usuario = await Usuario.findByPk(id)
            if (!usuario) {
                return res.status(404).json({ message: `Usuário não encontrado com id:${id}.` })
            }

            console.log(req.body)

            usuario.update(req.body)

            await usuario.save()

            res.json(usuario)

        } catch (error) {
            console.log(error)
            res.status(500).json({ error: `Erro ao atualizar usuário.` })
        }
    }

    async atualizarCep(req, res) {
        try {
            const { id } = req.params;
            let usuario = await Usuario.findByPk(id);

            if (!usuario) {
                return res.status(404).json({ message: `Usuário não encontrado com id:${id}.` });
            }

            const { cep_endereco } = req.body;
            const enderecoResponse = await axios.get(`https://viacep.com.br/ws/${cep_endereco}/json/`);

            if (enderecoResponse.status !== 200) {
                return res.status(400).json({ message: 'CEP inválido ou não encontrado' });
            }

            const endereco = enderecoResponse.data;

            // Atualiza os dados do usuário com as informações do endereço
            usuario = await usuario.update({
                ...req.body,
                rua: endereco.logradouro,
                bairro: endereco.bairro,
                cidade: endereco.localidade,
                estado: endereco.uf
            });

            res.json(usuario);
        } catch (error) {
            res.status(500).json({ error: `Erro ao atualizar usuário.` });
        }
    }

    async deletar(req, res) {
        try {
            const { id } = req.params

            const usuarioDeletado = await Usuario.destroy({
                where: { id: id }
            })

            if (usuarioDeletado === 0) {
                return res.status(404).json({ message: `Nenhum usuário encontrado com id:${id}` })
            }

            res.status(204).json({})

        } catch (error) {
            res.status(500).json({ error: 'Não foi possível deletar usuário' })
        }
    }
}

module.exports = new UsuarioController()