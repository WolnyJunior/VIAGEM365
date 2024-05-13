const { default: axios } = require("axios");
const Destino = require("../models/Destino");
const auth = require('../middlewares/auth')
const buscaCepDestino = require("../services/buscaCepDestino");

class DestinoController {
    async listar(req, res) {
        try {
            const destinos = await Destino.findAll({ where: { id_usuario: req.usuario.id } })
            if (destinos.length === 0) {
                return res.status(404).json({ message: "Nenhum destino encontrado." });
            }
            res.json(destinos)
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: "Ocorreu um erro ao listar destinos." });
        }
    }

    async cadastrar(req, res) {
        try {
            const id_usuario = req.body.id_usuario
            const nome = req.body.nome
            const descricao = req.body.descricao
            const cep_endereco = req.body.cep_endereco

            if (!id_usuario || !nome || !descricao || !cep_endereco) {
                return res.status(400).json({ message: `Necessário preencher todos os dados:\nid_usuario;\nnome;\ndescricao;\ncep_endereco.` })
            }

            //Buscar um CEP válido para adicionar latitude, longitude e localidade ao criar um novo Destino
            let resultado;
            try {
                resultado = await buscaCepDestino(cep_endereco)
            } catch (error) {
                return res.status(400).json({ message: `${error.message}` });
            }
            const { lat, lon, display_name } = resultado
            const destino = await Destino.create({
                id_usuario: id_usuario,
                nome: nome,
                descricao: descricao,
                cep_endereco: cep_endereco,
                localidade: display_name,
                latitude: lat,
                longitude: lon
            })

            res.status(201).json(destino)

        } catch (error) {
            console.log(error)
            res.status(500).json({ error: `Erro ao criar novo destino.` })
        }
    }

    async atualizar(req, res) {
        try {
            const { id } = req.params;
            let destino = await Destino.findByPk(id);

            if (!destino) {
                return res.status(404).json({ message: `Destino não encontrado com id:${id}.` });
            }

            if (destino.id_usuario !== req.id_usuario) {
                return res.status(403).json({ message: `Esse destino não pertence a você, então, não tem permissão para atualizar os dados no destino com id:${id}.` })
            }

            //Buscar um CEP válido para retornar na atualização de destino
            const { cep_endereco } = req.body;
            let resultado;
            try {
                resultado = await buscaCepDestino(cep_endereco)
            } catch (error) {
                return res.status(400).json({ message: `Não foi possível atualizar destino. ${error.message}.` });
            }

            const { display_name, lat, lon } = resultado;

            // Atualiza os dados do usuário com as informações do endereço
            destino = await destino.update({
                ...req.body,
                localidade: display_name,
                latitude: lat,
                longitude: lon
            });
            await destino.save()

            res.json(destino);
        } catch (error) {
            console.log(error)
            res.status(500).json({ error });
        }
    }


    async deletar(req, res) {
        try {
            const { id } = req.params

            let destino = await Destino.findByPk(id);

            if (destino.id_usuario !== req.id_usuario) {
                return res.status(403).json({ message: `Esse destino não pertence a você. Você não tem permissão para deletar o destino com id:${id}.` })
            }

            const destinoDeletado = await Destino.destroy({
                where: { id: id }
            })

            if (destinoDeletado === 0) {
                return res.status(404).json({ message: `Nenhum destino encontrado com id:${id}` })
            }

            res.status(204).json({})

        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Não foi possível deletar destino' })
        }
    }

}

module.exports = new DestinoController()