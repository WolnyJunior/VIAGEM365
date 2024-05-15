const { default: axios } = require("axios");
const Usuario = require("../models/Usuario");

class UsuarioController {
    async listar(req, res) {
        // #swagger.tags = ['Usuários']
        const usuarios = await Usuario.findAll()
        res.json(usuarios)
    }

    async atualizar(req, res) {
        // #swagger.tags = ['Usuários']
        /*  #swagger.parameters['body'] = {
            in: 'body',
            description: 'Para atualização do usuário - deve informar o ID e ter autenticação de ADMIN',
            schema: {
                "nome":"Usuario Atualizado",
                "sexo":"masculino",
                "cpf":"000.000.000-00",
                "email":"novoemail@email.com"
            }
    } */
        try {
            const { id } = req.params

            const { isAdmin } = req.usuario
            if (!isAdmin) {
                return res.status(403).json({ message: `Este usuário não é um Admin, e não tem permissão para atualizar usuários.` })
            }
            if (id === '1') {
                return res.status(403).json({ message: `O usuário admin não pode ter dados atualizados.` });
            }

            const usuario = await Usuario.findByPk(id)
            if (!usuario) {
                return res.status(404).json({ message: `Usuário não encontrado com id:${id}.` })
            }

            // console.log(req.body)
            await usuario.update(req.body)
            await usuario.save()

            res.json(usuario)

        } catch (error) {
            console.log(error)
            res.status(500).json({ error: `Erro ao atualizar usuário.` })
        }
    }

    async atualizarCep(req, res) {
        // #swagger.tags = ['Usuários']
        /*  #swagger.parameters['body'] = {
            in: 'body',
            description: 'Para atualizar do CEP do usuário - deve informar o ID e ter autenticação de ADMIN',
            schema: {
                "cep_endereco":"93819-700"
            }
        }   */
        try {
            const { id } = req.params;
            const { isAdmin } = req.usuario
            if (!isAdmin) {
                return res.status(403).json({ message: `Este usuário não é um Admin, e não tem permissão para atualizar usuários.` })
            }
            if (id === '1') {
                return res.status(403).json({ message: `O usuário admin não pode ter CEP atualizado.` });
            }

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

            await usuario.save()

            res.json(usuario);
        } catch (error) {
            res.status(500).json({ error: `Erro ao atualizar usuário.` });
        }
    }

    async deletar(req, res) {
        // #swagger.tags = ['Usuários']
        try {
            const { id } = req.params
            const { isAdmin } = req.usuario
            if (!isAdmin) {
                return res.status(403).json({ message: `Este usuário não é um Admin, e não tem permissão para deletar usuários.` })
            }

            if (id === '1') {
                return res.status(403).json({ message: `O usuário admin não pode ser excluído.` });
            }

            const usuarioDeletado = await Usuario.destroy({
                where: { id: id }
            })

            if (usuarioDeletado === 0) {
                return res.status(404).json({ message: `Nenhum usuário encontrado com id:${id}` })
            }

            res.status(204).json({})

        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Não foi possível deletar usuário' })
        }
    }
}

module.exports = new UsuarioController()