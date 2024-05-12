const { default: axios } = require("axios");

async function buscaCepDestino(cep_endereco) {
    try {

        const resultado = await axios.get(`https://nominatim.openstreetmap.org/search.php?country=br&postalcode=${cep_endereco}&format=jsonv2`);
        if (resultado.status === 200 && resultado.data.length > 0) {
            console.log("Dados do CEP:", resultado.data[0])
            return resultado.data[0]
        } else {
            throw new Error(`'${cep_endereco}'. Inválido ou não encontrado.`)
        }
    } catch (error) {
        throw new Error("Erro ao buscar CEP:" + error.message);
    }
}

module.exports = buscaCepDestino