const { default: axios } = require("axios");
const Destino = require("../models/Destino")

class DestinoController {
    async listar(req, res) {
        try {
            const destinos = await Destino.findAll()
            if (destinos.length === 0) {
                return res.status(404).json({ message: "Nenhum destino encontrado." });
            }
            res.json(destinos)
        } catch (error) {
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

            const resultado = await axios.get(`https://nominatim.openstreetmap.org/search.php?country=br&postalcode=${cep_endereco}&format=jsonv2`)

            const { lat, lon, display_name } = resultado.data[0]

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

            const { cep_endereco } = req.body;
            const resultado = await axios.get(`https://nominatim.openstreetmap.org/search.php?country=br&postalcode=${cep_endereco}&format=jsonv2`);

            if (resultado.status !== 200) {
                return res.status(400).json({ message: 'CEP inválido ou não encontrado' });
            }

            const { lat, lon, display_name } = resultado.data[0]

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
            res.status(500).json({ error: `Erro ao atualizar usuário.` });
        }
    }


    async deletar(req, res) {
        try {
            const { id } = req.params

            const destinoDeletado = await Destino.destroy({
                where: { id: id }
            })

            if (destinoDeletado === 0) {
                return res.status(404).json({ message: `Nenhum destino encontrado com id:${id}` })
            }

            res.status(204).json({})

        } catch (error) {
            res.status(500).json({ error: 'Não foi possível deletar usuário' })
        }
    }

}

module.exports = new DestinoController()